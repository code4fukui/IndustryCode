import { CSV } from "https://js.sabae.cc/CSV.js";

const compareByIndustryCode = (a, b) => {
  const na = a.length;
  const nb = b.length;
  if (na != nb) {
    return na - nb;
  }
  return a.localeCompare(b);
};

class IndustryCode {
  static url = "https://code4fukui.github.io/IndustryCode/"; // default
  static setDataPath(url) {
    this.url = url;
  }
  static fn = "000420038.csv";
  static csv = null;
  static async init() {
    if (IndustryCode.csv) {
      return IndustryCode.csv;
    }
    return IndustryCode.csv = await CSV.fetch(this.url + IndustryCode.fn);
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
    if (s == null || s.length == 0) {
      return null;
    }
    const csv = await IndustryCode.init();
    let value = csv.find(line => line[line.length - 1] == s);
    if (!value) {
      const cutBlacket = (s) => {
        const n = s.indexOf("（");
        if (n < 0) {
          return null;
        }
        return s.substring(0, n);
      };
      value = csv.find(line => cutBlacket(line[line.length - 1]) == s);
      if (!value) {
        return null;
      }
    }
    return IndustryCode.getCodeByRecord(value);
  }
  static async encodeTree(s) {
    const code = await IndustryCode.encode(s);
    const names = await IndustryCode.decodeTree(code);
    const res = [];
    for (const r of names) {
      res.push(await IndustryCode.encode(r));
    }
    return res;
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
  static async getChildCodes(code) {
    const csv = await IndustryCode.init();
    if (!code) {
      return null;
    }
    if (code.length >= 4) {
      return null;
    }
    const n = code.length;
    const res = [];
    for (let i = 1; i < csv.length; i++) {
      if (csv[i][n - 1] == code) {
        const s = csv[i][n];
        if (parseInt(s) > 0 && res.indexOf(s) == -1) {
          res.push(s);
        }
      }
    }
    return res;
  }
  static sortByCode(ar) {
    return ar.sort(compareByIndustryCode);
  }
}

export { IndustryCode };
