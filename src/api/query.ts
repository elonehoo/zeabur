import type {
  Backup,
  Bucket,
  BuildLog,
  BuildPlanItems,
  CloneProjectStatusResult,
  CloudProvider,
  Deployment,
  DeploymentConnection,
  DeploymentStatus,
  Domain,
  Environment,
  EnvironmentVariable,
  GitRef,
  GroupByEntity,
  GroupByTime,
  GroupByType,
  GroupedResults,
  ObjectList,
  Plan,
  Project,
  ProjectConnection,
  ProjectUsage,
  Referrer,
  Region,
  RuntimeLog,
  S3Object,
  Server,
  Service,
  ServiceConnection,
  ServiceSpecConnectionInstruction,
  ServiceSpecSchema,
  Template,
  TemplateConnection,
  UsageGroupByEntity,
  User,
  UserConnection,
} from '../types'
import type { ZeaburClient } from './client'

/**
 * Query 分组：按返回类型粗分类，所有函数都接受 (client, args?, selectionSet?)。
 * args 将以内联字面量方式拼接到 GraphQL 文档中；selectionSet 默认只取简单字段，可自行覆盖。
 */

type Selection = string | undefined

// ------------------------------------------------------------
// 参数类型定义（与 GraphQL Schema 对应）
// 仅包含在当前助手函数中使用的查询参数。
// ------------------------------------------------------------

export interface BuildPlanArgs {
  uploadID?: string
  deploymentID?: string
  gitRef?: GitRef
  submoduleName?: string
  variables?: Record<string, any>
}
export interface FilesArgs {
  uploadID?: string
  gitRef?: GitRef
  path?: string
}
export interface PostgresDatabasesArgs {
  serviceID?: string
  environmentID?: string
} // 如果 schema 后续增加限制可再精化
export interface MysqlDatabasesArgs {
  serviceID?: string
  environmentID?: string
}
export interface BackupsArgs {
  serviceID?: string
  environmentID?: string
}
export interface BackupArgs {
  _id: string
}
export interface BucketsArgs {
  serviceID?: string
  environmentID?: string
}
export interface ObjectsArgs {
  bucket: string
  prefix?: string
  continuationToken?: string
  maxKeys?: number
}
export interface ObjectArgs {
  bucket: string
  key: string
}
export interface DeploymentsArgs {
  serviceID: string
  environmentID: string
  cursor?: string
  perPage?: number
  filter?: DeploymentStatus
}
export interface DeploymentArgs {
  _id: string
}
export interface BuildLogsArgs {
  deploymentID: string
  projectID?: string
  timestampCursor?: string
}
export interface RuntimeLogsArgs {
  serviceID: string
  projectID?: string
  environmentID?: string
  deploymentID?: string
  timestampCursor?: string
}
export interface ProjectUsageArgs {
  projectID: string
  usageGroupByEntity: UsageGroupByEntity
}
export interface UsagesArgs {
  from: string
  to: string
  userID: string
  groupByEntity?: GroupByEntity
  groupByTime?: GroupByTime
  groupByType?: GroupByType
}
export interface ProjectsArgs {
  skip?: number
  limit?: number
  region?: string
}
export interface ProjectArgs {
  _id?: string
  owner?: string
  name?: string
}
export interface EnvironmentsArgs {
  projectID: string
}
export interface EnvironmentArgs {
  _id: string
}
export interface GitRepositoriesArgs {
  gitNamespaceID: number
  provider: string
}
export interface LatestGitRepositoriesArgs {
  provider: string
  limit: number
  gitNamespaceID?: number
}
export interface SearchGitRepositoriesArgs {
  provider: string
  Limit: number
  gitNamespaceID?: number
  keyword?: string
}
export interface GitRepoBranchesArgs {
  repoID: number
}
export interface ServerArgs {
  _id: string
}
export interface DedicatedServerRegionsArgs {
  provider: string
}
export interface DedicatedServerPlansArgs {
  provider: string
  region: string
}
export interface ServicesArgs {
  skip?: number
  limit?: number
  projectID?: string
}
export interface ServiceArgs {
  _id?: string
  owner?: string
  projectName?: string
  name?: string
}
export interface InstructionsArgs {
  serviceID: string
  environmentID: string
}
export interface ServicePlanTypePlanMetaArgs {
  repoID: number
}
export interface TemplatesArgs {
  skip?: number
  limit?: number
}
export interface TemplateArgs {
  code: string
}
export interface UserTemplatesArgs {
  skip?: number
  limit?: number
  userID: string
}
export interface IsTemplateAuthorArgs {
  code: string
}
export interface UsersArgs {
  skip?: number
  limit?: number
}
export interface UserArgs {
  _id?: string
  username?: string
  email?: string
  discordID?: string
}
export interface ReferrerArgs {
  referralCode: string
}
export interface CloneProjectStatusArgs {
  newProjectId: string
}
// Helper service wrapper args
export interface ServiceWrapperArgs {
  serviceArgs: ServiceArgs
}

// ---- 基础 / 通用 ----
/**
 * 获取构建计划（检测源码与配置后返回的推断信息列表）。
 * Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: buildPlan）
 * @param c 客户端实例
 * @param args BuildPlanArgs 可指定 uploadID / deploymentID / gitRef / variables 等
 * @param sel GraphQL selection set，自定义需要的字段，默认返回常用字段
 */
export function queryBuildPlan(c: ZeaburClient, args?: BuildPlanArgs, sel: Selection = 'key\nvalue\nname\ndescription\nicon'): Promise<BuildPlanItems[]> {
  return c.executeInline('query', 'buildPlan', args, sel)
}

/**
 * 列出代码仓库 / 上传源下的文件路径集合。
 * Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: files）
 */
export function queryFiles(c: ZeaburClient, args?: FilesArgs, sel: Selection = ''): Promise<string[]> {
  return c.executeInline('query', 'files', args, sel)
}
/**
 * 获取单个文件内容。
 * Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: fileContent）
 */
export function queryFileContent(c: ZeaburClient, args?: FilesArgs, sel: Selection = ''): Promise<string> {
  return c.executeInline('query', 'fileContent', args, sel)
}

// ---- 数据库 / 存储 ----
/** 获取 Postgres 数据库列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: postgresDatabases） */
export function queryPostgresDatabases(c: ZeaburClient, args?: PostgresDatabasesArgs, sel: Selection = 'name'): Promise<{ name: string }[]> {
  return c.executeInline('query', 'postgresDatabases', args, sel)
}
/** 获取 MySQL 数据库列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: mysqlDatabases） */
export function queryMysqlDatabases(c: ZeaburClient, args?: MysqlDatabasesArgs, sel: Selection = 'name'): Promise<{ name: string }[]> {
  return c.executeInline('query', 'mysqlDatabases', args, sel)
}
/** 获取备份列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: backups） */
export function queryBackups(c: ZeaburClient, args?: BackupsArgs, sel: Selection = '_id\nstatus\ncreatedAt\nfinishedAt'): Promise<Backup[] | undefined> {
  return c.executeInline('query', 'backups', args, sel)
}
/** 获取单个备份详情 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: backup） */
export function queryBackup(c: ZeaburClient, args?: BackupArgs, sel: Selection = '_id\nstatus\ncreatedAt\nfinishedAt'): Promise<Backup | undefined> {
  return c.executeInline('query', 'backup', args, sel)
}
/** 获取对象存储 Bucket 列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: buckets） */
export function queryBuckets(c: ZeaburClient, args?: BucketsArgs, sel: Selection = 'name\ncreationDate'): Promise<Bucket[] | undefined> {
  return c.executeInline('query', 'buckets', args, sel)
}
/** 列出对象（支持翻页 continuationToken） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: objects） */
export function queryObjects(c: ZeaburClient, args?: ObjectsArgs, sel: Selection = 'isTruncated\nnextContinuationToken\nobjects { key size lastModified }'): Promise<ObjectList | undefined> {
  return c.executeInline('query', 'objects', args, sel)
}
/** 获取对象元数据（以及内容类型） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: object） */
export function queryObject(c: ZeaburClient, args?: ObjectArgs, sel: Selection = 'key\nsize\nlastModified\ncontentType'): Promise<S3Object | undefined> {
  return c.executeInline('query', 'object', args, sel)
}

// ---- 部署 / 构建 ----
/** 获取指定服务的 Deployment 列表（分页 + 状态过滤） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: deployments） */
export function queryDeployments(c: ZeaburClient, args: DeploymentsArgs, sel: Selection = 'edges { cursor node { _id status createdAt } }'): Promise<DeploymentConnection> {
  return c.executeInline('query', 'deployments', args, sel)
}
/** 获取单个 Deployment 详情 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: deployment） */
export function queryDeployment(c: ZeaburClient, args: DeploymentArgs, sel: Selection = '_id\nstatus\ncreatedAt\nfinishedAt'): Promise<Deployment> {
  return c.executeInline('query', 'deployment', args, sel)
}
/** 获取构建日志（支持 timestampCursor 方向翻页） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: buildLogs） */
export function queryBuildLogs(c: ZeaburClient, args: BuildLogsArgs, sel: Selection = 'timestamp\nmessage'): Promise<BuildLog[]> {
  return c.executeInline('query', 'buildLogs', args, sel)
}
/** 获取运行时日志，可按 deployment / service 维度过滤 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: runtimeLogs） */
export function queryRuntimeLogs(c: ZeaburClient, args: RuntimeLogsArgs, sel: Selection = 'timestamp\nmessage\nregion\nstream'): Promise<RuntimeLog[]> {
  return c.executeInline('query', 'runtimeLogs', args, sel)
}

// ---- 项目 / 资源使用 ----
/** 获取项目用量（按实体分类） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: projectUsage） */
export function queryProjectUsage(c: ZeaburClient, args: ProjectUsageArgs, sel: Selection = 'budget\nperiodStart\nperiodEnd'): Promise<ProjectUsage> {
  return c.executeInline('query', 'projectUsage', args, sel)
}
/** 获取用户资源用量统计（可按时间/类型分组） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: usages） */
export function queryUsages(c: ZeaburClient, args: UsagesArgs, sel: Selection = 'categories\ndata { id name usageOfEntity }'): Promise<GroupedResults | undefined> {
  return c.executeInline('query', 'usages', args, sel)
}
/** 获取项目列表（分页 + 区域过滤） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: projects） */
export function queryProjects(c: ZeaburClient, args?: ProjectsArgs, sel: Selection = 'edges { cursor node { _id name createdAt } } pageInfo { totalCount hasNextPage endCursor }'): Promise<ProjectConnection> {
  return c.executeInline('query', 'projects', args, sel)
}
/** 获取单个项目 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: project） */
export function queryProject(c: ZeaburClient, args?: ProjectArgs, sel: Selection = '_id\nname\ncreatedAt'): Promise<Project> {
  return c.executeInline('query', 'project', args, sel)
}

// ---- 环境 / 变量 ----
/** 获取环境列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: environments） */
export function queryEnvironments(c: ZeaburClient, args: EnvironmentsArgs, sel: Selection = '_id\nname\ncreatedAt'): Promise<Environment[]> {
  return c.executeInline('query', 'environments', args, sel)
}
/** 获取单个环境 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: environment） */
export function queryEnvironment(c: ZeaburClient, args: EnvironmentArgs, sel: Selection = '_id\nname\ncreatedAt'): Promise<Environment> {
  return c.executeInline('query', 'environment', args, sel)
}

// ---- Git ----
/** 获取 Git 仓库列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: gitRepositories） */
export function queryGitRepositories(c: ZeaburClient, args: GitRepositoriesArgs, sel: Selection = 'id name provider url owner'): Promise<any[]> {
  return c.executeInline('query', 'gitRepositories', args, sel)
}
/** 获取最新活动的 Git 仓库列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: latestGitRepositories） */
export function queryLatestGitRepositories(c: ZeaburClient, args: LatestGitRepositoriesArgs, sel: Selection = 'id name provider url owner'): Promise<any[]> {
  return c.executeInline('query', 'latestGitRepositories', args, sel)
}
/** 搜索 Git 仓库 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: searchGitRepositories） */
export function querySearchGitRepositories(c: ZeaburClient, args: SearchGitRepositoriesArgs, sel: Selection = 'id name provider url owner'): Promise<any[]> {
  return c.executeInline('query', 'searchGitRepositories', args, sel)
}
/** 获取指定仓库分支列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: gitRepoBranches） */
export function queryGitRepoBranches(c: ZeaburClient, args: GitRepoBranchesArgs, sel: Selection = ''): Promise<string[]> {
  return c.executeInline('query', 'gitRepoBranches', args, sel)
}

// ---- 服务器 ----
/** 获取单个服务器 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: server） */
export function queryServer(c: ZeaburClient, args: ServerArgs, sel: Selection = '_id\nname\nip\nstatus { isOnline }'): Promise<Server> {
  return c.executeInline('query', 'server', args, sel)
}
/** 获取服务器列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: servers） */
export function queryServers(c: ZeaburClient, _args?: void, sel: Selection = '_id\nname\nip\nstatus { isOnline }'): Promise<Server[]> {
  return c.executeInline('query', 'servers', undefined, sel)
}
/** 获取独立服务器云厂商列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: dedicatedServerProviders） */
export function queryDedicatedServerProviders(c: ZeaburClient, _args?: void, sel: Selection = 'code name'): Promise<CloudProvider[]> {
  return c.executeInline('query', 'dedicatedServerProviders', undefined, sel)
}
/** 获取指定 provider 下的区域列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: dedicatedServerRegions） */
export function queryDedicatedServerRegions(c: ZeaburClient, args: DedicatedServerRegionsArgs, sel: Selection = 'id code name available'): Promise<Region[]> {
  return c.executeInline('query', 'dedicatedServerRegions', args, sel)
}
/** 获取指定 provider + region 的套餐列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: dedicatedServerPlans） */
export function queryDedicatedServerPlans(c: ZeaburClient, args: DedicatedServerPlansArgs, sel: Selection = 'name cpu memory disk egress price available'): Promise<any[]> {
  return c.executeInline('query', 'dedicatedServerPlans', args, sel)
}

// ---- 服务 ----
/** 获取服务列表（分页） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: services） */
export function queryServices(c: ZeaburClient, args?: ServicesArgs, sel: Selection = 'edges { cursor node { _id name status } } pageInfo { totalCount hasNextPage endCursor }'): Promise<ServiceConnection> {
  return c.executeInline('query', 'services', args, sel)
}
/** 获取单个服务 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: service） */
export function queryService(c: ZeaburClient, args: ServiceArgs, sel: Selection = '_id\nname\nstatus'): Promise<Service> {
  return c.executeInline('query', 'service', args, sel)
}
/** 获取预构建 Marketplace 项 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: prebuiltMarketplaceItems） */
export function queryPrebuiltMarketplaceItems(c: ZeaburClient, _args?: void, sel: Selection = 'id name'): Promise<ServiceSpecSchema[]> {
  return c.executeInline('query', 'prebuiltMarketplaceItems', undefined, sel)
}
/** 获取连接服务所需的指引信息（如账号密码等） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: instructions） */
export function queryInstructions(c: ZeaburClient, args: InstructionsArgs, sel: Selection = 'title\ncontent'): Promise<ServiceSpecConnectionInstruction[]> {
  return c.executeInline('query', 'instructions', args, sel)
}
/** 获取服务关联仓库的 planType / planMeta | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: servicePlanTypePlanMeta） */
export function queryServicePlanTypePlanMeta(c: ZeaburClient, args: ServicePlanTypePlanMetaArgs, sel: Selection = 'type'): Promise<Plan> {
  return c.executeInline('query', 'servicePlanTypePlanMeta', args, sel)
}

// ---- 模板 ----
/** 获取模板列表（分页） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: templates） */
export function queryTemplates(c: ZeaburClient, args?: TemplatesArgs, sel: Selection = 'edges { cursor node { code name createdAt } } pageInfo { totalCount hasNextPage endCursor }'): Promise<TemplateConnection> {
  return c.executeInline('query', 'templates', args, sel)
}
/** 获取单个模板 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: template） */
export function queryTemplate(c: ZeaburClient, args: TemplateArgs, sel: Selection = 'code name createdAt'): Promise<Template> {
  return c.executeInline('query', 'template', args, sel)
}
/** 获取某用户的模板列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: userTemplates） */
export function queryUserTemplates(c: ZeaburClient, args: UserTemplatesArgs, sel: Selection = 'edges { cursor node { code name createdAt } } pageInfo { totalCount hasNextPage endCursor }'): Promise<TemplateConnection> {
  return c.executeInline('query', 'userTemplates', args, sel)
}
/** 判断当前登录用户是否为模板作者 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: isTemplateAuthor） */
export function queryIsTemplateAuthor(c: ZeaburClient, args: IsTemplateAuthorArgs, sel: Selection = ''): Promise<boolean> {
  return c.executeInline('query', 'isTemplateAuthor', args, sel)
}

// ---- 用户 ----
/** 获取用户列表 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: users） */
export function queryUsers(c: ZeaburClient, args?: UsersArgs, sel: Selection = 'edges { cursor node { _id name username } } pageInfo { totalCount hasNextPage endCursor }'): Promise<UserConnection> {
  return c.executeInline('query', 'users', args, sel)
}
/** 获取单个用户 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: user） */
export function queryUser(c: ZeaburClient, args: UserArgs, sel: Selection = '_id\nname\nusername\ncreatedAt'): Promise<User> {
  return c.executeInline('query', 'user', args, sel)
}
/** 获取当前登录用户 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: me） */
export function queryMe(c: ZeaburClient, _args?: void, sel: Selection = '_id\nname\nusername\ncreatedAt'): Promise<User> {
  return c.executeInline('query', 'me', undefined, sel)
}
/** 根据邀请码查询推荐人 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: referrer） */
export function queryReferrer(c: ZeaburClient, args: ReferrerArgs, sel: Selection = 'name avatarURL'): Promise<Referrer> {
  return c.executeInline('query', 'referrer', args, sel)
}

// ---- Misc / Health ----
/**
 * 健康性占位查询（schema 中的 `_empty` 字段，始终返回 true，可用于快速探活或鉴权测试）。
 * Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: _empty）
 */
export function queryEmpty(c: ZeaburClient, _args?: void, sel: Selection = ''): Promise<boolean> {
  return c.executeInline('query', '_empty', undefined, sel)
}

// ---- 区域 ----
/** 获取全部区域 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: regions） */
export function queryRegions(c: ZeaburClient, _args?: void, sel: Selection = 'id code name available'): Promise<Region[]> {
  return c.executeInline('query', 'regions', undefined, sel)
}

export function queryGetBasicInformationOfProject(
  c: ZeaburClient,
  args: { projectID: string },
  sel: Selection = `_id
name
iconURL
createdAt
region {
  providerInfo { code icon name __typename }
  name
  id
  available
  __typename
}
services { name __typename }
owner { _id avatarURL name username email __typename }
collaborators { _id avatarURL name username email __typename }
__typename`,
): Promise<Project> {
  // 使用具名操作 + 变量，保持与期望的 GraphQL 请求格式一致
  const selection = (sel ?? '').trim()
  const selectionBlock = selection.length ? `\n    ${selection.split(/\r?\n/).join('\n    ')}` : ''
  const document = `query GetBasicInformationOfProject($projectID: ObjectID!) {\n  project(_id: $projectID) {${selectionBlock}\n  }\n}`
  return c.request<{ project: Project }>(document, { projectID: args.projectID }).then(r => r.project)
}

// ---- 克隆项目状态 ----
/** 查询项目克隆状态 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: cloneProjectStatus） */
export function queryCloneProjectStatus(c: ZeaburClient, args: CloneProjectStatusArgs, sel: Selection = 'newProjectId error events { type message createdAt }'): Promise<CloneProjectStatusResult> {
  return c.executeInline('query', 'cloneProjectStatus', args, sel)
}

// ---- 域名 (通过 Service.domains 侧查询) ----
/**
 * 通过查询 Service 再提取其 domains 列表的便捷方法。
 * Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: service -> domains）
 * @param args.serviceArgs ServiceArgs 与 `queryService` 相同
 */
export function queryDomainsViaService(c: ZeaburClient, args: ServiceWrapperArgs, sel: Selection = 'domains { _id domain status createdAt }'): Promise<Domain[]> {
  return c.executeInline('query', 'service', args?.serviceArgs, `_id\n${sel}`)
    .then((svc: Service) => (svc?.domains || []) as Domain[])
}

// ---- 变量 (通过 Service.variables) ----
/**
 * 通过查询 Service 再提取其环境变量列表的便捷方法。
 * Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （operation: service -> variables）
 * @param args.serviceArgs ServiceArgs 与 `queryService` 相同
 */
export function queryVariablesViaService(c: ZeaburClient, args: ServiceWrapperArgs, sel: Selection = 'variables { _id key value createdAt }'): Promise<EnvironmentVariable[]> {
  return c.executeInline('query', 'service', args?.serviceArgs, `_id\n${sel}`)
    .then((svc: Service) => (svc?.variables || []) as EnvironmentVariable[])
}
