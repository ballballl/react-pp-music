import {PLAYER_UPDATE} from './constants'
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
        default: return newState
    }
}

export default reducer
