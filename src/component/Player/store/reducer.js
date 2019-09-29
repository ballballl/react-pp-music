import {PLAYER_UPDATE,EMPTY_LIST,DELETE_SONG} from './constants'
const defaultState={
    listId: null,
    playList:[],
    currentSong:null,
    currentIndex:-1,
    playMode:0
}

const reducer =  (state=defaultState,action)=>{
    const {type,value,key} = action
    let newState = JSON.parse(JSON.stringify(state))
    switch(type){
        case PLAYER_UPDATE:{
            newState[key] = value
            return newState
        }
        case EMPTY_LIST:{
            newState.listId = ''
            newState.playList =[]
            newState.currentSong=null
            newState.currentIndex=-1
            return newState
        }
        case DELETE_SONG:{
            newState.playList.splice(value,1)
            if(value==newState.currentIndex){
                newState.currentSong = newState.playList[value]
            }
            return newState
        }
        default: return newState
    }
}

export default reducer
