import type { ZeaburClient } from '../src'
import { beforeAll, describe, it } from 'vitest'
import { createClient } from '../src'
import { queryGetBasicInformationOfProject, queryRegions, queryServer, queryServers } from '../src/query'

describe('zeabur mutations api test', () => {
  let client: ZeaburClient

  beforeAll(() => {
    const ZEABUR_TOKEN = process.env.ZEABUR_TOKEN
    client = createClient({
      token: ZEABUR_TOKEN,
    })
  })

  it.skip('query regions', async () => {
    const regions = await queryRegions(client)
    console.log('regions', regions)
  })

  it.skip('query servers', async () => {
    const servers = await queryServers(client)
    console.log('servers', servers)
  })

  it.skip('query server', async () => {
    const server = await queryServer(client, { _id: '67e35a6c57bc0adac29d461a' })
    console.log('server', server)
  })

  it.skip('query project basic info', async () => {
    const info = await queryGetBasicInformationOfProject(client, { projectID: '68e7763d7594dbb225682ede' })
    console.log('info', info)
  })
})
