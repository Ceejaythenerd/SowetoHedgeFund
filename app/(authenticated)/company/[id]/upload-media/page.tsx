'use client'

import { Button, Upload, Typography, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
const { Title, Paragraph } = Typography
const { Dragger } = Upload
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function UploadMediaPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [company, setCompany] = useState(null)
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companies = await Api.Company.findManyByUserId(userId, {
          includes: ['user'],
        })
        const currentCompany = companies.find(c => c.id === params.id)
        if (currentCompany) {
          setCompany(currentCompany)
        } else {
          enqueueSnackbar('Company not found', { variant: 'error' })
          router.push('/companies')
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch company details', { variant: 'error' })
      }
    }

    fetchCompany()
  }, [userId, params.id, router])

  const handleUpload = async options => {
    const { file } = options
    try {
      const url = await Api.Upload.upload(file)
      await Api.Media.createOneByCompanyId(params.id, {
        mediaType: file.type,
        mediaUrl: url,
      })
      setFileList(fileList => [...fileList, { url: url, status: 'done' }])
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Upload failed', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Upload Media for {company?.name}</Title>
      <Paragraph>
        Here you can upload media files related to your company. Please upload
        the relevant files to keep your company profile updated.
      </Paragraph>
      <Dragger
        fileList={fileList}
        customRequest={handleUpload}
        maxCount={1}
        accept="image/*,video/*"
        beforeUpload={() => false}
        onRemove={file => {
          setFileList(fileList.filter(f => f.uid !== file.uid))
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload. Strictly prohibit from uploading company
          data or other band files
        </p>
      </Dragger>
      <Button
        type="primary"
        onClick={() => router.push(`/company/${params.id}`)}
      >
        Back to Company Details
      </Button>
    </PageLayout>
  )
}
