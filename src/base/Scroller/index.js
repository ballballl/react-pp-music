import React, {useState,useEffect,useRef,useImperativeHandle,forwardRef} from 'react';
import BScroll from 'better-scroll'
import './index.scss'

const Scroller = forwardRef((props,ref)=>{
    const [scroller, setScroller] = useState(null)
    const {pullDownFunc,pullUpFunc,scrollFunc,isUpLoading,isDownLoading,direction,refresh }= props
    const scrollerConRef = useRef()
    useEffect(()=>{
        if(scroller) return
        let bscroll = new BScroll(scrollerConRef.current,{
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType:3,
            bounce: {
                top: true,
                bottom: true,
                left:true,
                right:true
            },
        })
        setScroller(bscroll)
        if(scrollFunc){
            bscroll.on('scroll', (bscroll) => {
                try{
                    scrollFunc(bscroll)
                }catch{
                    
                }
                
            })
        }
        if(pullUpFunc) {
            bscroll.on('scrollEnd', () => {
              //判断是否滑动到了底部
              if(bscroll.y <= bscroll.maxScrollY + 200){
                pullUpFunc();
              }
            });
          }
          if(pullDownFunc) {
            // console.log(pullDownFunc)
            bscroll.on('touchEnd', (pos) => {
              //判断用户的下拉动作
              if(pos.y > 50) {
                pullDownFunc()
              }
            });
          }
        

        return ()=>{
            setScroller(null)
        }
    },[])



    useEffect(()=>{
        if(refresh && scroller)scroller.refresh()
    })
    useImperativeHandle(ref,()=>({
        refresh(){
            if(scroller){
                scroller.refresh()
                scroller.scrollTo(0,0,800)
            }
        }
    }))
    const stl = direction === "horizental"? {display:'inline-block',whiteSpace: "nowrap"}:{}

    return (
        <div className="scroller-con" ref={scrollerConRef}>
            <div style={stl}>
                {isUpLoading!==null && <div className="upLoading-con" style={{display:(isUpLoading?'block':'none')}}>
                    加载中...
                </div>}
                {props.children}
                {pullUpFunc && <div className="downLoading-con" style={{display:(isDownLoading?'block':'none')}}>
                    加载中...
                </div>}
            </div>
        </div>
    )
})

Scroller.defaultProps={
    direction:'vertical',
    refresh: true,
    pullDownFunc: null,
    pullUpFunc:null,
    scrollFunc:null,
    isUpLoading:null,
    isDownLoading:null,
}

export default Scroller

