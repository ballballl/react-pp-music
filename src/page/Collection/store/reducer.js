import {COLLECTION_UPDATE,ADD_SONG_LISTS} from './constants'
const defaultState = {
    songLists:[],
    isLoading:false,
    isUploading:false,
    page:0
}
export default (state=defaultState, action)=>{
    const {type,value,key} = action
    const newState = JSON.parse(JSON.stringify(state))
    switch(type){
        case COLLECTION_UPDATE:{
            newState[key] = value
            return newState
        }
        case ADD_SONG_LISTS:{
            newState.songLists = [...newState.songLists,...value]
        }
        default:return newState 
    }
}
