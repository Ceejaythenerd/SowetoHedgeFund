import { Company } from '../company'

import { User } from '../user'

export class Evaluation {
  id: string

  rating?: number

  comment?: string

  companyId: string

  company?: Company

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
