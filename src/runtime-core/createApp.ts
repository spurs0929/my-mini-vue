import { render } from "./render";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 1. 創建虛擬節點
      const vnode = createVNode(rootComponent);

      // 2. 邏輯操作都是基於虛擬節點的
      render(vnode, rootContainer);
    },
  };
}
