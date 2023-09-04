class ReactiveEffect {
  private _fn: any;

  constructor(fn) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    this._fn();
  }
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

  // 收集依賴
  dep.add(activeEffect);
}

let activeEffect;
export function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);

  for (let effect of dep) {
    effect.run();
  }
}
