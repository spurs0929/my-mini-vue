import { extend } from "../shared";

class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true;
  onStop?: () => void;
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    return this._fn();
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
}

const targetMap = new Map();
export function track(target, key) {
  // 收集依賴關係圖 target -> key -> dep
  let depsMap = targetMap.get(target);
  // 初始化時depsMap不存在的情況
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  // 初始化時dep不存在的情況
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  if (!activeEffect) return;

  // 收集依賴
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

let activeEffect;
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  extend(_effect, options);
  _effect.run();

  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;

  return runner;
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);

  for (let effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function stop(runner) {
  runner.effect.stop();
}
