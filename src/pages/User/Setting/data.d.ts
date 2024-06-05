export type TagType = {
  key: string;
  label: string;
};

export type GeographicItemType = {
  name: string;
  id: string;
};

export type GeographicType = {
  province: GeographicItemType;
  city: GeographicItemType;
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
