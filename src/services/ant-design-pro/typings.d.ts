// @ts-ignore
/* eslint-disable */

declare namespace API {
  interface BaseResponse<T> {
    code?: number
    data?: T;
    message?: string;
    description?: string;
  }
  type CurrentUser = {
    userId? :number;
    account?: string;
    username?: string;
    gender?: number;
    avatar?: string;
    role?:number;
    phone?: string;
    email?: string;
    createTime?: Date;
    updateTime?: Date;
    type?: string;
  };
  type LoginVo = {
    account?: string;
    username?: string;
    gender?: number;
    avatar?: string;
    role?:number;
    phone?: string;
    email?: string;
    createTime?: Date;
    updateTime?: Date;
    type?: string;
  }
  type LoginResult = BaseResponse<LoginVo>;

  type RegisterResult<T> = {
    code?: number
    data?: T;
    message?: string;
    description?: string;
  };
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    account?: string;
    password?: string;
    checkPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    account?: string;
    username?: string;
    password?: string;
    checkPassword?: string;
    gender?: number;
    phone?: string;
    email?: string;
    avatar?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
