import {Diary} from "@/pages/User/Center/data";
import {request} from "@@/exports";

export async function saveDiary(body:Diary): Promise<{ data: number }> {
  return request('/api/user/saveDiary', {
    method: 'POST',
    params: body
  });
}
export async function findSavedDiary(): Promise<{ data:Diary }> {
  return request('/api/user/findSavedDiary', {
    method: 'GET',
  });
}
export async function publishDiary(body:Diary): Promise<{ data: number }> {
  return request('/api/user/publishDiary', {
    method: 'POST',
    params: body
  });
}
