import {RECOMMEND_UPDATE} from './constants'
import {getBanner, getPersonalized,getNewAlbums, getNewSongs, getPersonalizedMv} from '@src/request/index'

export const updateRecommendAction = (value,key)=>({
    type: RECOMMEND_UPDATE,
    value,
    key
})


export const getBannersAction = ()=>{
    return async function(dispatch){
        let res = await getBanner()
        // console.log(res)

        try{
            dispatch(updateRecommendAction(res.banners,'banners'))
        }catch{
            
        }
    }
}

export const getSongListAction = ()=>{
    return async function(dispatch){
        let res = await getPersonalized()
        try{
            dispatch(updateRecommendAction(res.result,'songList'))
        }catch{
            
        }
    }
}

export const getNewAlbumsAction = ()=>{
    return async function(dispatch){
        let res = await getNewAlbums()
        // console.log(res)
        try{
            dispatch(updateRecommendAction(res.albums,'newAlbums'))
        }catch{
            
        }
    }
}

export const getNewSongsAction = ()=>{
    return async function(dispatch){
        let res = await getNewSongs()
        // console.log(res)
        try{
            dispatch(updateRecommendAction(res.result,'newSongs'))
        }catch{
            
        }
    }
}

export const getMvListAction = ()=>{
    return async function(dispatch,getState){
        let res = await getPersonalizedMv()
        try{
            dispatch(updateRecommendAction(res.result,'mvList'))
        }catch{
            
        }
    }
}