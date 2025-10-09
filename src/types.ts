export interface Alipay {
  type: string
}
export type String = string
export interface AutoBackup {
  enabled: boolean
  backupHour?: number
}
export type Boolean = boolean
export type Int = number
export interface AutoRestart {
  enabled: boolean
  restartHour?: number
}
export interface Backup {
  _id: string
  environmentID: string
  serviceID: string
  fileSize?: number
  downloadURL?: string
  status: BackupStatus
  createdAt: string
  finishedAt?: string
}
export type BackupStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED'
export interface Bucket {
  name: string
  creationDate: string
}
export interface BuildJob {
  _id: string
  createdAt: string
  status: BuildJobStatus
  deployment: Deployment
}
export interface BuildJobConnection {
  pageInfo: PageInfo
  edges: BuildJobEdge[]
}
export interface BuildJobEdge {
  node: BuildJob
  cursor: string
}
export type BuildJobStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED'
export interface BuildLog {
  message: string
  timestamp: string
}
export interface BuildPlanItems {
  key: string
  value: string
  name?: string
  description?: string
  icon?: string
}
export interface Card {
  type: string
  brand: string
  last4: string
  expMonth: number
  expYear: number
}
export type CheckDockerImageResult = 'REGISTRY_NOT_SUPPORTED' | 'REGISTRY_CONNECTION_FAILED' | 'IMAGE_NOT_FOUND' | 'TAG_NOT_FOUND' | 'UNAUTHORIZED' | 'OK'
export interface CheckDomainAvailableResult {
  isAvailable: boolean
  reason?: string
  availableSuffixes: string[]
}
export interface CleanupLogsResult {
  status: string
  count: number
}
export interface CloneProjectCompleted {
  successMessage: string
}
export interface CloneProjectCredentialsUpdating {
  databaseServices: string[]
}
export interface CloneProjectDeploying {
  templateYaml: string
}
export interface CloneProjectEvent {
  type: string
  createdAt: string
  message: string
}
export type CloneProjectEventPayload = CloneProjectStarted | CloneProjectDeploying | CloneProjectVolumesCopying | CloneProjectCredentialsUpdating | CloneProjectGitRebinding | CloneProjectCompleted | CloneProjectFailed | ServiceCloneStarted | ServiceCloneCompleted | ServiceCloneFailed | VolumeCloneStarted | VolumeCloneCompleted | VolumeCloneFailed
export interface CloneProjectFailed {
  errorMessage: string
}
export interface CloneProjectGitRebinding {
  gitServices: string[]
}
export interface CloneProjectResult {
  newProjectId: string
}
export interface CloneProjectStarted {
  sourceProjectId: string
  targetRegion: string
}
export interface CloneProjectStatusResult {
  newProjectId?: string
  events: CloneProjectEvent[]
  error?: string
}
export interface CloneProjectVolumesCopying {
  serviceNames: string[]
}
export interface CloneRepoResult {
  projectID: string
  serviceID: string
  repoURL: string
}
export interface CloudProvider {
  code: string
  name: string
  icon: string
  homepage: string
  console: string
  canRefund: boolean
}
export interface CommandResult {
  exitCode: number
  output: string
}
export interface ConfigInfo {
  content: string
  permission: number
  envsubst?: boolean
}
export type CopyVolumeToNewServiceStatus = 'UNKNOWN' | 'PREPARING' | 'BACKING_UP' | 'RESTORING' | 'COMPLETED' | 'FAILED'
export type Currency = 'USD' | 'CNY'
export interface DNSRecord {
  recordType: string
  recordName: string
  recordValue: string
}
export interface DedicatedServerPlan {
  name: string
  cpu: number
  memory: number
  disk: number
  egress: number
  price: number
  originalPrice?: number
  gpu?: string
  features: string[]
  available: boolean
  maxOutboundBandwidth?: number
}
export interface Deployment {
  _id: string
  gitProvider: GitProvider
  repoOwner: string
  repoName: string
  ref: string
  commitSHA: string
  commitMessage: string
  projectID: string
  serviceID: string
  environmentID: string
  status: DeploymentStatus
  createdAt: string
  planType?: string
  planMeta?: Record<string, string | number | boolean | null | undefined>
  scheduledAt?: string
  startedAt?: string
  finishedAt?: string
  canceledAt?: string
  serverless?: boolean
}
export interface DeploymentConnection {
  edges: DeploymentEdge[]
}
export interface DeploymentEdge {
  node: Deployment
  cursor: string
}
export interface DeploymentResult {
  deploymentID?: string
}
export interface DeploymentSpecification {
  source?: ServiceSpecSourceInput
  env?: ServiceSpecEnvInput[]
}
export type DeploymentStatus = 'PENDING' | 'FAILED' | 'BUILDING' | 'DEPLOYING' | 'RUNNING' | 'REMOVED' | 'CRASHED' | 'CANCELED' | 'UNKNOWN'
export interface Domain {
  _id: string
  domain: string
  redirectTo?: string
  serviceID: string
  projectID: string
  environmentID: string
  status: DomainStatus
  statusReason?: string
  createdAt: string
  portName?: string
  isGenerated: boolean
  dnsRecords?: DNSRecord[]
}
export interface DomainKeyPair {
  variable: string
  port: string
}
export type DomainStatus = 'INVALID_DNS' | 'PROVISIONING' | 'PROVISIONED' | 'ICP_NOT_FILED'
export interface Environment {
  _id: string
  name: string
  projectID: string
  createdAt: string
}
export interface EnvironmentVariable {
  _id: string
  key: string
  value: string
  environmentID: string
  createdAt: string
  exposed?: boolean
  readonly?: boolean
  serviceID?: string
}
export interface ExportedInformation {
  url: string
}
export interface ExportedTemplate {
  resourceYAML: string
  warnings: string[]
}
export interface GPUInfo {
  hasGPU: boolean
  isReady: boolean
  name: string
}
export type GitProvider = 'GITHUB' | 'GITLAB' | 'BITBUCKET'
export interface GitRef {
  repoID: number
  ref?: string
}
export interface GitRepository {
  id: number
  name: string
  provider: GitProvider
  url: string
  pushedAt?: string
  updatedAt?: string
  owner: string
}
export interface GitTrigger {
  provider: GitProvider
  repoID: number
  branchName: string
  repoURL: string
}
export interface Group {
  name?: string
  serviceIDs: string[]
}
export type GroupByEntity = 'PROJECT' | 'SERVICE' | 'ENVIRONMENT'
export type GroupByEntityDetail = Project | Service | Environment
export type GroupByTime = 'DAY' | 'WEEK' | 'MONTH'
export type GroupByType = 'CPU' | 'MEMORY' | 'DISK' | 'NETWORK' | 'ALL'
export interface GroupInput {
  name?: string
  serviceIDs: string[]
}
export interface GroupedResults {
  data: Usage[]
  categories: string[]
}
export interface HealthCheck {
  probe?: Probe
}
export interface HealthCheckInput {
  probe?: ProbeInput
}
export interface ImageCredential {
  username: string
}
export interface ImageReference {
  reference: string
  name: string
  tag?: string
  digest?: string
}
export interface Invitation {
  _id: string
  inviter: User
  invitee?: User
  email: string
  project: Project
  invitedAt: string
  acceptedAt?: string
  cancelledAt?: string
  leavedAt?: string
}
export interface Invite {
  _id: string
  code: string
  inviterID: string
  inviteeID: string
  email: string
  projectID: string
  invitedAt: string
  acceptedAt?: string
  leavedAt?: string
}
export type Map = Record<string, string | number | boolean | null | undefined>
export interface MarketplaceItem {
  code: string
  name: string
  iconURL: string
  description: string
  networkType: NetworkType
}
export interface Metric {
  value: number
  timestamp: string
}
export type Float = number
export type MetricType = 'CPU' | 'MEMORY' | 'NETWORK' | 'DISK' | 'LATENCY'
export interface MetricsGroup {
  labels: Record<string, string | number | boolean | null | undefined>
  values: Metric[]
}
export interface Mutation {
  _empty: boolean
  createPostgresDatabase: boolean
  deletePostgresDatabase: boolean
  createMySQLDatabase: boolean
  deleteMySQLDatabase: boolean
  createBackup: boolean
  setAutoBackup: boolean
  executeDatabaseCommand: string
  mountVolume: boolean
  unmountVolume: boolean
  createBucket: boolean
  deleteBucket: boolean
  putObject: S3Object
  deleteObject: boolean
  getObjectPresignedURL: PresignedURL
  deploy: boolean
  deployFromSpecification: DeploymentResult
  cancelOngoingDeployment: boolean
  rollbackDeployment: boolean
  addDomain: Domain
  removeDomain: boolean
  checkDomainAvailable: CheckDomainAvailableResult
  deleteEnvironment: boolean
  renameEnvironment: boolean
  createEnvironmentVariable: EnvironmentVariable
  updateEnvironmentVariable: boolean
  setVariableProperty: boolean
  cloneGitRepoOfService: CloneRepoResult
  exportRuntimeLogs: ExportedInformation
  cleanupLogs: CleanupLogsResult
  createProject: Project
  deleteProject: boolean
  renameProject: boolean
  updateProjectDescription: boolean
  updateGroups: boolean
  inviteUserToProject: string
  leaveProject: boolean
  kickCollaborator: boolean
  cancelInvitation: boolean
  updateProjectIcon: boolean
  setBudget: boolean
  cloneProject: CloneProjectResult
  registerServer: Server
  unregisterServer: boolean
  updateServerName: boolean
  updateServerCredentials: boolean
  rentServer: Server
  reconcileServer: boolean
  poweroffServer: boolean
  poweronServer: boolean
  rebootServer: boolean
  reinstallServer: boolean
  revealManagedServerInitialPassword: string
  reloadK3sConfig: boolean
  updateServerAutoRenew: boolean
  renewServer: boolean
  createService: Service
  createPrebuiltService: Service
  deleteService: boolean
  updateWatchPaths: Service
  updateGitTrigger: boolean
  updateRootDirectory: boolean
  updateServiceImageTag: boolean
  updateServiceCommand: boolean
  updateServiceImageRepo: boolean
  updateServiceImageCredential: boolean
  updateServiceDNSName: boolean
  redeployService: boolean
  renameService: boolean
  updateServiceDescription: boolean
  restartService: boolean
  suspendService: boolean
  updateServiceConfig: boolean
  deleteServiceConfig: boolean
  checkDockerImage: CheckDockerImageResult
  executeCommand: CommandResult
  updateServiceIcon: boolean
  updateServiceFailureThreshold: boolean
  setAutoRestart: boolean
  updateServicePorts: boolean
  updateServiceHealthCheckV2: boolean
  updatePortForwardingMode: boolean
  updateDockerfile: boolean
  updateServiceResourceLimit: boolean
  createTemplate: Template
  updateTemplate: boolean
  deleteTemplate: boolean
  createTemplateFromFile: Template
  updateTemplateFromFile: boolean
  deployTemplate: Project
  updateUserProfile: boolean
  requestPhoneVerification: RequestPhoneVerificationResponse
  verifyPhoneVerification: boolean
  updateUserEmailPreference: boolean
  recharge: string
}
export interface MySQLConnectData {
  host: string
  port: string
  username: string
  password: string
}
export interface MysqlDatabase {
  name: string
}
export interface NetworkMetric {
  region: string
  value: Metric[]
}
export type NetworkType = 'TCP' | 'HTTP'
export type ObjectID = string
export interface ObjectList {
  objects: S3Object[]
  isTruncated: boolean
  nextContinuationToken?: string
}
export type OrderBy = 'ASC' | 'DESC'
export interface PageInfo {
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  endCursor: string
}
export type PaymentMethod = Card | Alipay
export type PaymentMethodType = 'CARD' | 'ALIPAY' | 'WECHAT' | 'LINEPAY'
export interface Plan {
  type: string
  meta?: Record<string, string | number | boolean | null | undefined>
}
export type PortForwardingMode = 'UNKNOWN' | 'DISABLED' | 'ENABLED'
export interface PostgreSQLConnectData {
  host: string
  port: string
  username: string
  password: string
}
export interface PostgresDatabase {
  name: string
}
export interface PresignedURL {
  url: string
  expiration: string
}
export interface Probe {
  httpGet?: ProbeHttpGet
}
export interface ProbeHttpGet {
  path: string
}
export interface ProbeHttpGetInput {
  path?: string
}
export interface ProbeInput {
  httpGet?: ProbeHttpGetInput
}
export interface Project {
  _id: string
  name: string
  description?: string
  iconURL?: string
  createdAt: string
  owner?: User
  collaborators: User[]
  invitations: Invitation[]
  region: Region
  pullRequest?: string
  groups: Group[]
  exportedTemplate: ExportedTemplate
  environments: Environment[]
  services: Service[]
}
export interface ProjectActivity {
  _id: string
  type: ProjectActivityType
  payload?: Record<string, string | number | boolean | null | undefined>
  createdAt: string
}
export type ProjectActivityType = 'BUILD_SCHEDULED' | 'BUILD_STARTED' | 'BUILD_SUCCESS' | 'BUILD_FAILED' | 'DEPLOYMENT_READY' | 'DEPLOYMENT_CRASHED' | 'DEPLOYMENT_REMOVED' | 'SERVICE_STARTING' | 'SERVICE_READY' | 'SERVICE_STOPPING' | 'SERVICE_SUSPENDED' | 'DOMAIN_ADDED' | 'DOMAIN_PROVISIONED' | 'ENVIRONMENT_CREATED' | 'ENVIRONMENT_REMOVED'
export interface ProjectConnection {
  pageInfo: PageInfo
  edges: ProjectEdge[]
}
export interface ProjectEdge {
  node: Project
  cursor: string
}
export interface ProjectUsage {
  usages: UsageWithEntity[]
  budget: number
  periodStart: string
  periodEnd: string
}
export interface Query {
  _empty: boolean
  postgresDatabases?: PostgresDatabase[]
  mysqlDatabases?: MysqlDatabase[]
  backups?: Backup[]
  backup?: Backup
  buckets?: Bucket[]
  objects?: ObjectList
  object?: S3Object
  deployments: DeploymentConnection
  deployment: Deployment
  buildPlan: BuildPlanItems[]
  files: string[]
  fileContent: string
  environments: Environment[]
  environment: Environment
  gitRepositories: GitRepository[]
  latestGitRepositories: GitRepository[]
  searchGitRepositories: GitRepository[]
  gitRepoBranches: string[]
  buildLogs: BuildLog[]
  runtimeLogs: RuntimeLog[]
  projectUsage: ProjectUsage
  usages?: GroupedResults
  projects: ProjectConnection
  project: Project
  regions: Region[]
  cloneProjectStatus: CloneProjectStatusResult
  server: Server
  servers: Server[]
  dedicatedServerProviders: CloudProvider[]
  dedicatedServerRegions: Region[]
  dedicatedServerPlans: DedicatedServerPlan[]
  services: ServiceConnection
  service: Service
  prebuiltMarketplaceItems: ServiceSpecSchema[]
  instructions: ServiceSpecConnectionInstruction[]
  servicePlanTypePlanMeta: Plan
  templates: TemplateConnection
  template: Template
  userTemplates: TemplateConnection
  isTemplateAuthor: boolean
  users: UserConnection
  user: User
  me: User
  referrer: Referrer
}
export interface Referee {
  username: string
  avatarURL: string
}
export interface Referral {
  referee: Referee
  createdAt: string
  redeemedAt?: string
}
export interface ReferralStatus {
  pending?: Referral[]
  credited?: Referral[]
}
export interface Referrer {
  name: string
  avatarURL: string
}
export interface Region {
  id: string
  code: string
  name: string
  description: string
  providerInfo?: CloudProvider
  available: boolean
  coordinates: number[]
  continent: string
  country: string
  city: string
}
export type RegionProvider = 'AWS' | 'GCP' | 'DIGITALOCEAN' | 'HUAWEI' | 'VULTR'
export interface RepoConfigInput {
  serviceName: string
  repoName: string
  isPublicRepo: boolean
}
export interface RequestPhoneVerificationResponse {
  verificationID: string
}
export interface ResourceLimit {
  cpu?: number
  memory?: number
}
export interface ResourceLimitInput {
  cpu?: number
  memory?: number
}
export interface ResourceUsage {
  cpu?: number
  memory?: number
}
export interface RuntimeLog {
  message: string
  timestamp: string
  region: string
  stream: string
  zeaburUID: string
}
export interface RuntimeLogResp {
  logs: RuntimeLog[]
  total?: number
}
export interface S3Object {
  key: string
  size: number
  etag: string
  lastModified: string
  storageClass: string
  contentType?: string
}
export interface Server {
  _id: string
  name: string
  ip: string
  owner: User
  sshPort: number
  sshUsername?: string
  status: ServerStatus
  createdAt: string
  providerInfo?: CloudProvider
  country?: string
  city?: string
  continent?: string
  events: ServerEvent[]
  gpuInfo?: GPUInfo
  metrics: MetricsGroup[]
  zeaburletStatus: ZeaburletStatus
  isManaged: boolean
  isAutoRenewDisabled?: boolean
  expiresAt?: string
  price?: number
}
export interface ServerEvent {
  message: string
  time: string
  severity: string
}
export interface ServerStatus {
  isOnline: boolean
  totalCPU: number
  usedCPU: number
  totalMemory: number
  usedMemory: number
  warnings: string[]
  vmStatus: VMStatus
}
export interface Service {
  _id: string
  name: string
  template: ServiceTemplate
  project: Project
  watchPaths: string[]
  rootDirectory: string
  customBuildCommand?: string
  customStartCommand?: string
  outputDir?: string
  resourceLimit?: ResourceLimit
  createdAt: string
  marketItemCode?: string
  spec?: ServiceSpecSchema
  gitTrigger?: GitTrigger
  metrics: Metric[]
  networkMetrics: NetworkMetric[]
  marketplaceItem?: MarketplaceItem
  status: ServiceStatus
  consoleURL?: string
  image?: ImageReference
  imageCredential?: ImageCredential
  dnsName: string
  configPaths: string[]
  configInfo: ConfigInfo
  serverless?: boolean
  planType?: string
  planMeta?: Record<string, string | number | boolean | null | undefined>
  portForwardedHost: string
  ports?: ServicePort[]
  healthCheckV2?: ServiceSpecHealthCheck
  suspendedAt?: string
  onceProduct?: string
  failureThreshold: number
  autoRestart: AutoRestart
  portForwardingMode: PortForwardingMode
  autoBackup: AutoBackup
  deployments: Deployment[]
  domains: Domain[]
  variables: EnvironmentVariable[]
}
export interface ServiceCloneCompleted {
  serviceName: string
  deploymentId: string
}
export interface ServiceCloneFailed {
  serviceName: string
  errorMessage: string
}
export interface ServiceCloneStarted {
  serviceName: string
  serviceType: string
}
export interface ServiceConnection {
  pageInfo: PageInfo
  edges: ServiceEdge[]
}
export interface ServiceEdge {
  node: Service
  cursor: string
}
export interface ServiceInTemplate {
  name: string
  template: ServiceTemplate
  gitRepoID?: number
  gitRepo?: GitRepository
  branchName?: string
  customBuildCommand?: string
  customStartCommand?: string
  outputDir?: string
  rootDirectory?: string
  watchPaths?: string[]
  planType?: string
  planMeta?: Record<string, string | number | boolean | null | undefined>
  prebuiltItem?: ServiceSpecSchema
  marketplaceItem?: MarketplaceItem
  variables?: Record<string, string | number | boolean | null | undefined>
  domainKey?: DomainKeyPair[]
  spec?: ServiceSpecSchema
}
export interface ServicePort {
  id: string
  port: number
  type: ServiceSpecPortType
  forwardedPort?: number
}
export interface ServiceSpecConfig {
  path: string
  template: string
  permission?: number
  envsubst?: boolean
}
export interface ServiceSpecConfigInput {
  path: string
  template: string
  permission?: number
  envsubst?: boolean
}
export interface ServiceSpecConnectionInstruction {
  title: string
  content: string
}
export interface ServiceSpecConnectionInstructionInput {
  title: string
  content: string
}
export type ServiceSpecConnectionInstructionType = 'PASSWORD'
export interface ServiceSpecEnv {
  key: string
  default?: string
  expose?: boolean
}
export interface ServiceSpecEnvInput {
  key: string
  default?: string
  expose?: boolean
}
export interface ServiceSpecGPU {
  enabled: boolean
}
export interface ServiceSpecGPUInput {
  enabled: boolean
}
export type ServiceSpecGitSource = 'GITHUB' | 'LOCAL' | 'UPLOAD_ID'
export interface ServiceSpecHealthCheck {
  type: ServiceSpecHealthCheckType
  port: string
  http?: ServiceSpecHealthCheckHTTP
}
export interface ServiceSpecHealthCheckHTTP {
  path: string
}
export interface ServiceSpecHealthCheckHTTPInput {
  path: string
}
export interface ServiceSpecHealthCheckInput {
  type: ServiceSpecHealthCheckType
  port: string
  http?: ServiceSpecHealthCheckHTTPInput
}
export type ServiceSpecHealthCheckType = 'Unknown' | 'HTTP' | 'TCP'
export interface ServiceSpecInitRule {
  id: string
  image?: string
  command?: string[]
  volumes?: ServiceSpecInitVolumeMount[]
}
export interface ServiceSpecInitRuleInput {
  id: string
  image?: string
  command?: string[]
  volumes?: ServiceSpecInitVolumeMountInput[]
}
export interface ServiceSpecInitVolumeMount {
  id: string
  mountPath: string
  subPath?: string
}
export interface ServiceSpecInitVolumeMountInput {
  id: string
  mountPath: string
  subPath?: string
}
export interface ServiceSpecPort {
  id: string
  port: number
  type: ServiceSpecPortType
}
export interface ServiceSpecPortForwarding {
  enabled: boolean
}
export interface ServiceSpecPortForwardingInput {
  enabled: boolean
}
export interface ServiceSpecPortInput {
  id: string
  port: number
  type: ServiceSpecPortType
}
export type ServiceSpecPortType = 'HTTP' | 'TCP' | 'UDP'
export interface ServiceSpecSchema {
  id?: string
  name: string
  icon?: string
  source: ServiceSpecSource
  ports?: ServiceSpecPort[]
  volumes?: ServiceSpecVolumeEntry[]
  instructions?: ServiceSpecConnectionInstruction[]
  env?: ServiceSpecEnv[]
  initRules?: ServiceSpecInitRule[]
  configs?: ServiceSpecConfig[]
  gpu?: ServiceSpecGPU
  healthCheck?: ServiceSpecHealthCheck
  portForwarding?: ServiceSpecPortForwarding
}
export interface ServiceSpecSchemaInput {
  id?: string
  name: string
  icon?: string
  source: ServiceSpecSourceInput
  ports?: ServiceSpecPortInput[]
  volumes?: ServiceSpecVolumeEntryInput[]
  instructions?: ServiceSpecConnectionInstructionInput[]
  env?: ServiceSpecEnvInput[]
  initRules?: ServiceSpecInitRuleInput[]
  configs?: ServiceSpecConfigInput[]
  gpu?: ServiceSpecGPUInput
  healthCheck?: ServiceSpecHealthCheckInput
  portForwarding?: ServiceSpecPortForwardingInput
}
export interface ServiceSpecSource {
  image?: string
  username?: string
  password?: string
  source?: ServiceSpecGitSource
  repoID?: number
  uploadID?: string
  branch?: string
  submoduleName?: string
  watchPaths?: string[]
  rootDirectory?: string
  dockerfile?: string
  command?: string[]
  args?: string[]
  runAsUserID?: number
}
export interface ServiceSpecSourceInput {
  image?: string
  username?: string
  password?: string
  source?: ServiceSpecGitSource
  repoID?: number
  uploadID?: string
  branch?: string
  submoduleName?: string
  watchPaths?: string[]
  rootDirectory?: string
  dockerfile?: string
  command?: string[]
  args?: string[]
  runAsUserID?: number
}
export interface ServiceSpecVolumeEntry {
  id: string
  dir: string
}
export interface ServiceSpecVolumeEntryInput {
  id: string
  dir: string
}
export type ServiceStatus = 'STARTING' | 'RUNNING' | 'STOPPING' | 'SUSPENDED' | 'UNKNOWN' | 'CRASHED' | 'PULL_FAILED' | 'PENDING' | 'BUILDING'
export type ServiceTemplate = 'GIT' | 'MARKETPLACE' | 'PREBUILT' | 'PREBUILT_V2' | 'ONCE'
export interface StripeBalanceHistoryItem {
  amount: number
  currency: string
  description?: string
  created: string
  type: string
  endingBalance: number
}
export interface Subscription {
  _empty: boolean
  buildLogReceived: BuildLog
  runtimeLogReceived: RuntimeLog
  projectActivityReceived: ProjectActivity
}
export type SubscriptionPlan = 'DEVELOPER' | 'TEAM' | 'FREE'
export interface Template {
  code: string
  name: string
  description: string
  coverURL?: string
  iconURL?: string
  previewURL?: string
  author: TemplateAuthor
  createdAt: string
  readme: string
  resourceUsage?: ResourceUsage
  services: ServiceInTemplate[]
  deploymentCnt: number
  tags?: string[]
  variables?: TemplateVariable[]
  localization?: TemplateLocalization
}
export interface TemplateAuthor {
  username: string
  avatarURL: string
}
export interface TemplateConnection {
  pageInfo: PageInfo
  edges: TemplateEdge[]
}
export interface TemplateEdge {
  node: Template
  cursor: string
}
export interface TemplateLocalization {
  description?: string
  coverURL?: string
  readme?: string
  variables?: TemplateVariable[]
}
export interface TemplateVariable {
  type: TemplateVariableType
  question: string
  key: string
  desc: string
}
export interface TemplateVariableInput {
  type: TemplateVariableType
  question: string
  key: string
  desc: string
}
export type TemplateVariableType = 'DOMAIN' | 'STRING'
export type Time = string
export interface TriggerInput {
  repoID: number
  branchName: string
}
export interface Usage {
  id: string
  name: string
  groupByEntity: GroupByEntity
  entity: GroupByEntityDetail
  usageOfEntity: number[]
}
export type UsageGroupByEntity = 'CATEGORY' | 'SERVICE'
export interface UsageWithEntity {
  usage: number
  entity: string
}
export interface User {
  _id: string
  name: string
  email: string
  language: string
  githubID?: number
  discordID?: string
  avatarURL: string
  createdAt: string
  emailPreference: Record<string, string | number | boolean | null | undefined>
  referralCode: string
  username: string
  referralStatus?: ReferralStatus
  referredBy?: Referrer
  referralRewardRedeemed: boolean
  passedChinaIdentityVerification: boolean
  phone?: string
}
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
}
export interface UserEdge {
  node: User
  cursor: string
}
export type VMStatus = 'PENDING' | 'STARTING' | 'RUNNING' | 'STOPPING' | 'STOPPED' | 'SUSPENDED' | 'TERMINATED' | 'FAILED' | 'UNKNOWN' | 'NOT_FOUND'
export interface VariableInput {
  key: string
  value: string
}
export interface VariablePropertyInput {
  readonly?: boolean
  exposed?: boolean
}
export interface VolumeCloneCompleted {
  serviceName: string
  volumeJobId: string
}
export interface VolumeCloneFailed {
  serviceName: string
  volumeJobId: string
  errorMessage: string
}
export interface VolumeCloneStarted {
  serviceName: string
  volumeJobId: string
}
export interface ZeaburletServiceStatus {
  name: string
  kind: string
  image: string
  status: ServiceStatus
  lastRestartedAt: string
}
export interface ZeaburletStatus {
  services: ZeaburletServiceStatus[]
  lastUpdatedAt: string
}
export interface createServiceInput {
  name: string
  template: ServiceTemplate
  repoID?: number
  rootDirectory?: string
  branchName?: string
  customBuildCommand?: string
  customStartCommand?: string
  outputDir?: string
  watchPaths?: string[]
  itemCode?: string
  variables?: Record<string, string | number | boolean | null | undefined>
  domainKey?: string
  prebuiltItemCode?: string
}
