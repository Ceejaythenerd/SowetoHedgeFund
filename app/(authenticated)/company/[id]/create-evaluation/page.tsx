'use client'

import { Form, Input, Button, Rate, Typography } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateEvaluationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [company, setCompany] = useState<Model.Company | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await Api.Company.findOne(params.id, {
          includes: ['user'],
        })
        setCompany(companyData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch company details', { variant: 'error' })
      }
    }

    fetchCompany()
  }, [params.id])

  const handleSubmit = async (values: { rating: number; comment: string }) => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to submit an evaluation', {
        variant: 'error',
      })
      return
    }

    try {
      setLoading(true)
      const evaluationData = {
        rating: values.rating,
        comment: values.comment,
        userId: userId,
        companyId: params.id,
      }
      await Api.Evaluation.createOneByCompanyId(params.id, evaluationData)
      enqueueSnackbar('Evaluation submitted successfully', {
        variant: 'success',
      })
      router.push(`/company/${params.id}/evaluations`)
    } catch (error) {
      enqueueSnackbar('Failed to submit evaluation', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Submit Evaluation</Title>
      <Text>Type your feedback and rate the company.</Text>
      {company && (
        <>
          <Title level={4}>{company.name}</Title>
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="rating"
              rules={[{ required: true, message: 'Please rate the company' }]}
            >
              <Rate character={<SmileOutlined />} />
            </Form.Item>
            <Form.Item
              name="comment"
              rules={[{ required: true, message: 'Please add a comment' }]}
            >
              <Input.TextArea rows={4} placeholder="Write your comment here" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit Evaluation
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </PageLayout>
  )
}
