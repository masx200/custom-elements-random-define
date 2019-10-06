# custom-elements-random-define

`web-components` 随机定义 `custom-elements`,并且防止重名定义的 js 库

如果定义重名,则自动使用随机名称定义

由于修改了 `customElements` 的 API,所以需要在最前面引入此模块

# 安装 npm 模块

```powershell
cnpm install --save  https://github.com/masx200/custom-elements-random-define.git
```

或者

```powershell
yarn add https://github.com/masx200/custom-elements-random-define.git
```

# 使用 npm 模块

```js
import RandomDefine from "@masx200/custom-elements-random-define";
```

# 在浏览器中使用

从 cdn 获取

https://cdn.jsdelivr.net/gh/masx200/custom-elements-random-define@latest/dist/index.min.js

```js
import RandomDefine from "https://cdn.jsdelivr.net/gh/masx200/custom-elements-random-define@latest/dist/index.min.js";
```

# API

```ts
interface Class {
  new (): HTMLElement;
  prototype: HTMLElement;
}
function RandomDefine(initclass: Class, extendsname?: string): string;
```

# 使用方法

## 普通组件

```js
var mycom = class extends HTMLElement {};
RandomDefine(mycom);
var myele = new mycom();
```

## 继承组件

```js
var mycom = class extends HTMLDivElement {};
RandomDefine(mycom, "div");
var myele = new mycom();
```
