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

export async function queryAllDiary(): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/user/allDiary', {
    method: 'GET'
  });
}

export async function queryAllComment( diaryId: number ): Promise<{ data: { list: Comment[] } }> {
  return await request('/api/user/getAllComments', {
    method: 'GET',
    params: {diaryId:diaryId},
  });
}

export async function comment(body: { diaryId: number; authorId: number; content: string }): Promise<{ data: { number } }> {
  return await request('/api/user/comment', {
    method: 'POST',
    params: body
  });
}
