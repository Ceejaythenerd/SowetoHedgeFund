'use client'

import React from 'react'
import { Typography, List, Avatar, Button, Space } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function InquiryListPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [inquiries, setInquiries] = useState<Model.Inquiry[]>([])

  useEffect(() => {
    if (!params.id) {
      enqueueSnackbar('Company ID is missing', { variant: 'error' })
      router.push('/companies')
      return
    }

    const fetchInquiries = async () => {
      try {
        const inquirysFound = await Api.Inquiry.findManyByCompanyId(params.id, {
          includes: ['user'],
        })
        setInquiries(inquirysFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch inquiries', { variant: 'error' })
      }
    }

    fetchInquiries()
  }, [params.id, router])

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Inquiries</Title>
      <Text type="secondary">
        Below are the inquiries related to the company.
      </Text>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 3,
        }}
        dataSource={inquiries}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mOoPurdIfmcuqtr.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.user?.pictureUrl} />}
              title={
                <a href={`/company/${item.companyId}/inquiries/${item.id}`}>
                  {item.question}
                </a>
              }
              description={item.response}
            />
            {item.user?.name && <Text>- {item.user.name}</Text>}
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
