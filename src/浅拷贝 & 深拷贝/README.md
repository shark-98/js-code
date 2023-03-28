# 浅拷贝 & 深拷贝

---
> 浅拷贝
  - 只复制最外一层，里面的都还是相同引用
  - 如果拷贝的是基本数据类型，拷贝的就是基本数据类型的值
  - 如果拷贝的是引用数据类型，拷贝的仅仅只是内存地址(引用)
  - 实现方式: 
    - Object.assign
    - 扩展运算符...
    - Array.prototype.slice
    - Array.prototype.concat
  - 浅拷贝只能拷贝一层对象，如果存在对象的嵌套，那么浅拷贝就无能为力了
  - 深拷贝就是为了解决这个问题而生的，它能解决多层对象嵌套问题，实现彻底拷贝

---
> 深拷贝
  - 实现方式: 
    - JSON.stringify: 
      - 拷贝的对象中如果有 function、undefined、symbol，当使用过JSON.stringify()进行处理之后，都会消失。
      - 无法拷贝不可枚举的属性
      - 无法拷贝对象的原型链
      - 拷贝 Date 引用类型会变成字符串
      - 拷贝 RegExp 引用类型会变成空对象
      - 对象中含有NaN、Infinity以及-Infinity，JSON 序列化的结果会变成null
      - 无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)
    - lodash.cloneDeep
