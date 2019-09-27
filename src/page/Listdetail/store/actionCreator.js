import{LIST_DETAIL_UPDATE} from './constants'
import {getListDetail} from '@src/request/index'
export const updateListDetailAction = (value,key)=>({
    type : LIST_DETAIL_UPDATE,
    value,
    key
})


export const getListDetailAction = ((id)=>{
    return async (dispatch,getState)=>{
        const {} = getState().listDetail
        try{
            const res = await getListDetail(id)
            dispatch(updateListDetailAction(res.playlist,'listDetail'))
            dispatch(updateListDetailAction(res.playlist.tracks,'tracks'))
        }catch(e){
            console.error('getListDetail error:', e)
        }
        

    }
})
