# 手写javaScript模版渲染

## 前言

本文将讲解如何手写模版渲染，从简单的版本，逐步增加功能，并且比较不同方式的优劣。

~~背景：面试被问到，我直接写了一个，面试官看不懂，给我一顿问，我一顿讲解。回头看了下，网上有很多手写模版引擎的教程，良莠不齐，感觉面试官是看我写得和网上的不一样，所以感觉我写错了。这次我自己出一篇，顺便复习下。~~

## 简介

什么是模版引擎渲染？基本就是实现一个函数，输入参数是模版字符串template，数据对象obj，然后输出渲染后的字符串。例如：

```javascript
const renderTemplate = (template, obj) => {
  // ...TODO: 待实现
  return '';
}

const template = `Hello, {nickname}! Let's play {game.name}.`;
const obj = {
  nickname: 'Jack',
  game: {
    name: 'Zelta'
  }
};

const str = renderTemplate(template, obj);
console.log(str); // Hello, Jack! Let's play Zelta.
```

我们的目标就是把renderTemplate实现了。

为了实现这个目标，我们可以划分一些小目标：
1. 先支持单个变量名，如```{nickname}```；
2. 再支持链式变量，如```{game.name}```、```{a.b.c.d}```；
3. 再支持js执行，如```{a?b:c}```、```{func(a)}```

## 分步实现

### 1. 支持单个变量名

这个就是字符串匹配、替换，用正则就行。

```javascript
const renderTemplate = (template, obj) => {
  const str = template.replace(/\{.+?\}/, (matchedStr) => {
    const varName = matchedStr.slice(1, -1); // 去除前后的"{}"两个字符
    return obj[varName];
  });
  return str;
}

console.log(renderTemplate('Hello, {nickname}!', { nickname: 'Yuiffy' }));
```

其中，用到了replace的函数用法，第二参数不是传需要替换成的字符串，而是放一个函数，让我们自己处理。参考：[Mozilla replace介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace#%E6%8C%87%E5%AE%9A%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%E4%BD%9C%E4%B8%BA%E5%8F%82%E6%95%B0)

网上很多做法是先test，或exec，匹配出变量名，再replace，这样其实是进行了两次匹配。而我们直接用replace，只用进行一次匹配，效率更高。具体多高没测，可以用长文章多次循环测测。

### 2. 支持链式对象取值

链式样例：```{a.b.c['d']["f"][`g`]}```，如果不涉及变量，是这些。

涉及变量的话例如```{a[b]}```，就复杂了，这个本节先不讨论，下节再说。

看我们这个样例，其实把这些a、b、c通过split分割出来不就行了，把这些多个种类的字符都加入split规则中。

### 3. 支持js执行

其实这里才需要用到with、new Function这些功能，如果只用做到上文的程度就行，那其实用不到。

（未完工，文章施工中……）
