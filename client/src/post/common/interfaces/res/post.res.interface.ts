import { IBasePaginationRes } from '../../../../common/interfaces/base.res.interface';
import { IPost } from '../../models/post.model';

export interface IGetListMyPostsRes extends IBasePaginationRes<IPost> {}
export interface IGetListPostsRes extends IBasePaginationRes<IPost> {}
export interface ICreatePostResRes extends IPost {}
