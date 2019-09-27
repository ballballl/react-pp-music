import { request } from './request'

export const getListDetail = (id) =>{
  let params = {id};
  return request.get('/playlist/detail', { params })
}
