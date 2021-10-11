import { SelectTree } from "https://code4fukui.github.io/select-tree/select-tree.js";
import { IndustryCode } from "./IndustryCode.js";

class SelectIndustryCode extends SelectTree {
  constructor() {
    super();
    const url = "https://code4fukui.github.io/IndustryCode/" + IndustryCode.fn;
    this.setAttribute("src", url);
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
