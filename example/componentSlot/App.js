import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  render() {
    const app = h("div", {}, "App");
    const foo = h(Foo, {}, h("p", {}, "778"));

    return h("div", {}, [app, foo]);
  },

  setup() {
    return {};
  },
};
