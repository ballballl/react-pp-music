import { combineReducers } from 'redux'
import { reducer as recommendReducer } from '@page/Recommend/store'
import { reducer as collectionReducer } from '@page/Collection/store'
import { reducer as listDetailReducer } from '@page/Listdetail/store'
import playerReducer  from '@component/Player/store/reducer'
const reducer = combineReducers({
    recommend: recommendReducer,
    collection: collectionReducer,
    listDetail: listDetailReducer,
    player: playerReducer
})

export default reducer