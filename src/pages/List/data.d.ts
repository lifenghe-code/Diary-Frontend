export type tabKeyType = 'articles' | 'applications' | 'projects';
export interface TagType {
  key: string;
  label: string;
}

export type GeographicType = {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
};

export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};

export type CurrentUser = {
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

export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type ListItemDataType = {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
};

export type Diary = {
  dairyId?: number;
  title?: string;
  content?: string;
  authorId?: number;
  status?: number;
  type?: number;
  create_time?: Date;
  publish_time?: Date;
  update_time?: Date;
};

export type Comment = {
  commentId?: number;
  content?: string;
  authorId?: number;
  diaryId?: number;
  status?: number;
  createTime?: Date;
  updateTime?: Date;
};

export type commentContent = {
  commentId?: number;
  authorId ?: number;
  authorName ?: number;
  avatar?: string;
  content?: string;
  updateTime?: Date;
};


