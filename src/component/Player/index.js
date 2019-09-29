import React,{useEffect, useState, useRef, forwardRef}from 'react';
import {updatePlayerAction, emptyListAction, deleteSongAction} from './store/actionCreator'
import Icon from '@base/Icon/index'
import Progress from '@base/Progress/index'
import Toast from '@base/Toast/index'
import Modal from '@base/Modal/index'
import Scroller from '@base/Scroller/index'
import  PlayingAni from '@base/PlayingAni/index'
import { connect } from 'react-redux';
import { CSSTransition } from "react-transition-group";
import {timeFormat} from '@utils/index'
import './index.scss'
 let shuffleIndex =[]
 const modeText = ['顺序播放','单曲循环','随机播放']
 const Player = forwardRef((props,ref)=>{
    const{playList,currentIndex,playMode,currentSong,listId} = props
    const {updatePlayerDispatch, emptyListDispatch, deleteSongDispatch} = props
    const [playing, setPlaying] = useState(false)
    const [fold,setFold] = useState(true)
    const [listShow,setListShow] = useState(false)
    const [currentTime,setCurrentTime] = useState(0)
    const [currentDuration,setCurrentDuration] = useState(0)
    const audioRef = useRef()
    const coverRef = useRef()
    const progressRef = useRef()
    const toastRef = useRef()
    const modalRef = useRef()
    useEffect(()=>{
        if(currentIndex==-1 || !playList[currentIndex] || playList.length==0 || currentSong &&(playList[currentIndex].id==currentSong.id)){
            setFold(true)
            setPlaying(false)
            return
        }
        setCurrentTime(0)
        let song = playList[currentIndex]
        updatePlayerDispatch(song,'currentSong')
        audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`;
        coverRef.current.onload = ()=>{
           setPlaying(true)
           audioRef.current.play()
        }
        audioRef.current.oncanplay=()=>{
            setCurrentDuration(audioRef.current.duration)
        }

    },[currentIndex,listId])

    // useEffect(()=>{
    //     let song = playList[currentIndex]
    //     if(currentSong && song.id != currentSong.id){
    //         updatePlayerDispatch(song,'currentSong')
    //         audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`;
    //         coverRef.current.onload = ()=>{
    //         setPlaying(true)
    //         audioRef.current.play()
    //         }
    //         audioRef.current.oncanplay=()=>{
    //             setCurrentDuration(audioRef.current.duration)
    //         }
    //     }
    // },[playList.length])

    

    useEffect(()=>{
        if(playList.length==0)return
        // setShuffleIndex([])
        shuffleIndex = []
        for(let i=0;i<playList.length;i++){
            shuffleIndex.push(i)
        }
        shuffleIndex.sort(()=>{
            return 0.5-Math.random()
        })

    },[listId])



    useEffect(()=>{
        playing ? audioRef.current.play() : audioRef.current.pause();
    },[playing])

   
    const foldPlayer = ()=>{
        return (
            <CSSTransition
                in={fold}
                classNames='fold'
                timeout={300}
            >
                <div className={'fold-player'}>
                    <div className={`rotate-cover ${currentSong && playing ? '': 'pause'}`} onClick={()=>{currentSong && setFold(false)}}>
                        <img ref={coverRef} src={currentSong ? currentSong.al.picUrl : 'http://p2.music.126.net/0KCMOKHHbimwfdVvPPBpTA==/109951164034526943.jpg'} />
                    </div>
                    <div className={'song-info'}>
                        {currentSong && <p>{currentSong.name+' '}-{' '+currentSong.ar.map((item)=>{return item.name}).join('/')}</p>}
                    </div>
                    <div className={'ctrl-btn'} >
                        <div onClick={()=>{currentSong && setPlaying(!playing)}}>
                            {currentSong && playing?  <Icon type={'pause'} size={'34'} isCenter={true} /> :<Icon type={'play'} size={'34'} isCenter={true}/> }
                        </div>
                    </div>
                    <div className={'list-btn'}  onClick={()=>{currentSong && setListShow(true)}} > 
                        <Icon type={'list'} size={'27'} isCenter={true} />
                    </div>
                </div>
            </CSSTransition>
                
        )
    }
    const fullPlayer = ()=>{
        return (
            <CSSTransition
                in={!fold}
                classNames='full'
                timeout={500}
                mountOnEnter
            >
                <div className='full-player full-enter'>
                    <div className='bg'>
                        <img src={currentSong ? currentSong.al.picUrl : 'http://p2.music.126.net/0KCMOKHHbimwfdVvPPBpTA==/109951164034526943.jpg'}/>
                    </div>
                    <div className='up'>
                        <div className='fold-btn' onClick={()=>{setFold(true)}}>
                            <Icon type='down' size='25' color='#fff' />
                        </div>
                        <div className='title-con'>
                            <p  className='song'>{currentSong? currentSong.name: ''}</p>
                            <p  className='singer'>{'— '+(currentSong? currentSong.ar.map(item=>item.name).join(' / '): '')+' —'}</p>
                        </div>
                    </div>
                    <div className='middle'>
                        <div className={`cd-cover ${playing ? '': 'pause'}`} >
                            <img src={currentSong ? currentSong.al.picUrl : 'http://p2.music.126.net/0KCMOKHHbimwfdVvPPBpTA==/109951164034526943.jpg'} />
                        </div>
                    </div>
                    <div className='down'>
                        <div className='timeline'> 
                            <p className='currentTimeText'>{timeFormat(currentTime)}</p> 
                            <Progress ref={progressRef} 
                                onProgressChange={handleProgressChange} 
                                onProgressChangeEnd={handleProgressChangeEnd}
                                // percent={currentTime/currentDuration*100}
                                />
                            <p className='durationText'>{timeFormat(currentDuration)}</p> 
                        </div>
                        <div className='control-group'>
                            <div className='play-mode' onClick={changeMode}>
                                    {playMode==0 && <Icon type='listRepeat' size={25}/>}
                                    {playMode==1 && <Icon type='songRepeat' size={25}/>}
                                    {playMode==2 && <Icon type='shuffle' size={25}/>}
                            </div>
                            <div onClick={handlePrev} style={{transform:'scaleX(-1)'}} >
                                <Icon type='next2' size={30}/>
                            </div>
                            <div className='play-btn' onClick={()=>{setPlaying(!playing)}} >
                                {playing?  <Icon type={'pause'} size={60} /> :<Icon type={'play'} size={60}/> }
                            </div>
                            <div onClick={handleNext} >
                                <Icon type='next2' size={30}/>
                            </div>
                            <div onClick={()=>{currentSong && setListShow(true)}}>
                                <Icon type='list' size={25}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </CSSTransition>
                
        )
    }

    const playListPanel = ()=>{
        return (
            <CSSTransition
                in={listShow}
                classNames='list'
                timeout={500}
                mountOnEnter
            >
                <div className='list-mask' onClick={(e)=>{if(e.target!==e.currentTarget)return;setListShow(false)}} >
                    <div className={`list-con ${fold?'fold':''}`}>
                        <div className='list-info'>
                            <div className='play-mode' onClick={changeMode} >
                                {playMode==0 && <Icon type='listRepeat' size={16}/>}
                                {playMode==1 && <Icon type='songRepeat' size={16}/>}
                                {playMode==2 && <Icon type='shuffle' size={16}/>}
                            </div>
                            <p className='mode-text'>{modeText[playMode]+(playMode!=1?'（'+playList.length+'首）':'')}</p>
                            <div className='empty-btn' onClick={()=>{modalRef.current.showConfirm()}}>
                                <Icon type='trash' size={23} />
                            </div>
                        </div>
                        <div className='list-panel'>
                            <Scroller>
                                {
                                    playList.map((song,idx)=>{
                                        return(
                                            <div 
                                                className={`list-cell ${currentSong && song.id==currentSong.id?'playing':''}`} 
                                                onClick={()=>{updatePlayerDispatch(idx,'currentIndex')}}
                                                key={song.id}
                                                >
                                                <div className='song-info'>
                                                    <div className='song-name'>{song.name}&nbsp;</div>
                                                    <div className='artist-name'>{'- '+song.ar.map(item=>item.name).join(' / ')}</div>
                                                </div>
    
                                                {currentSong && song.id==currentSong.id && <PlayingAni pause={!playing}/>}
                                                <div className='del-btn' onClick={()=>{deleteSongFunc(idx)}} >
                                                    <Icon type='del' size={15} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Scroller>
                        </div>
                    </div>
                </div>
            </CSSTransition>    
        )
    }

    const changeMode = ()=>{
        let mode = playMode
        mode = mode+1>2 ? 0 : mode+1
        if(mode==2){
            shuffleIndex.sort(()=>{
                return 0.5-Math.random()
            })
        }
        updatePlayerDispatch(mode,'playMode') 
        if(listShow)return
        setTimeout(() => {
            toastRef.current.show()
        })

    }
    const handleTimeUpdate=()=>{
        if(fold) return;
        let time = audioRef.current.currentTime
        // setCurrentTime(time)
        progressRef.current.setProgress(time/audioRef.current.duration*100)
    }

    const handleProgressChange= (percent)=>{
        if(!currentDuration) return
        setCurrentTime(currentDuration*percent/100)
    }
    const handleProgressChangeEnd = (percent)=>{
        if(!currentDuration) return
        audioRef.current.currentTime = audioRef.current.duration*percent/100
    }

    const handleNext = ()=>{
        let index = currentIndex
        if(playMode<2){
            index = index+1 == playList.length ? 0 : index+1 
        }else{
            let i =shuffleIndex.indexOf(index)
            i = i+1==shuffleIndex.length ? 0: i+1
            index = shuffleIndex[i]
        }
        updatePlayerDispatch(index,'currentIndex')
       
    }

    const handlePrev = ()=>{
        let index = currentIndex
        if(playMode<2){
            index = index-1 < 0 ? playList.length-1 : index-1
        }else{
            let i =shuffleIndex.indexOf(index)
            i = i-1<0 ? shuffleIndex.length-1 : i-1
            index = shuffleIndex[i]
        }
        updatePlayerDispatch(index,'currentIndex')
    }

    const handlePlayEnd = ()=>{
        if(playMode==1){
            loop()
        }else{
            handleNext()
        }
    }
    const loop =()=>{
        audioRef.current.currentTime =  0;
        // changePlayingState(true);
        audioRef.current.play();
    }

    const deleteSongFunc = (idx)=>{
        deleteSongDispatch(idx)
    }

    const emptyList = ()=>{
        emptyListDispatch()
        setListShow(false)
    }


    return (
        <>
            {foldPlayer()}
            {fullPlayer()}
            {playListPanel()}
            <Toast ref={toastRef} toastText={'已切换到'+modeText[playMode]+'模式'} />
            <Modal ref={modalRef} title={'清空当前播放队列'} confirmFunc={emptyList}  />
            <audio 
                ref={audioRef} 
                onTimeUpdate={handleTimeUpdate}
                onEnded={handlePlayEnd}
                // onError={handleError}
            ></audio>
        </>
    )
 })

 const stateToProps = ({player})=>({
    playList: player.playList,
    currentSong: player.currentSong,
    currentIndex: player.currentIndex,
    playMode: player.playMode,
    listId: player.listId
 })

 const dispatchToProps = (dispatch)=>({
    updatePlayerDispatch(value,key){
        dispatch(updatePlayerAction(value,key))
    },
    emptyListDispatch(){
        dispatch(emptyListAction())
    },
    deleteSongDispatch(idx){
        dispatch(deleteSongAction(idx))
    }

 })

 export default connect(stateToProps,dispatchToProps)(Player)
