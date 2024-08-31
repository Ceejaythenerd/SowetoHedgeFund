'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Avatar, Rate, Card, Col, Row } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EvaluationListPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [evaluations, setEvaluations] = useState<Model.Evaluation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) {
      enqueueSnackbar('No company ID provided', { variant: 'error' })
      router.push('/companies')
      return
    }

    const fetchEvaluations = async () => {
      try {
        const evaluationsData = await Api.Evaluation.findManyByCompanyId(
          params.id,
          { includes: ['user'] },
        )
        setEvaluations(evaluationsData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch evaluations', { variant: 'error' })
        console.error('Failed to fetch evaluations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvaluations()
  }, [params.id, router])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Company Evaluations</Title>
      <Text type="secondary">
        Here you can view all the feedback and ratings given by others to the
        company.
      </Text>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: 20 }}>
        <Col span={24}>
          <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={evaluations}
            renderItem={evaluation => (
              <List.Item>
                <Card>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={evaluation.user?.pictureUrl || UserOutlined}
                      />
                    }
                    title={evaluation.user?.name || 'Anonymous'}
                    description={`Rated on ${dayjs(evaluation.dateCreated).format('MMMM D, YYYY')}`}
                  />
                  <div>
                    <Rate disabled value={evaluation.rating} />
                    <Text block>{evaluation.comment}</Text>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </PageLayout>
  )
}
