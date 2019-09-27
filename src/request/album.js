import { request } from './request'

export const getAlbum = id => request.get(`/album?id=${id}`)