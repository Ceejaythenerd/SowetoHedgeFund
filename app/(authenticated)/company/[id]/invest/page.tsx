'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CompanyInvest() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [company, setCompany] = useState(null)
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (params.id) {
      Api.Company.findOne(params.id, { includes: ['user'] })
        .then(setCompany)
        .catch(() =>
          enqueueSnackbar('Failed to fetch company details', {
            variant: 'error',
          }),
        )
    }
  }, [params.id])

  const handleInvest = async () => {
    if (!userId) {
      enqueueSnackbar('You need to be logged in to invest', {
        variant: 'error',
      })
      return
    }

    try {
      // Here you would typically handle the investment logic
      enqueueSnackbar(`Successfully invested $${amount} in ${company.name}`, {
        variant: 'success',
      })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to invest', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Invest in a Company</Title>
      <Text>
        Please enter the amount you would like to invest in this company.
      </Text>
      {company && (
        <Card title={company.name} style={{ marginTop: 20 }}>
          <p>{company.description}</p>
          <Form layout="vertical" onFinish={handleInvest}>
            <Form.Item
              label="Investment Amount ($)"
              name="amount"
              rules={[
                {
                  required: true,
                  message: 'Please input the amount you want to invest!',
                },
              ]}
            >
              <Input type="number" onChange={e => setAmount(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Invest
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </PageLayout>
  )
}
