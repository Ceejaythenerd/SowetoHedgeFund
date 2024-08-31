import { User } from '../user'

import { Media } from '../media'

import { Inquiry } from '../inquiry'

import { Evaluation } from '../evaluation'

export class Company {
  id: string

  name: string

  description?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  medias?: Media[]

  inquirys?: Inquiry[]

  evaluations?: Evaluation[]
}
