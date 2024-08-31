import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Inquiry } from './inquiry.model'

export class InquiryApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Inquiry>,
  ): Promise<Inquiry[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/inquirys${buildOptions}`)
  }

  static findOne(
    inquiryId: string,
    queryOptions?: ApiHelper.QueryOptions<Inquiry>,
  ): Promise<Inquiry> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/inquirys/${inquiryId}${buildOptions}`)
  }

  static createOne(values: Partial<Inquiry>): Promise<Inquiry> {
    return HttpService.api.post(`/v1/inquirys`, values)
  }

  static updateOne(
    inquiryId: string,
    values: Partial<Inquiry>,
  ): Promise<Inquiry> {
    return HttpService.api.patch(`/v1/inquirys/${inquiryId}`, values)
  }

  static deleteOne(inquiryId: string): Promise<void> {
    return HttpService.api.delete(`/v1/inquirys/${inquiryId}`)
  }

  static findManyByCompanyId(
    companyId: string,
    queryOptions?: ApiHelper.QueryOptions<Inquiry>,
  ): Promise<Inquiry[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/companys/company/${companyId}/inquirys${buildOptions}`,
    )
  }

  static createOneByCompanyId(
    companyId: string,
    values: Partial<Inquiry>,
  ): Promise<Inquiry> {
    return HttpService.api.post(
      `/v1/companys/company/${companyId}/inquirys`,
      values,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Inquiry>,
  ): Promise<Inquiry[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/inquirys${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Inquiry>,
  ): Promise<Inquiry> {
    return HttpService.api.post(`/v1/users/user/${userId}/inquirys`, values)
  }
}
