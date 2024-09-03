import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { CompanyApi } from './company/company.api'

import { MediaApi } from './media/media.api'

import { InquiryApi } from './inquiry/inquiry.api'

import { EvaluationApi } from './evaluation/evaluation.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Company extends CompanyApi {}

  export class Media extends MediaApi {}

  export class Inquiry extends InquiryApi {} 

  export class Evaluation extends EvaluationApi {}
}
