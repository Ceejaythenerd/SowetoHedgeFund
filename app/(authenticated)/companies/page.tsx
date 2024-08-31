'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Avatar, Card } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CompanyListPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companysFound = await Api.Company.findMany({ includes: ['user'] })
        setCompanies(companysFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch companies', { variant: 'error' })
      }
    }

    fetchCompanies()
  }, [])

  const handleCompanyClick = id => {
    router.push(`/company/${id}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Company List</Title>
      <Text type="secondary">Explore and interact with company profiles.</Text>
      <List
        itemLayout="horizontal"
        dataSource={companies}
        renderItem={company => (
          <List.Item onClick={() => handleCompanyClick(company.id)}>
            <Card
              hoverable
              style={{ width: '100%' }}
              actions={[
                <Avatar
                  src={company.user?.pictureUrl || UserOutlined}
                  alt={company.user?.name}
                />,
                <Text>{company.user?.name}</Text>,
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar src={company.user?.pictureUrl || UserOutlined} />
                }
                title={company.name}
                description={company.description || 'No description available'}
              />
            </Card>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
