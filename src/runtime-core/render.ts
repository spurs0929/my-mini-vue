import { createComponentInstanse, setupComponent } from "./component";

export function render(vnode, container) {
  // 調用patch方法
  patch(vnode, container);
}

function patch(vnode, container) {
  // 處理組件
  processComponent(vnode, container);
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstanse(vnode);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container: any) {
  const subTree = instance.render();

  patch(subTree, container);
}
