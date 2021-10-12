import { SelectTree } from "https://code4fukui.github.io/select-tree/select-tree.js";
import { IndustryCode } from "./IndustryCode.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

class SelectIndustryCode extends SelectTree {
  constructor() {
    super();
    super.init();
  }
  async init() {
    const url = "https://code4fukui.github.io/IndustryCode/";
    //const url = "";
    const csv = await CSV.fetch(url + IndustryCode.fn);
    for (let i = 0; i < csv.length; i++) {
      const l = csv[i];
      for (let j = 0; j < l.length; j++) {
        if (parseInt(l[j]) == 0) {
          l[j] = "";
        }
      }
    }
    this.csv = csv;
    super.init(csv);
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
