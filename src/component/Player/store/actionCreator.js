import {PLAYER_UPDATE,EMPTY_LIST,DELETE_SONG} from'./constants'

export const updatePlayerAction = (value,key)=>({
    type: PLAYER_UPDATE,
    value,
    key
})

export const emptyListAction = ()=>({
    type:EMPTY_LIST
})

export const deleteSongAction = (idx)=>({
    type: DELETE_SONG,
    value: idx,
})

