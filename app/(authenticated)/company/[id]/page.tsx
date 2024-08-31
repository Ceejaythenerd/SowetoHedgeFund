'use client'

import { useEffect, useState } from 'react'
import { Typography, Descriptions, Card, List, Avatar, Rate, Button, Row, Col } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined, UnorderedListOutlined, StarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CompanyDetailPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [company, setCompany] = useState<Model.Company | null>(null)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await Api.Company.findOne(params.id, {
          includes: ['user', 'medias', 'inquirys', 'evaluations'],
        })
        setCompany(companyData)
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' })
        } else {
          enqueueSnackbar('Unknown error occurred', { variant: 'error' })
        }
      }
    }

    fetchCompany()
  }, [params.id])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Company Details</Title>
      {company ? (
        <Descriptions bordered>
          <Descriptions.Item label="Name">{company.name}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {company.description}
          </Descriptions.Item>
          <Descriptions.Item label="Created">
            {dayjs(company.dateCreated).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated">
            {dayjs(company.dateUpdated).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Deleted">
            {company.dateDeleted ? dayjs(company.dateDeleted).format('DD/MM/YYYY') : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Owner">
            {company.user ? company.user.name : 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Text>Loading...</Text>
      )}

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Button type="primary" icon={<UploadOutlined />} onClick={() => router.push(`/company/${params.id}/upload-media`)}>
            Upload Media
          </Button>
        </Col>
        <Col span={8}>
          <Button type="primary" icon={<UnorderedListOutlined />} onClick={() => router.push(`/company/${params.id}/inquiries`)}>
            View Inquiries
          </Button>
        </Col>
        <Col span={8}>
          <Button type="primary" icon={<StarOutlined />} onClick={() => router.push(`/company/${params.id}/evaluations`)}>
            View Evaluations
          </Button>
        </Col>
      </Row>

      {company?.medias && (
        <Card title="Media" style={{ marginTop: 20 }}>
          <List
            itemLayout="horizontal"
            dataSource={company.medias}
            renderItem={media => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={<a href={media.mediaUrl}>{media.mediaType}</a>}
                  description={`Uploaded on ${dayjs(media.dateCreated).format('DD/MM/YYYY')} by ${media.company?.name || 'Unknown'}`}
                />
              </List.Item>
            )}
          />
        </Card>
      )}

      {company?.inquirys && (
        <Card title="Inquiries" style={{ marginTop: 20 }}>
          <List
            itemLayout="horizontal"
            dataSource={company.inquirys}
            renderItem={inquiry => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<MailOutlined />} />}
                  title={inquiry.question}
                  description={
                    inquiry.response
                      ? `Response: ${inquiry.response}`
                      : 'Awaiting response'
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )}

      {company?.evaluations && (
        <Card title="Evaluations" style={{ marginTop: 20 }}>
          <List
            itemLayout="horizontal"
            dataSource={company.evaluations}
            renderItem={evaluation => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<PhoneOutlined />} />}
                  title={<Rate disabled defaultValue={evaluation.rating} />}
                  description={evaluation.comment}
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </PageLayout>
  )
}