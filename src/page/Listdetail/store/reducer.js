import {LIST_DETAIL_UPDATE} from './constants'

const defaultState = {
    listDetail:{},
    tracks:[],

}
export default (state=defaultState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    const {type,value,key} = action;
    switch (type){
        case LIST_DETAIL_UPDATE:{
            newState[key] = value
            return newState
        }
        default: return newState
    }
}

