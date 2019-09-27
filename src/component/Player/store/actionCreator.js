import {PLAYER_UPDATE} from'./constants'

export const updatePlayerAction = (value,key)=>({
    type: PLAYER_UPDATE,
    value,
    key
})

