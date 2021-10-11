import { CSV } from "https://js.sabae.cc/CSV.js";

class IndustryCode {
  static fn = "000420038.csv";
  static csv = null;
  static async init() {
    if (IndustryCode.csv) {
      return IndustryCode.csv;
    }
    return IndustryCode.csv = await CSV.fetch(IndustryCode.fn);
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
    const value = csv.find(line => line.find(l => l == code || parseInt(l) == parseInt(code)));
    return value[value.length - 1];
  }
}

export { IndustryCode };
