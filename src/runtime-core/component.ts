import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmiit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
import { initSlots } from "./componentSlots";

export function createComponentInstanse(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    emit: () => {},
  };

  component.emit = emit.bind(null, component) as any;

  return component;
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);
  // 處理調用setup()後的返回值
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const component = instance.type;

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);

  const { setup } = component;

  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });

    handleSetupResult(instance, setupResult);
  }
}
function handleSetupResult(instance: any, setupResult: any) {
  // 處理function
  // 處理Object
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const component = instance.type;

  instance.render = component.render;
}
