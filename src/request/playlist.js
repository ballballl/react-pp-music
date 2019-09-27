import { request } from './request'

// 获取歌单
export const getPlaylists = (cat,page,limit=30,order='hot') => {
    let params = {
        cat,
        offset:page*limit,
        limit,
        order
    }
    return request.get('/top/playlist', { params })
}
// 精品歌单
export const getTopPlaylists = (params) => request.get('/top/playlist/highquality', { params })
// 获取相似歌单
export const getSimiPlaylists = (id, option) => request.get(`/simi/playlist?id=${id}`, option)