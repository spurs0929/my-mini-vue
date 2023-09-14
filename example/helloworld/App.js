import { h } from "../../lib/guide-mini-vue.esm.js";
export const App = {
  render() {
    return h(
      "div",
      {
        id: "root",
        class: ["test", "red"],
      },
      [h("p", { class: "purple" }, "hi"), h("p", { class: "blue" }, "mini-vue")]
    );
  },

  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
