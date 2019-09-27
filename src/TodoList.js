import React from 'react';
import './index.scss'
import '@style/variable.scss'
export default function(props){
    const {inputValue, changeInput,addCount,data,deleteItem} = props
    return(
            <div>
                <input className="wu" type="text" value={inputValue} onChange={changeInput} />

                <button onClick={addCount}>{inputValue}</button>
                <ul className="h">
                    {data.map((item,idx)=>(
                        <li className="w" key={idx+item} onClick={()=>{deleteItem(idx)}}>
                            {item}
                        </li>
                    ))}
                </ul>
                
            </div>
    )
}