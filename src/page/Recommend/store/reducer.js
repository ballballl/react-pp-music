import {RECOMMEND_UPDATE} from './constants'

const defaultState = {
    banners:[],
    songList:[],
    newAlbums:[],
    newSongs:[],
    mvList:[],
    isUpLoading:false,
}
export default (state=defaultState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    const {type,value,key} = action;
    switch (type){
        case RECOMMEND_UPDATE:{
            newState[key] = value
            return newState
        }
        default: return newState
    }
}

