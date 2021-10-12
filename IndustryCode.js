import { CSV } from "https://js.sabae.cc/CSV.js";

class IndustryCode {
  static fn = "000420038.csv";
  static csv = null;
  static async init() {
    if (IndustryCode.csv) {
      return IndustryCode.csv;
    }
    const url = "https://code4fukui.github.io/IndustryCode/";
    return IndustryCode.csv = await CSV.fetch(url + IndustryCode.fn);
  }
  static async find(s) {
    const csv = await IndustryCode.init();
    const match = csv.filter(line => line[line.length - 1].indexOf(s) >= 0);
    //return match.map(m => [m[m.length - 1], IndustryCode.getCodeByRecord(m)]);
    return match.map(m => m[m.length - 1]);
  }
  static getCodeByRecord(value) {
    for (let i = value.length - 2; i >= 0; i--) {
      const v = value[i];
      if (parseInt(v) != 0) {
        return v;
      }
    }
    return null;
  }
  static async encode(s) {
    const csv = await IndustryCode.init();
    const value = csv.find(line => line[line.length - 1] == s);
    if (!value) {
      return null;
    }
    return IndustryCode.getCodeByRecord(value);
  }
  static async decode(code) {
    const csv = await IndustryCode.init();
    const value = csv.find(line => line.find(l => l == code)); //  || parseInt(l) == parseInt(code)));
    if (!value) {
      return null;
    }
    return value[value.length - 1];
  }
  static async decodeTree(code) {
    const csv = await IndustryCode.init();
    const value = csv.find(line => line.find(l => l == code)); //  || parseInt(l) == parseInt(code)));
    if (!value) {
      return null;
    }
    const res = [];
    for (let i = 0; i < 4; i++) {
      const v = value[i];
      if (i > 0 && parseInt(v) == 0) {
        break;
      }
      res.push(await this.decode(v));
    }
    return res;
  }
  static async decodeAll(code) {
    return this.decodeTree(code);
  }
}

export { IndustryCode };
