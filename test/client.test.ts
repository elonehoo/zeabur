/* eslint-disable no-console */
import type { ZeaburClient } from '../src/api/client'
import type { Environment, Project, Service } from '../src/types'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createClient } from '../src/api/client'
import {
  mutateCreateProject,
  mutateDeleteProject,
  mutateRenameProject,
} from '../src/api/mutation'
import {
  queryEnvironment,
  queryEnvironments,
  queryMe,
  queryProject,
  queryProjects,
  queryRegions,
  queryService,
  queryServices,
} from '../src/api/query'

const ZEABUR_TOKEN = process.env.ZEABUR_TOKEN
const ZEABUR_ENDPOINT = process.env.ZEABUR_ENDPOINT || 'https://api.zeabur.com/graphql'
const TEST_PROJECT_NAME = process.env.TEST_PROJECT_NAME || 'zeabur-sdk-test'
const TEST_PROJECT_ID = process.env.TEST_PROJECT_ID
const CLEANUP_AFTER_TESTS = process.env.CLEANUP_AFTER_TESTS === 'true'

const shouldRunTests = !!ZEABUR_TOKEN

describe.skipIf(!shouldRunTests)('zeabur API integration tests', () => {
  if (!shouldRunTests) {
    console.log('⚠️  Skipping tests: ZEABUR_TOKEN not set in .env')
    console.log('   Get your token from: https://dash.zeabur.com/account/developer')
    return
  }
  let client: ZeaburClient
  let testProject: Project
  let testEnvironments: Environment[]
  let testServices: Service[]

  beforeAll(async () => {
    if (!shouldRunTests) {
      return
    }

    client = createClient({
      endpoint: ZEABUR_ENDPOINT,
      token: ZEABUR_TOKEN,
    })

    // Get or create test project
    if (TEST_PROJECT_ID) {
      console.log(`📦 Using existing test project: ${TEST_PROJECT_ID}`)
      testProject = await queryProject(client, { _id: TEST_PROJECT_ID })
    }
    else {
      // Check if test project already exists
      const projects = await queryProjects(client, { limit: 100 })
      const existingProject = projects.edges.find(
        edge => edge.node.name === TEST_PROJECT_NAME,
      )

      if (existingProject) {
        console.log(`📦 Found existing test project: ${existingProject.node.name}`)
        testProject = existingProject.node
      }
      else {
        console.log(`📦 Creating new test project: ${TEST_PROJECT_NAME}`)
        // Query available regions and use the first available one
        const regions = await queryRegions(client)
        const availableRegion = regions.find(r => r.available)
        if (!availableRegion) {
          throw new Error('No available regions found')
        }

        testProject = await mutateCreateProject(client, {
          name: TEST_PROJECT_NAME,
          region: availableRegion.code,
        })
        console.log(`✅ Test project created: ${testProject._id} in region ${availableRegion.code}`)
      }
    }

    // Get test project details
    testEnvironments = await queryEnvironments(client, { projectID: testProject._id })
    const servicesResult = await queryServices(client, { projectID: testProject._id, limit: 100 })
    testServices = servicesResult.edges.map(edge => edge.node)

    console.log(`📊 Test project: ${testProject.name} (${testProject._id})`)
    console.log(`   Environments: ${testEnvironments.length}`)
    console.log(`   Services: ${testServices.length}`)
  }, 30000)

  afterAll(async () => {
    if (!shouldRunTests || !testProject) {
      return
    }

    if (CLEANUP_AFTER_TESTS && !TEST_PROJECT_ID) {
      console.log(`🧹 Cleaning up test project: ${testProject._id}`)
      await mutateDeleteProject(client, { _id: testProject._id })
      console.log('✅ Test project deleted')
    }
    else {
      console.log(`📦 Test project preserved: ${testProject._id}`)
      console.log('   Set CLEANUP_AFTER_TESTS=true in .env to delete after tests')
    }
  }, 30000)

  describe('authentication', () => {
    it('should authenticate and get current user', async () => {
      const user = await queryMe(client)

      expect(user).toBeDefined()
      expect(user._id).toBeTruthy()
      expect(user.username).toBeTruthy()

      console.log(`✅ Authenticated as: ${user.username}`)
    })
  })

  describe('regions', () => {
    it('should list available regions', async () => {
      const regions = await queryRegions(client)

      expect(regions).toBeDefined()
      expect(Array.isArray(regions)).toBe(true)
      expect(regions.length).toBeGreaterThan(0)

      const availableRegions = regions.filter(r => r.available)
      expect(availableRegions.length).toBeGreaterThan(0)

      const regionNames = availableRegions.map(r => `${r.name} (${r.code})`).join(', ')
      console.log(`✅ Available regions: ${regionNames}`)
    })
  })

  describe('project operations', () => {
    it('should get test project details', async () => {
      const project = await queryProject(client, { _id: testProject._id })

      expect(project).toBeDefined()
      expect(project._id).toBe(testProject._id)
      expect(project.name).toBeTruthy()
      expect(project.createdAt).toBeTruthy()

      console.log(`✅ Project: ${project.name}`)
    })

    it('should list all projects', async () => {
      const result = await queryProjects(client, { limit: 10 })

      expect(result).toBeDefined()
      expect(result.edges).toBeDefined()
      expect(Array.isArray(result.edges)).toBe(true)
      expect(result.pageInfo.totalCount).toBeGreaterThan(0)

      console.log(`✅ Total projects: ${result.pageInfo.totalCount}`)
    })

    it('should rename project', async () => {
      const newName = `${TEST_PROJECT_NAME}-${Date.now()}`
      const success = await mutateRenameProject(client, {
        _id: testProject._id,
        name: newName,
      })

      expect(success).toBe(true)

      // Verify rename
      const project = await queryProject(client, { _id: testProject._id })
      expect(project.name).toBe(newName)

      // Rename back
      await mutateRenameProject(client, {
        _id: testProject._id,
        name: TEST_PROJECT_NAME,
      })

      console.log(`✅ Project renamed successfully`)
    })
  })

  describe('environment operations', () => {
    it('should list environments in test project', async () => {
      const environments = await queryEnvironments(client, {
        projectID: testProject._id,
      })

      expect(environments).toBeDefined()
      expect(Array.isArray(environments)).toBe(true)
      expect(environments.length).toBeGreaterThan(0)

      const envNames = environments.map(e => e.name).join(', ')
      console.log(`✅ Environments: ${envNames}`)
    })

    it('should get single environment details', async () => {
      if (testEnvironments.length === 0) {
        console.log('⚠️  No environments found, skipping test')
        return
      }

      const env = testEnvironments[0]
      const environment = await queryEnvironment(client, { _id: env._id })

      expect(environment).toBeDefined()
      expect(environment._id).toBe(env._id)
      expect(environment.name).toBeTruthy()

      console.log(`✅ Environment: ${environment.name}`)
    })
  })

  describe('service operations', () => {
    it('should list services in test project', async () => {
      const result = await queryServices(client, {
        projectID: testProject._id,
        limit: 100,
      })

      expect(result).toBeDefined()
      expect(result.edges).toBeDefined()
      expect(Array.isArray(result.edges)).toBe(true)

      const serviceCount = result.pageInfo.totalCount
      console.log(`✅ Services: ${serviceCount}`)

      if (serviceCount > 0) {
        const serviceNames = result.edges.map(e => e.node.name).join(', ')
        console.log(`   Names: ${serviceNames}`)
      }
    })

    it('should get service details if any exist', async () => {
      if (testServices.length === 0) {
        console.log('⚠️  No services found, skipping test')
        return
      }

      const service = testServices[0]
      const serviceDetails = await queryService(client, { _id: service._id })

      expect(serviceDetails).toBeDefined()
      expect(serviceDetails._id).toBe(service._id)
      expect(serviceDetails.name).toBeTruthy()

      console.log(`✅ Service: ${serviceDetails.name} (${serviceDetails.status})`)
    })
  })

  describe('error handling', () => {
    it('should handle invalid project ID', async () => {
      await expect(
        queryProject(client, { _id: 'invalid-project-id-12345' }),
      ).rejects.toThrow()

      console.log('✅ Invalid project ID handled correctly')
    })

    it('should handle unauthorized request', async () => {
      const invalidClient = createClient({
        endpoint: ZEABUR_ENDPOINT,
        token: 'invalid-token-12345',
      })

      await expect(
        queryMe(invalidClient),
      ).rejects.toThrow()

      console.log('✅ Unauthorized request handled correctly')
    })
  })
})
