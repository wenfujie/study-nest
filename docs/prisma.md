- [prisma.scheme](#prismascheme)
  - [模型关系 model relation](#模型关系-model-relation)
    - [术语](#术语)
    - [关系类型](#关系类型)
    - [@relation](#relation)
    - [一对一关系](#一对一关系)
    - [一对多关系](#一对多关系)
    - [多对多关系](#多对多关系)
      - [显式多对多](#显式多对多)
      - [隐式多对多](#隐式多对多)
      - [显示、隐式（多对多）使用场景区分](#显示隐式多对多使用场景区分)
    - [参照动作](#参照动作)
- [常用指令](#常用指令)

# prisma.scheme

## 模型关系 model relation

### 术语

```prisma
model User {
  id      Int      @id @default(autoincrement())
  posts   Post[]
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int // 关系标量字段 (在上述 `@relation` 属性中使用)
}

model Post {
  id         Int        @id @default(autoincrement())
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int // 关系标量字段 (在上述 `@relation` 属性中使用)
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

**关系字段**

在 Prisma 层，两个模型间的联系 **始终** 由关系 **两侧** 的 [关系字段](https://prisma.yoga/concepts/components/prisma-schema/relations#relation-fields) 构成。关系字段的类型为**另一个模型**，它们用于生成 Prisma Client ，**不会存在于数据库中**。

每个关系都必须有两个关系字段，分别存在于两个模型上。

User 与 Post 的关系字段分别为 `posts` 和 `author` 。

**关系标量字段（外键）**

标量 `authorId` 字段，被 `@relation` 属性引用，它是联系 `Post` 和 `User` 的外键，也称为关系标量字段，该字段**存在于数据库中**。

### 关系类型

Prisma 中一共有三种不同的关系类型 (或 [基数](<https://en.wikipedia.org/wiki/cardinality_(data_modeling)>))：

- [一对一 (One-to-one)](https://prisma.yoga/concepts/components/prisma-schema/relations/one-to-one-relations/) (也称为 1-1-relation)
- [一对多 (One-to-many)](https://prisma.yoga/concepts/components/prisma-schema/relations/one-to-many-relations/) (也称为 1-n-relation)
- [多对多 (Many-to-many)](https://prisma.yoga/concepts/components/prisma-schema/relations/many-to-many-relations/) (也称为 m-n-relation)

上文 Prisma schema 包含所有关系类型：

- 1-1: `User` ↔ `Profile`
- 1-n: `User` ↔ `Post`
- m-n: `Post` ↔ `Category`

### @relation

[`@relation`](https://prisma.yoga/reference/api-reference/prisma-schema-reference/#relation) 只能应用于 [关系字段](https://prisma.yoga/concepts/components/prisma-schema/relations#relation-fields)，而非 [标量字段](https://prisma.yoga/concepts/components/prisma-schema/data-model/#scalar-fields).

`@relation` 属性在以下情况是必需的：

- 你定义了一个 1-1 或 1-n 关系，在关系的 _一侧_ 是必需的 (同相应的关系标量字段一起)
- 你需要消除关系歧义 (例如在同一对模型间有两个关系)
- 你定义了 [自引用关系](https://prisma.yoga/concepts/components/prisma-schema/relations/self-relations/)
- 你定义了 [一个 MongoDB 的 m-n](https://prisma.yoga/concepts/components/prisma-schema/relations/many-to-many-relations/#mongodb)
- 你需要控制底层数据库中如何呈现关系表 (例如使用特定的关系表名)

### 一对一关系

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int // 关系标量字段 (在上述 `@relation` 属性中使用)
}
```

[一对一关系](https://prisma.yoga/concepts/components/prisma-schema/relations/one-to-one-relations)

注意📢：一对一中，无 `外键` 的模型一侧， 关系字段必须是选填的，即 `profile Profile?` 。有 `外键` 的模型一侧无限制。

当 user、userId 为必填时，意味着创建 Profile 必须关联一个user，为选填则无需关联。

**选择在哪一侧储存一对一关系外键？**

无限制，都可以。

### 一对多关系

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}
```

[一对多关系](https://prisma.yoga/concepts/components/prisma-schema/relations/one-to-many-relations)

注意📢：一对多中，列表侧必须必填，即 `posts Post[]` 。另一侧则无限制，但需要统一，即要么是 `author User` 和 `authorId Int` ，要么是 `author User?` 和 `authorId Int?` 。

当 author、authorId 必填时，意味着创建 Post 必须关联一个user，非必填时则不用。

### 多对多关系

[多对多关系](https://prisma.yoga/concepts/components/prisma-schema/relations/many-to-many-relations)

#### 显式多对多

需在 prisma 中定义关系模型，数据库会根据关系模型生成 `关系表` 。用户可在关系模型中扩展状态。

```prisma
model Post {
  id         Int                 @id @default(autoincrement())
  title      String
  categories CategoriesOnPosts[]
}

model Category {
  id    Int                 @id @default(autoincrement())
  name  String
  posts CategoriesOnPosts[]
}

model CategoriesOnPosts {
  post       Post     @relation(fields: [postId], references: [id])
  postId     Int // 关系标量字段 (在上述 `@relation` 属性中使用)
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId Int // 关系标量字段 (在上述 `@relation` 属性中使用)
  assignedAt DateTime @default(now())
  assignedBy String

  @@id([postId, categoryId])
}
```

#### 隐式多对多

prisma内部自动生成关系模型，所以用户无需在prisma中定义关系模型，数据库一样会生成 `关系表` 。缺点是无法在关系表中扩展字段。

```prisma
model Post {
  id         Int        @id @default(autoincrement())
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

#### 显示、隐式（多对多）使用场景区分

默认使用隐式多对多，当有扩展关系字段需求时（如创建关系时间）使用显示多对多。

### 参照动作

`参照动作` 即当删除、更新记录时，同时会对关联的数据进行操作。

[参照动作](https://prisma.yoga/concepts/components/prisma-schema/relations/referential-actions)

# 常用指令

**dev 环境**

```bash
# 同步表结构（修改 scheme 时使用），确认无误再执行迁移指令
npx prisma db push
```

```bash
# 同步数据库（--name 指定文件夹名称）
npx prisma migrate dev --name init

# 重置数据库（自动运行种子脚本）
npx prisma migrate reset
```

pro 环境

```bash
# 同步数据库
npx prisma migrate deploy
```
