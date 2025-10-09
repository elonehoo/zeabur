import type {
  CheckDomainAvailableResult,
  CleanupLogsResult,
  CloneProjectResult,
  CloneRepoResult,
  DeploymentResult,
  DeploymentSpecification,
  Domain,
  EnvironmentVariable,
  ExportedInformation,
  GitProvider,
  GitRef,
  PresignedURL,
  Project,
  RequestPhoneVerificationResponse,
  S3Object,
  Server,
  Service,
  ServiceSpecSchemaInput,
  ServiceTemplate,
  Template,
} from '../types'
import type { ZeaburClient } from './client'

type Selection = string | undefined

// ------------------------------------------------------------
// Mutation 参数类型定义（与 GraphQL schema 对应）
// 仅覆盖当前 helper 中实现的常用操作。
// ------------------------------------------------------------

export interface CreateBackupArgs {
  environmentID: string
  serviceID: string
}
export interface AddDomainArgs {
  serviceID: string
  domain: string
  isGenerated: boolean
  environmentID?: string
  redirectTo?: string
  portName?: string
}
export interface CheckDomainAvailableArgs {
  domain: string
  isGenerated: boolean
}
export interface CreateEnvironmentVariableArgs {
  serviceID: string
  environmentID: string
  key: string
  value: string
}
export interface CloneGitRepoOfServiceArgs {
  serviceID: string
  githubOAuthCode: string
  repoName: string
  isPrivate: boolean
}
export interface ExportRuntimeLogsArgs {
  environmentID: string
  serviceID: string
  startAt: string
  deploymentID?: string
  limit?: number
}
export interface CleanupLogsArgs {
  environmentID: string
  serviceID: string
  days?: number
}
export interface CreateProjectArgs {
  name?: string
  region?: string
}
export interface CloneProjectArgs {
  environmentId: string
  projectId: string
  targetRegion: string
  suspendOldProject: boolean
}
export interface RegisterServerArgs {
  ip: string
  sshPort: number
  sshRootPrivateKey?: string
  sshRootPassword?: string
  sshUsername?: string
  sshPassword?: string
}
export interface RentServerArgs {
  id: string
  plan: string
  region: string
  duration: number
}
export interface CreateServiceArgs {
  name: string
  template: ServiceTemplate
  projectID: string
  gitProvider?: GitProvider
  repoID?: number
  rootDirectory?: string
  branchName?: string
  customBuildCommand?: string
  customStartCommand?: string
  variables?: Record<string, string>
}
export interface CreatePrebuiltServiceArgs {
  projectID: string
  schema?: ServiceSpecSchemaInput
  rawSchema?: string
  marketplaceCode?: string
}
export interface DeployFromSpecificationArgs {
  serviceID: string
  specification: DeploymentSpecification
}
export interface DeployTemplateArgs {
  code: string
  projectID?: string
}
export interface CreateTemplateArgs {
  code?: string
  name: string
  description: string
  readme: string
  coverURL?: string
  iconURL?: string
  previewURL?: string
}
export interface CreateTemplateFromFileArgs {
  code?: string
  name: string
  description: string
  readme: string
  fileContent: string
}
export interface RequestPhoneVerificationArgs {
  phone: string
  countryCode: string
}
export interface RenameProjectArgs {
  _id: string
  name: string
}
export interface DeleteProjectArgs {
  _id: string
}
export interface RedeployServiceArgs {
  serviceID: string
}
export interface RestartServiceArgs {
  serviceID: string
}
export interface SuspendServiceArgs {
  serviceID: string
}
export interface RebootServerArgs {
  serverID: string
}
export interface RechargeArgs {
  amount: number
  method: string
}
// Newly added remaining schema mutations
export interface CreatePostgresDatabaseArgs {
  environmentID: string
  serviceID: string
  name: string
}
export interface DeletePostgresDatabaseArgs {
  environmentID: string
  serviceID: string
  name: string
}
export interface CreateMySQLDatabaseArgs {
  environmentID: string
  serviceID: string
  name: string
}
export interface DeleteMySQLDatabaseArgs {
  environmentID: string
  serviceID: string
  name: string
}
export interface SetAutoBackupArgs {
  environmentID: string
  serviceID: string
  enabled: boolean
  backupHour?: number
}
export interface ExecuteDatabaseCommandArgs {
  environmentID: string
  serviceID: string
  command: string
  databaseName: string
}
export interface MountVolumeArgs {
  serviceID: string
  id: string
  dir: string
}
export interface UnmountVolumeArgs {
  serviceID: string
  id: string
}
export interface CreateBucketArgs {
  environmentID: string
  serviceID: string
  bucketName: string
}
export interface DeleteBucketArgs {
  environmentID: string
  serviceID: string
  bucketName: string
}
export interface PutObjectArgs {
  environmentID: string
  serviceID: string
  bucketName: string
  objectKey: string
  content: string
  contentType?: string
}
export interface DeleteObjectArgs {
  environmentID: string
  serviceID: string
  bucketName: string
  objectKey: string
}
export interface GetObjectPresignedURLArgs {
  environmentID: string
  serviceID: string
  bucketName: string
  objectKey: string
  expireSeconds: number
  method: string
}
export interface DeployArgs {
  serviceID: string
  environmentID?: string
  uploadID?: string
  gitRef?: GitRef
  vars?: Record<string, any>
  rootDirectory?: string
}
export interface CancelOngoingDeploymentArgs {
  deploymentID: string
}
export interface RollbackDeploymentArgs {
  deploymentID: string
}
export interface RemoveDomainArgs {
  domain: string
}
export interface DeleteEnvironmentArgs {
  _id: string
}
export interface RenameEnvironmentArgs {
  _id: string
  name: string
}

/**
 * 通用 mutation 执行入口。内部使用 inline 参数拼接模式（非 $variables），适合快速调用。
 * @param c ZeaburClient 实例
 * @param name mutation 名称
 * @param args 参数对象（将被序列化为内联字面量）
 * @param sel 自定义 selection set；若省略且返回标量则无 selection
 */

export function executeMutation<T = any>(
  c: ZeaburClient,
  name: string,
  args?: Record<string, any>,
  sel?: Selection,
) {
  return c.executeInline<T>('mutation', name, args, sel)
}

// 典型对象返回 --------------------------------
/** 触发创建备份（返回是否成功） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createBackup） */
export function mutateCreateBackup(c: ZeaburClient, args: CreateBackupArgs): Promise<boolean> {
  return executeMutation(c, 'createBackup', args)
}
/** 添加域名 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: addDomain） */
export function mutateAddDomain(c: ZeaburClient, args: AddDomainArgs, sel: Selection = '_id domain status createdAt'): Promise<Domain> {
  return executeMutation(c, 'addDomain', args, sel)
}
/** 检查域名可用性 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: checkDomainAvailable） */
export function mutateCheckDomainAvailable(c: ZeaburClient, args: CheckDomainAvailableArgs, sel: Selection = 'isAvailable reason availableSuffixes'): Promise<CheckDomainAvailableResult> {
  return executeMutation(c, 'checkDomainAvailable', args, sel)
}
/** 创建环境变量 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createEnvironmentVariable） */
export function mutateCreateEnvironmentVariable(c: ZeaburClient, args: CreateEnvironmentVariableArgs, sel: Selection = '_id key value createdAt'): Promise<EnvironmentVariable> {
  return executeMutation(c, 'createEnvironmentVariable', args, sel)
}
/** 克隆 Git 仓库到服务 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: cloneGitRepoOfService） */
export function mutateCloneGitRepoOfService(c: ZeaburClient, args: CloneGitRepoOfServiceArgs, sel: Selection = 'projectID serviceID repoURL'): Promise<CloneRepoResult> {
  return executeMutation(c, 'cloneGitRepoOfService', args, sel)
}
/** 导出运行时日志 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: exportRuntimeLogs） */
export function mutateExportRuntimeLogs(c: ZeaburClient, args: ExportRuntimeLogsArgs, sel: Selection = 'url'): Promise<ExportedInformation> {
  return executeMutation(c, 'exportRuntimeLogs', args, sel)
}
/** 清理历史日志 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: cleanupLogs） */
export function mutateCleanupLogs(c: ZeaburClient, args: CleanupLogsArgs, sel: Selection = 'status count'): Promise<CleanupLogsResult> {
  return executeMutation(c, 'cleanupLogs', args, sel)
}
/** 创建项目 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createProject） */
export function mutateCreateProject(c: ZeaburClient, args: CreateProjectArgs = {}, sel: Selection = '_id name createdAt'): Promise<Project> {
  return executeMutation(c, 'createProject', args, sel)
}
/** 克隆项目 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: cloneProject） */
export function mutateCloneProject(c: ZeaburClient, args: CloneProjectArgs, sel: Selection = 'newProjectId'): Promise<CloneProjectResult> {
  return executeMutation(c, 'cloneProject', args, sel)
}
/** 注册自带服务器 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: registerServer） */
export function mutateRegisterServer(c: ZeaburClient, args: RegisterServerArgs, sel: Selection = '_id name ip createdAt'): Promise<Server> {
  return executeMutation(c, 'registerServer', args, sel)
}
/** 租用托管服务器 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: rentServer） */
export function mutateRentServer(c: ZeaburClient, args: RentServerArgs, sel: Selection = '_id name ip createdAt'): Promise<Server> {
  return executeMutation(c, 'rentServer', args, sel)
}
/** 创建服务（GIT 模板等） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createService） */
export function mutateCreateService(c: ZeaburClient, args: CreateServiceArgs, sel: Selection = '_id name status createdAt'): Promise<Service> {
  return executeMutation(c, 'createService', args, sel)
}
/** 创建预构建服务 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createPrebuiltService） */
export function mutateCreatePrebuiltService(c: ZeaburClient, args: CreatePrebuiltServiceArgs, sel: Selection = '_id name status createdAt'): Promise<Service> {
  return executeMutation(c, 'createPrebuiltService', args, sel)
}
/** 从 specification 触发部署 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: deployFromSpecification） */
export function mutateDeployFromSpecification(c: ZeaburClient, args: DeployFromSpecificationArgs, sel: Selection = 'deploymentID'): Promise<DeploymentResult> {
  return executeMutation(c, 'deployFromSpecification', args, sel)
}
/** 根据模板代码部署（若 schema 另有流程可扩展） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: deployTemplate） */
export function mutateDeployTemplate(c: ZeaburClient, args: DeployTemplateArgs, sel: Selection = '_id name createdAt'): Promise<Project> {
  return executeMutation(c, 'deployTemplate', args, sel)
}
/** 创建模板（结构化数据） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createTemplate） */
export function mutateCreateTemplate(c: ZeaburClient, args: CreateTemplateArgs, sel: Selection = 'code name createdAt'): Promise<Template> {
  return executeMutation(c, 'createTemplate', args, sel)
}
/** 通过文件内容创建模板 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createTemplateFromFile） */
export function mutateCreateTemplateFromFile(c: ZeaburClient, args: CreateTemplateFromFileArgs, sel: Selection = 'code name createdAt'): Promise<Template> {
  return executeMutation(c, 'createTemplateFromFile', args, sel)
}
/** 请求手机验证码 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: requestPhoneVerification） */
export function mutateRequestPhoneVerification(c: ZeaburClient, args: RequestPhoneVerificationArgs, sel: Selection = 'verificationID'): Promise<RequestPhoneVerificationResponse> {
  return executeMutation(c, 'requestPhoneVerification', args, sel)
}

// 标量常用（示例） ------------------------------
export function mutateRenameProject(c: ZeaburClient, args: RenameProjectArgs): Promise<boolean> { // Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: renameProject）
  return executeMutation(c, 'renameProject', args)
}
export function mutateDeleteProject(c: ZeaburClient, args: DeleteProjectArgs): Promise<boolean> { // Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: deleteProject）
  return executeMutation(c, 'deleteProject', args)
}
export function mutateRedeployService(c: ZeaburClient, args: RedeployServiceArgs): Promise<boolean> { // Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: redeployService）
  return executeMutation(c, 'redeployService', args)
}
export function mutateRestartService(c: ZeaburClient, args: RestartServiceArgs): Promise<boolean> { // Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: restartService）
  return executeMutation(c, 'restartService', args)
}
export function mutateSuspendService(c: ZeaburClient, args: SuspendServiceArgs): Promise<boolean> { // Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: suspendService）
  return executeMutation(c, 'suspendService', args)
}
export function mutateRebootServer(c: ZeaburClient, args: RebootServerArgs): Promise<boolean> { // Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: rebootServer）
  return executeMutation(c, 'rebootServer', args)
}
export function mutateRecharge(c: ZeaburClient, args: RechargeArgs): Promise<string> { // Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: recharge）
  return executeMutation(c, 'recharge', args)
}

// --- Newly implemented remaining schema mutations ---
/** 创建 Postgres 数据库 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createPostgresDatabase） */
export function mutateCreatePostgresDatabase(c: ZeaburClient, args: CreatePostgresDatabaseArgs): Promise<boolean> {
  return executeMutation(c, 'createPostgresDatabase', args)
}
/** 删除 Postgres 数据库 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: deletePostgresDatabase） */
export function mutateDeletePostgresDatabase(c: ZeaburClient, args: DeletePostgresDatabaseArgs): Promise<boolean> {
  return executeMutation(c, 'deletePostgresDatabase', args)
}
/** 创建 MySQL 数据库 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createMySQLDatabase） */
export function mutateCreateMySQLDatabase(c: ZeaburClient, args: CreateMySQLDatabaseArgs): Promise<boolean> {
  return executeMutation(c, 'createMySQLDatabase', args)
}
/** 删除 MySQL 数据库 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: deleteMySQLDatabase） */
export function mutateDeleteMySQLDatabase(c: ZeaburClient, args: DeleteMySQLDatabaseArgs): Promise<boolean> {
  return executeMutation(c, 'deleteMySQLDatabase', args)
}
/** 设置自动备份 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: setAutoBackup） */
export function mutateSetAutoBackup(c: ZeaburClient, args: SetAutoBackupArgs): Promise<boolean> {
  return executeMutation(c, 'setAutoBackup', args)
}
/** 执行数据库命令 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: executeDatabaseCommand） */
export function mutateExecuteDatabaseCommand(c: ZeaburClient, args: ExecuteDatabaseCommandArgs): Promise<string> {
  return executeMutation(c, 'executeDatabaseCommand', args)
}
/** 挂载卷 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: mountVolume） */
export function mutateMountVolume(c: ZeaburClient, args: MountVolumeArgs): Promise<boolean> {
  return executeMutation(c, 'mountVolume', args)
}
/** 卸载卷 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: unmountVolume） */
export function mutateUnmountVolume(c: ZeaburClient, args: UnmountVolumeArgs): Promise<boolean> {
  return executeMutation(c, 'unmountVolume', args)
}
/** 创建对象存储 Bucket | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: createBucket） */
export function mutateCreateBucket(c: ZeaburClient, args: CreateBucketArgs): Promise<boolean> {
  return executeMutation(c, 'createBucket', args)
}
/** 删除对象存储 Bucket | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: deleteBucket） */
export function mutateDeleteBucket(c: ZeaburClient, args: DeleteBucketArgs): Promise<boolean> {
  return executeMutation(c, 'deleteBucket', args)
}
/** 上传对象 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: putObject） */
export function mutatePutObject(c: ZeaburClient, args: PutObjectArgs, sel: Selection = 'key size lastModified contentType'): Promise<S3Object> {
  return executeMutation(c, 'putObject', args, sel)
}
/** 删除对象 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: deleteObject） */
export function mutateDeleteObject(c: ZeaburClient, args: DeleteObjectArgs): Promise<boolean> {
  return executeMutation(c, 'deleteObject', args)
}
/** 获取对象预签名 URL | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: getObjectPresignedURL） */
export function mutateGetObjectPresignedURL(c: ZeaburClient, args: GetObjectPresignedURLArgs, sel: Selection = 'url method expiresAt'): Promise<PresignedURL> {
  return executeMutation(c, 'getObjectPresignedURL', args, sel)
}
/** 直接部署（简单布署入口） | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: deploy） */
export function mutateDeploy(c: ZeaburClient, args: DeployArgs): Promise<boolean> {
  return executeMutation(c, 'deploy', args)
}
/** 取消正在进行的部署 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: cancelOngoingDeployment） */
export function mutateCancelOngoingDeployment(c: ZeaburClient, args: CancelOngoingDeploymentArgs): Promise<boolean> {
  return executeMutation(c, 'cancelOngoingDeployment', args)
}
/** 回滚部署 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: rollbackDeployment） */
export function mutateRollbackDeployment(c: ZeaburClient, args: RollbackDeploymentArgs): Promise<boolean> {
  return executeMutation(c, 'rollbackDeployment', args)
}
/** 移除域名 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: removeDomain） */
export function mutateRemoveDomain(c: ZeaburClient, args: RemoveDomainArgs): Promise<boolean> {
  return executeMutation(c, 'removeDomain', args)
}
/** 删除环境 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: deleteEnvironment） */
export function mutateDeleteEnvironment(c: ZeaburClient, args: DeleteEnvironmentArgs): Promise<boolean> {
  return executeMutation(c, 'deleteEnvironment', args)
}
/** 重命名环境 | Explorer: https://studio.apollographql.com/public/zeabur/variant/main/explorer （mutation: renameEnvironment） */
export function mutateRenameEnvironment(c: ZeaburClient, args: RenameEnvironmentArgs): Promise<boolean> {
  return executeMutation(c, 'renameEnvironment', args)
}
