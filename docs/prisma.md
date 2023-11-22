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
- [指令](#指令)
  - [Prisma Migrate](#prisma-migrate)
    - [初始化、新增、编辑模型](#初始化新增编辑模型)
    - [更新 PRO](#更新-pro)
    - [重置数据库](#重置数据库)
    - [基线版本](#基线版本)

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

# 指令

## Prisma Migrate

`Prisma Migrate` 是 prisma 的数据库迁移工具，用于将 `schema.prisma` 模型结构同步到数据库表结构。

### 初始化、新增、编辑模型

在 `prisma/schema.prisma` 中编辑好 model 后，执行以下指令即可开始同步模型到数据库。

```bash
# --name 指定迁移记录文件夹名称，便于查看
npx prisma migrate dev --name init-db
```

```bash
# --create-only 只生成迁移文件不自动执行，可人为进行修改sql文件，修改后再 migrate dev 应用
npx prisma migrate dev --name init-db --create-only
```

prisma 会执行以下任务

- 比对 `schema.prisma` 和数据库的差异，生成了 SQL 语句存放在 `prisma/migrations`
- Prisma 执行这些 SQL 语句来更新数据库，进行了具体的建表、改表等操作
- Prisma Client 重新生成新模型的操作 API

### 更新 PRO

```bash
npx prisma migrate deploy
```

`migrate deploy` 用于更新生产数据库，它不会生成 SQL 文件，它负责找到未执行的迁移文件并运行 SQL 语句。

这里 `未执行的迁移文件` 指的是开发环境 `migrate dev` 生成的迁移记录文件。

Prisma 会执行以下任务

- 找到尚未执行的迁移文件，并运行里面的SQL语句来更新数据库 schema
- 迁移完成后可以重新启动相关服务
- 下次部署时，`migrate deploy` 会自动忽略已迁移文件

### 重置数据库

一般在 dev 环境使用，会清空数据库的数据。

```bash
npx prisma migrate reset
```

Prisma 会执行以下任务

- 删除数据库中所有由Prisma Migrate创建的表
- 删除\_Migration表，这是Prisma Migrate内部用来记录迁移历史的表
- 重新创建并初始化\_Migration表

### 基线版本

`基线版本(Baselining) ` 用于告诉 Prisma Migrate 某些迁移 `已经被执行过` 需跳过它们。

```bash
npx prisma migrate resolve --applied 20210426141759_initial-migration-for-db
```

该命令将目标迁移添加到_prisma_migrations表中，并将其标记为已应用。当你运行prisma migrate deploy来应用新的迁移时，Prisma Migrate 会：

- 跳过所有标记为 "应用" 的迁移，包括 基线版本(baseline) 迁移。
- 应用所有 基线版本(baseline) 迁移 后面 的新迁移。