import { request } from './request'

export const getArtists = id => request.get(`/artists?id=${id}`)
