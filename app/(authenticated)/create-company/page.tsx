'use client'

import { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateCompanyPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { name: string; description?: string }) => {
    if (!userId) {
      enqueueSnackbar('User must be logged in to create a company', {
        variant: 'error',
      })
      return
    }

    try {
      setLoading(true)
      const company = await Api.Company.createOneByUserId(userId, values)
      enqueueSnackbar('Company created successfully', { variant: 'success' })
      router.push(`/company/${company.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to create company', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Create New Company</Title>
      <Text type="secondary">
        Enter the details below to create a new company profile.
      </Text>
      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          label="Company Name"
          name="name"
          rules={[
            { required: true, message: 'Please input the company name!' },
          ]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea
            rows={4}
            placeholder="Describe the company (optional)"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Company
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
