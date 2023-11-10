- [编程概念](#编程概念)
  - [ioC 控制反转](#ioc-控制反转)
  - [DTOs 限制参数类型](#dtos-限制参数类型)
- [规范](#规范)
  - [从文件夹的index导入类，而不是各个文件](#从文件夹的index导入类而不是各个文件)
- [CLI](#cli)
- [部署](#部署)

## 编程概念

nestJS结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）。

### ioC 控制反转

控制反转（Inversion of Control，缩写为 IoC）是面向对象编程中的一种设计原则，可以用来降低计算机代码之间的耦合度。其中最常见的方式叫做依赖注入（Dependency Injection，简称DI），还有一种方式叫“依赖查找”（Dependency Lookup）。通过控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体将其所依赖的对象的引用传递给它。也可以说，依赖被注入到对象中。

### DTOs 限制参数类型

DTOs 即数据传输对象，有点类似 ts 的 interface

![](https://resource5-1255303497.file.myqcloud.com/points_mall/picture/img_121184958_1630305485.png)

## 规范

### 从文件夹的index导入类，而不是各个文件

## CLI

用指令生成模块文件

```bash
# 创建完整模块
nest g resource posts

# 创建 posts.module.ts
nest g mo posts
# 创建 posts.controller.ts
nest g co posts
# posts.service.ts
nest g service posts
```

## 部署

1.ci 打包

```js
  npm i
  npm run build
```

2.Docker拷贝 `dist` 、`node_modules` 文件夹，并启动

```js
  npm run start:prod
```
