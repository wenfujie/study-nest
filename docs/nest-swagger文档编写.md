
- [swagger 文档编写](#swagger-文档编写)
  - [编写接口描述](#编写接口描述)
  - [什么是 dto](#什么是-dto)
  - [ApiProperty 和 ApiPropertyOptional](#apiproperty-和-apipropertyoptional)
  - [枚举](#枚举)
  - [将 dto 转为 interface](#将-dto-转为-interface)
  - [类型转换 PartialType、PickType、OmitType、IntersectionType](#类型转换-partialtypepicktypeomittypeintersectiontype)

## swagger 文档编写

`@nestjs/swagger` 提供很多装饰器辅助我们编写 swagger 文档。

### 编写接口描述

```js
// Controller
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('待办事项')
@Controller('todo')
export class TodoController {
  @ApiResponse({ type: PersonDTO })
  @ApiOperation({ summary: '新增' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token'
  })
  @Post()
  create(@Body() person: PersonDTO) {}
}
```

- `ApiBearerAuth`：为控制器或接口启动token验证，可在文档上操作添加头部 token 。
- `ApiTags`：分类标签。
- `ApiResponse`：接口响应类型描述，type 值必须是 dto 类
- `ApiOperation`：接口功能描述
- `ApiHeader`：定义头部
- `@Body,@Query,@Param`：swagger 还会解析这些装饰器对应的 dto 来生成文档。

### 什么是 dto

> dto：属性用 `@ApiProperty` 装饰的实体类，dto 会被 swagger 解析，还可以配合管道做参数校验。

```js
// dto
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateTodoDto {
  @ApiProperty({ description: '标题' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: '描述' })
  description?: string;
}
```

### ApiProperty 和 ApiPropertyOptional

**`ApiProperty`**：描述必填属性

1. type 类型
2. required 是否必填，默认true
3. description 描述
4. default 默认值
5. name 重命名字段名称，文档中按照这个name的value为最终输入值
6. isArray 当字段为数组时需设置为 true

**`ApiPropertyOptional`**：描述可选属性

参数参考 `ApiProperty` ，required 默认为 false 。

### 枚举

通过设置枚举，在 swagger 文档上可通过下拉框选值。

```js
@ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
role: UserRole;
```

或

```js
export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User'
}

@ApiQuery({ name: 'role', enum: UserRole })
async filterByRole(@Query('role') role: UserRole = UserRole.User) {}

```

### 将 dto 转为 interface

我们用 `@ApiResponse` 为接口声明响应结构需要书写一个 dto

```js
class PersonDto {
  @ApiPropertyOptional({ description: '名称' })
  name: string;
}
```

在 service 编写实体方法的实现时需要返回一个相同的类型，使用继承即可

```js
// { name: string }
interface IPerson extends PersonDto {}
```

### 类型转换 PartialType、PickType、OmitType、IntersectionType

这几个函数类似ts的类型工具，它们的作用是基于实体类型创建变体。

- `PartialType` 函数返回一个类型(类)将输入的所有属性配置为可选的。
- `PickType` 函数从输入类型中拾取一部分属性并生成一个新类型(类) 。
- `OmitType` 移除输入类型指定部分属性，返回剩下属性的新类型。
- `IntersectionType` 函数将两个类型组合为一个新类型（类）。

```js
import { PickType, OmitType, PartialType, IntersectionType } from '@nestjs/swagger';

class UpdateCatDto extends PartialType(CreateCatDto) {}

class UpdateCatAgeDto extends PickType(CreateCatDto, ['age'] as const) {}

class UpdateCatDto extends OmitType(CreateCatDto, ['name'] as const) {}

class UpdateCatDto extends IntersectionType(
  CreateCatDto,
  AdditionalCatInfo,
) {}


```

组合使用

```js
class UpdateCatDto extends PartialType(
  OmitType(CreateCatDto, ['name'] as const),
) {}
```
