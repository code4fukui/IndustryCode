# IndustryCode

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A library for handling Japanese industry classification codes. It provides functions for code-to-text conversion, text-to-code conversion, hierarchical display of industry classifications, and industry classification search.

## Usage

```js
import { IndustryCode } from "https://code4fukui.github.io/IndustryCode/IndustryCod.js";

console.log(await IndustryCode.encode("高等専門学校"));
console.log(await IndustryCode.decode("8163"));
console.log(await IndustryCode.find("ソフトウェア"));
```

## License

MIT License — see [LICENSE](LICENSE).