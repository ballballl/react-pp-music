import{ addItem, delItem, changeInput } from './actionType'
import axios from 'axios'

export const addAction = ()=>({
    type: addItem
})

export const delAction = (idx)=>({
    type: delItem,
    index : idx
})

export const changeAction = (data)=>({
    type: changeInput,
    value : data
})

export const requestAction = ()=>{
    return (dispatch)=>{
        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{
            const data = res.data
            console.log(data.data.list)
            const action = changeAction(data.data.list[0])
            dispatch(action)
        })
    }
}