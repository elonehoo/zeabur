/**
 * 轻量 GraphQL Client 工具，基于 fetch。
 * 支持直接以内联参数方式生成 query / mutation，避免必须了解变量声明。
 */
export interface ZeaburClientOptions {
  /** GraphQL 端点 */
  endpoint?: string
  /** 认证 Token，可选（会放入 Authorization: Bearer <token>） */
  token?: string
  /** 可自定义 fetch 实现（例如跨平台、SSR 等场景） */
  fetchImpl?: typeof fetch
}

export interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string, path?: (string | number)[], extensions?: Record<string, any> }>
}

export class ZeaburClient {
  private endpoint: string
  private token?: string
  private fetchImpl: typeof fetch

  constructor(options: ZeaburClientOptions) {
    this.endpoint = options.endpoint || 'https://api.zeabur.com/graphql'
    this.token = options.token
    this.fetchImpl = options.fetchImpl || fetch
  }

  setToken(token?: string) {
    this.token = token
  }

  /** 通用执行函数，直接发送 GraphQL 文档 */
  async request<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
    const res = await this.fetchImpl(this.endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
    })
    if (!res.ok)
      throw new Error(`GraphQL network error: ${res.status} ${res.statusText}`)
    const json = (await res.json()) as GraphQLResponse<T>
    if (json.errors?.length) {
      const msg = json.errors.map(e => e.message).join('\n')
      const err = new Error(msg)
      ;(err as any).raw = json.errors
      throw err
    }
    return json.data as T
  }

  /**
   * 动态构造内联参数模式的 query / mutation（不使用 GraphQL 变量声明）。
   * 适合简单调用；复杂选择集由调用方通过 selectionSet 控制。
   */
  async executeInline<T = any>(
    operationType: 'query' | 'mutation',
    operationName: string,
    args: Record<string, any> | undefined,
    selectionSet: string | undefined,
  ): Promise<T> {
    const argStr = args && Object.keys(args).length ? `(${serializeArgs(args)})` : ''
    const sel = selectionSet ? ` {\n${indent(selectionSet.trim())}\n}` : ''
    const document = `${operationType} {\n  ${operationName}${argStr}${sel}\n}`
    const data = await this.request<{ [k: string]: T }>(document)
    return data[operationName]
  }
}

// ---------------- 工具函数 ----------------

function indent(s: string, spaces = 2) {
  return s
    .split(/\r?\n/)
    .map(l => (l.length ? ' '.repeat(spaces) + l : l))
    .join('\n')
}

function serializeArgs(obj: Record<string, any>): string {
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${toLiteral(v)}`)
    .join(', ')
}

function toLiteral(v: any): string {
  if (v === null)
    return 'null'
  if (Array.isArray(v))
    return `[${v.map(i => toLiteral(i)).join(', ')}]`
  switch (typeof v) {
    case 'string':
      // 简单转义
      return JSON.stringify(v)
    case 'number':
    case 'boolean':
      return String(v)
    case 'object':
      return `{ ${Object.entries(v)
        .filter(([, val]) => val !== undefined)
        .map(([k, val]) => `${k}: ${toLiteral(val)}`)
        .join(', ')} }`
    default:
      return JSON.stringify(v)
  }
}

/** 快速创建一个默认客户端（语法糖） */
export function createClient(options: ZeaburClientOptions) {
  return new ZeaburClient(options)
}
