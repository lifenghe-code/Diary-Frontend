import { request } from 'umi';
import type {CurrentUser, Diary, ListItemDataType} from './data.d';

export async function queryUserDiary(userId:number,account:string): Promise<{ data: Diary[] }> {
  return request('/api/user/diary', {
    method: 'GET',
    params: {userId:userId,account:account},
  });
}

export async function queryUser(body: { userId: any; account: null }): Promise<{ data: CurrentUser }> {
  return await  request('/api/user/queryUser', {
    method: 'GET',
    params:body
  });
}

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/fake_list_Detail', {
    params,
  });
}
