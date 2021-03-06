import { SelectTree } from "https://code4fukui.github.io/select-tree/select-tree.js";
import { IndustryCode } from "./IndustryCode.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

class SelectIndustryCode extends SelectTree {
  constructor(opts) {
    super(null, opts);
    this.opts.showLabel = true;
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
    const s = super.value;
    if (!s || typeof s != "string") {
      return s;
    }
    const n = s.indexOf(" ");
    if (n < 0) {
      return s;
    }
    return s.substring(0, n);
  }
}

customElements.define("select-industrycode", SelectIndustryCode);

export { SelectIndustryCode };
