'use client'

import { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateInquiryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: { question: string }) => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to submit an inquiry.', {
        variant: 'error',
      })
      return
    }

    try {
      setLoading(true)
      const inquiry = await Api.Inquiry.createOneByUserId(userId, {
        question: values.question,
        companyId: params.id,
      })
      enqueueSnackbar('Inquiry submitted successfully!', { variant: 'success' })
      form.resetFields()
      router.push(`/company/${params.id}/inquiries`)
    } catch (error) {
      enqueueSnackbar('Failed to submit inquiry. Please try again.', {
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Post an Inquiry</Title>
      <Text>
        Have a question about this company? Post your inquiry here and we will
        get back to you as soon as possible.
      </Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          name="question"
          label="Your Question"
          rules={[{ required: true, message: 'Please input your question!' }]}
        >
          <Input
            prefix={<QuestionCircleOutlined className="site-form-item-icon" />}
            placeholder="What would you like to ask?"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit Inquiry
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
