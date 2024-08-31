import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Evaluation } from './evaluation.model'

export class EvaluationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Evaluation>,
  ): Promise<Evaluation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/evaluations${buildOptions}`)
  }

  static findOne(
    evaluationId: string,
    queryOptions?: ApiHelper.QueryOptions<Evaluation>,
  ): Promise<Evaluation> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/evaluations/${evaluationId}${buildOptions}`)
  }

  static createOne(values: Partial<Evaluation>): Promise<Evaluation> {
    return HttpService.api.post(`/v1/evaluations`, values)
  }

  static updateOne(
    evaluationId: string,
    values: Partial<Evaluation>,
  ): Promise<Evaluation> {
    return HttpService.api.patch(`/v1/evaluations/${evaluationId}`, values)
  }

  static deleteOne(evaluationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/evaluations/${evaluationId}`)
  }

  static findManyByCompanyId(
    companyId: string,
    queryOptions?: ApiHelper.QueryOptions<Evaluation>,
  ): Promise<Evaluation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/companys/company/${companyId}/evaluations${buildOptions}`,
    )
  }

  static createOneByCompanyId(
    companyId: string,
    values: Partial<Evaluation>,
  ): Promise<Evaluation> {
    return HttpService.api.post(
      `/v1/companys/company/${companyId}/evaluations`,
      values,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Evaluation>,
  ): Promise<Evaluation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/evaluations${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Evaluation>,
  ): Promise<Evaluation> {
    return HttpService.api.post(`/v1/users/user/${userId}/evaluations`, values)
  }
}
