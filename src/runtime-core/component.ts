export function createComponentInstanse(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
  };

  return component;
}

export function setupComponent(instance) {
  // TODO
  // initProps()
  // initSlots()
  // 處理調用setup()後的返回值
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const component = instance.type;

  instance.proxy = new Proxy(
    {},
    {
      get(target, key) {
        const { setupState } = instance;
        if (key in setupState) {
          return setupState[key];
        }

        // $el
        if (key === "$el") {
          return instance.vnode.el;
        }
      },
    }
  );

  const { setup } = component;

  if (setup) {
    const setupResult = setup();

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
