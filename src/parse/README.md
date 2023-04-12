# [js引擎](https://juejin.cn/post/7062258342546620423)

---
> . 运算符的优先级比赋值运算符的更高
  ``` 
    let a = { n: 1 };
    let preA = a;

    a.x = a = { n: 2 };

    // a.x  ->  undefined
    // a    ->  { n: 2 }
    // preA ->  { n: 1, x: { n: 2} }
  ```
