# 测试指南

## 快速开始

本项目使用**真实 API 集成测试**，需要配置 Zeabur API Token。

### 1. 获取 API Token

访问 [Zeabur Developer Settings](https://dash.zeabur.com/account/developer) 获取你的 API token。

### 2. 配置环境变量

创建 `.env` 文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的配置：

```env
# 必填：你的 Zeabur API Token
ZEABUR_TOKEN=your_token_here

# 可选配置
ZEABUR_ENDPOINT=https://gateway.zeabur.com/graphql
TEST_PROJECT_NAME=zeabur-sdk-test
TEST_REGION=aws-us-west-1
CLEANUP_AFTER_TESTS=false
```

### 3. 运行测试

```bash
# 运行测试（一次性）
pnpm test

# 监听模式（实时运行测试）
pnpm test:watch

# UI 界面
pnpm ui

# 生成覆盖率报告
pnpm test:coverage
```

**提示**：
- 如果未配置 `ZEABUR_TOKEN`，测试会被跳过并显示提示信息
- 配置 token 后，测试会自动运行
- 首次运行会创建测试项目，后续运行会复用

## 测试策略

### 测试项目管理

测试会在你的 Zeabur 账号中创建或使用一个专门的测试项目：

1. **自动创建**：首次运行时，如果不存在名为 `zeabur-sdk-test` 的项目，会自动创建
2. **重复使用**：后续运行会复用这个项目，不会重复创建
3. **手动指定**：可以在 `.env` 中设置 `TEST_PROJECT_ID` 使用现有项目
4. **清理选项**：设置 `CLEANUP_AFTER_TESTS=true` 可在测试完成后删除项目

### 测试覆盖范围

- ✅ 用户认证
- ✅ 区域查询
- ✅ 项目操作（查询、列表、重命名）
- ✅ 环境操作
- ✅ 服务操作
- ✅ 错误处理

## 环境变量说明

| 变量 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `ZEABUR_TOKEN` | ✅ | - | Zeabur API Token |
| `ZEABUR_ENDPOINT` | ❌ | `https://gateway.zeabur.com/graphql` | GraphQL 端点 |
| `TEST_PROJECT_NAME` | ❌ | `zeabur-sdk-test` | 测试项目名称 |
| `TEST_PROJECT_ID` | ❌ | - | 指定现有项目 ID |
| `TEST_REGION` | ❌ | `aws-us-west-1` | 测试资源区域 |
| `CLEANUP_AFTER_TESTS` | ❌ | `false` | 测试后删除项目 |

## 注意事项

⚠️ **重要提醒**：

1. 测试会调用**真实的 Zeabur API**
2. 会在你的账号中创建真实的项目（默认不会删除）
3. 建议在测试账号或开发环境中运行
4. `.env` 文件已被 `.gitignore` 忽略，不会泄露 token

## 故障排除

### Token 未配置

```
❌ ZEABUR_TOKEN is required for integration tests
   Get your token from: https://dash.zeabur.com/account/developer
   Then set it in .env file
```

**解决方法**：在 `.env` 文件中设置 `ZEABUR_TOKEN`

### 权限错误

如果遇到权限错误，请确保：
- Token 有效且未过期
- 账号有创建项目的权限
- 指定的区域可用

### 清理测试项目

如果想手动清理测试项目：

1. 访问 [Zeabur Dashboard](https://dash.zeabur.com)
2. 找到名为 `zeabur-sdk-test` 的项目
3. 删除该项目

或者设置 `CLEANUP_AFTER_TESTS=true` 让测试自动清理。
