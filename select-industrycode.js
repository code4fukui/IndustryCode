import { SelectTree } from "https://code4fukui.github.io/select-tree/select-tree.js";
import { IndustryCode } from "./IndustryCode.js";

class SelectIndustryCode extends SelectTree {
  constructor() {
    super();
    this.setAttribute("src", IndustryCode.fn);
    super.init();
  }
  set value(v) {
    super.value = v;
  }
  get value() {
    return super.value;
  }
}

customElements.define("select-industrycode", SelectIndustryCode);

export { SelectIndustryCode };
