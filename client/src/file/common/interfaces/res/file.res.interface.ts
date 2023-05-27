import { IFile } from "../../models/file.model";

export interface IPresignFileRes {
  file: IFile;
  presignedUrl: string
}
