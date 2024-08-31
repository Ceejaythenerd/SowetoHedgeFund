import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Company } from './company.model'

export class CompanyApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Company>,
  ): Promise<Company[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/companys${buildOptions}`)
  }

  static findOne(
    companyId: string,
    queryOptions?: ApiHelper.QueryOptions<Company>,
  ): Promise<Company> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/companys/${companyId}${buildOptions}`)
  }

  static createOne(values: Partial<Company>): Promise<Company> {
    return HttpService.api.post(`/v1/companys`, values)
  }

  static updateOne(
    companyId: string,
    values: Partial<Company>,
  ): Promise<Company> {
    return HttpService.api.patch(`/v1/companys/${companyId}`, values)
  }

  static deleteOne(companyId: string): Promise<void> {
    return HttpService.api.delete(`/v1/companys/${companyId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Company>,
  ): Promise<Company[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/companys${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Company>,
  ): Promise<Company> {
    return HttpService.api.post(`/v1/users/user/${userId}/companys`, values)
  }
}
