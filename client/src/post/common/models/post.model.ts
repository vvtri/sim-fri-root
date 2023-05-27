import { AudienceType } from "shared"
import { IUser } from "../../../auth/common/interfaces/res/user.res.interface"
import { IFile } from "../../../file/common/models/file.model"

export interface IPost {
  id: number
  content: string
  audienceType: AudienceType
  user: IUser
  files: IFile[]
}