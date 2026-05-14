# IndustryCode


日本の産業分類コードを扱うためのライブラリです。コードからテキストへの変換、テキストからコードへの変換、産業分類の階層表示、および産業分類の検索機能を提供します。

## 使い方

```js
import { IndustryCode } from "https://code4fukui.github.io/IndustryCode/IndustryCod.js";

console.log(await IndustryCode.encode("高等専門学校"));
console.log(await IndustryCode.decode("8163"));
console.log(await IndustryCode.find("ソフトウェア"));
```

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
