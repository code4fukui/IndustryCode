import * as t from "https://deno.land/std/testing/asserts.ts";
import { IndustryCode } from "./IndustryCode.js";

Deno.test("encode", async () => {
  t.assertEquals(await IndustryCode.encode("高等専門学校"), "8163");
  t.assertEquals(await IndustryCode.encode("金融業，保険業"), "J");
});
Deno.test("decode", async () => {
  t.assertEquals(await IndustryCode.decode("8163"), "高等専門学校");
  t.assertEquals(await IndustryCode.decode("J"), "金融業，保険業");
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
