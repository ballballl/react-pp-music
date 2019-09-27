import{COLLECTION_UPDATE, ADD_SONG_LISTS} from './constants'
import {getPlaylists} from '@src/request/index'
export const updateCollectionAction = (value,key)=>({
    type : COLLECTION_UPDATE,
    value,
    key
})

export const addSongLists = (value)=>({
    type : ADD_SONG_LISTS,
    value
})

export const getSongListAction = ((cat)=>{
    return async (dispatch,getState)=>{
        const {page,isLoading,isUploading} = getState().collection;
        if(isLoading || isUploading) return
        if(page==0){
            dispatch(updateCollectionAction(true,'isUploading'))
        }else{
            dispatch(updateCollectionAction(true,'isLoading'))
        }
        const res = await getPlaylists(cat,page)
        dispatch(updateCollectionAction(page+1,'page'))
        dispatch(updateCollectionAction(false,'isLoading'))
        dispatch(updateCollectionAction(false,'isUploading'))
        if(page==0){
            dispatch(updateCollectionAction(res.playlists,'songLists'))
        }else{
            dispatch(addSongLists(res.playlists))
        }
    }
})
