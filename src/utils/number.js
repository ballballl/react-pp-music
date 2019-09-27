export const addUnit=(num)=>{
    if(num>100000000){
        num = (num/100000000).toFixed(1)+'亿'
    }else if(num>10000){
        num = (num/10000).toFixed(1)+'万'
    }
    return num
}

export const timeFormat = (time)=>{
    if(Number.isNaN(time)) time=0
    let min = parseInt(time/60)
    let sec = parseInt(time%60)
    if(min<10) min='0'+min
    if(sec<10) sec ='0'+sec
    return ''+min+':'+sec
}