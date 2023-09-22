import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

window.self = null;
export const App = {
  render() {
    window.self = this;
    return h(
      "div",
      {
        id: "root",
        class: ["test", "red"],
        onClick() {
          console.log("click !!!");
        },
        onMousemove() {
          console.log("Mousemove ~");
        },
      },
      [h("div", {}, "hi, " + this.msg), h(Foo, { count: 1 })]
      // "hi, " + this.msg
      // [h("p", { class: "purple" }, "hi"), h("p", { class: "blue" }, "mini-vue")]
    );
  },

  setup() {
    return {
      msg: "mini-vue-123",
    };
  },
};
