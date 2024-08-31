'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar } from 'antd'
import {
  UserOutlined,
  NotificationOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  StarOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState<Model.User | null>(null)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      return
    }

    const fetchUser = async () => {
      try {
        const userData = await Api.User.findOne(userId, {
          includes: ['companys', 'notifications'],
        })
        setUser(userData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch user data.', { variant: 'error' })
      }
    }

    fetchUser()
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Welcome to Your Dashboard</Title>
      <Text>Welcome back, {user?.name || 'User'}!</Text>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card hoverable onClick={() => router.push('/companies')}>
            <Avatar size="large" icon={<TeamOutlined />} />
            <Card.Meta
              title="Companies"
              description="View and manage your companies"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            onClick={() =>
              router.push(`/company/${user?.companys?.[0]?.id}/inquiries`)
            }
          >
            <Avatar size="large" icon={<QuestionCircleOutlined />} />
            <Card.Meta
              title="Inquiries"
              description="Check your company inquiries"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            onClick={() =>
              router.push(`/company/${user?.companys?.[0]?.id}/evaluations`)
            }
          >
            <Avatar size="large" icon={<StarOutlined />} />
            <Card.Meta
              title="Evaluations"
              description="See evaluations for your company"
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Title level={4}>Recent Notifications</Title>
        {user?.notifications?.map(notification => (
          <Card
            key={notification.id}
            hoverable
            onClick={() =>
              notification.redirectUrl && router.push(notification.redirectUrl)
            }
          >
            <Card.Meta
              avatar={<Avatar icon={<NotificationOutlined />} />}
              title={notification.title}
              description={notification.message}
            />
          </Card>
        ))}
      </Row>
    </PageLayout>
  )
}