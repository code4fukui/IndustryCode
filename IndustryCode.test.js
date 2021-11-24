import * as t from "https://deno.land/std/testing/asserts.ts";
import { IndustryCode } from "./IndustryCode.js";

Deno.test("encode", async () => {
  t.assertEquals(await IndustryCode.encode("高等専門学校"), "8163");
  t.assertEquals(await IndustryCode.encode("金融業，保険業"), "J");
});
Deno.test("decode", async () => {
  t.assertEquals(await IndustryCode.decode("81"), "学校教育");
  t.assertEquals(await IndustryCode.decode("8163"), "高等専門学校");
  t.assertEquals(await IndustryCode.decode("J"), "金融業，保険業");
  t.assertEquals(await IndustryCode.decode("03"), "漁業（水産養殖業を除く）");
  t.assertEquals(await IndustryCode.decode("3333"), null);
});
Deno.test("find", async () => {
  const expected = [
    "ソフトウェア業",
    "受託開発ソフトウェア業",
    "組込みソフトウェア業",
    "パッケージソフトウェア業",
    "ゲームソフトウェア業",
  ];
  t.assertEquals(await IndustryCode.find("ソフトウェア"), expected);
});
Deno.test("decodeTree", async () => {
  t.assertEquals(await IndustryCode.decodeTree("81"), ["教育，学習支援業", "学校教育"]);
  t.assertEquals(await IndustryCode.decodeTree("8163"), ["教育，学習支援業", "学校教育", "高等教育機関", "高等専門学校"]);
  t.assertEquals(await IndustryCode.decodeTree("03"), ["漁業", "漁業（水産養殖業を除く）"]);
});
Deno.test("decodeChild", async () => {
  t.assertEquals(await IndustryCode.getChildCodes("A"), ["01", "02"]);
  t.assertEquals(await IndustryCode.getChildCodes("M"), ["75", "76", "77"]);
  t.assertEquals(await IndustryCode.getChildCodes("01"), ["010", "011", "012", "013", "014"]);
});
