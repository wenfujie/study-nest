- [编程概念](#编程概念)
  - [使用 DTOs](#使用-dtos)
- [规范](#规范)
  - [从文件夹的index导入类，而不是各个文件](#从文件夹的index导入类而不是各个文件)
- [CLI](#cli)
- [部署](#部署)

## 编程概念

nestJS结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）。

### 使用 DTOs

DTOs 即数据传输对象，有点类似 ts 的 interface

![](https://resource5-1255303497.file.myqcloud.com/points_mall/picture/img_121184958_1630305485.png)

## 规范

### 从文件夹的index导入类，而不是各个文件

## CLI

用指令生成模块文件

```bash
# 创建新模块 posts
nest g mo posts
# 创建 posts.controller
nest g co posts
# posts.service
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
