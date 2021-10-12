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
  t.assertEquals(await IndustryCode.decode("3"), "漁業（水産養殖業を除く）");
  //t.assertEquals(await IndustryCode.decode("3333"), null);
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
Deno.test("decodeAll", async () => {
  t.assertEquals(await IndustryCode.decodeAll("8163"), ["高等専門学校"]);
});
