import type { ZeaburClient } from '../src'
import { beforeAll, describe, expect, it } from 'vitest'
import { createClient } from '../src'
import { mutateCheckDomainAvailable, nativeAddDomain } from '../src/mutation'

describe('zeabur mutations api test', () => {
  let client: ZeaburClient

  beforeAll(() => {
    const ZEABUR_TOKEN = process.env.ZEABUR_TOKEN
    client = createClient({
      token: ZEABUR_TOKEN,
    })
  })

  it.skip('add domain', async () => {
    const result = await nativeAddDomain(client, {
      isGenerated: true,
      domain: 'mydomain',
      serviceID: '68e77678e66aace74a717b19',
    })
    expect(result).not.toBeNull()
  })

  it.skip('check domain available', async () => {
    const result = await mutateCheckDomainAvailable(client, {
      domain: 'mydomain',
      isGenerated: true,
      region: 'server-67e35a6c57bc0adac29d461a',
    })
    expect(result).not.toBeNull()
  })
})
