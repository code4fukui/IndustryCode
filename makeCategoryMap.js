import { IndustryCode } from "https://code4fukui.github.io/IndustryCode/IndustryCode.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

/*
const a = [];
for (let i = "A".charCodeAt(0); i <= "T".charCodeAt(0); i++) {
  a.push(String.fromCharCode(i));
}
const b = {}
for (const a1 of a) {
  b[a1] = await IndustryCode.getChildCodes(a1);
}
//console.log(b);
console.log(JSON.stringify(b, null, 2));
*/


//const res = await Promise.all(ArrayUtil.make("A", "T").map(async (a) => await IndustryCode.getChildCodes(a)));
const res = await ArrayUtil.mapToObject(ArrayUtil.make("A", "T"), async (a) => await IndustryCode.getChildCodes(a));
console.log(JSON.stringify(res, null, 2));
