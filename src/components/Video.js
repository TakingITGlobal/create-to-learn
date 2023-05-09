import React, { useState, useEffect } from 'react'
import Vimeo from '@u-wave/react-vimeo'
import { createVideoProgress, useVideoProgressByVideoId, updateVideoProgress, getUserProgress } from '../util/db'
import { useAuth } from './../util/auth'
import { collection, addDoc } from "firebase/firestore"; 

function Video(props){
  
  const {
    video,
    user,
    id
  } = props

  const [loading, setLoading] = useState(true)
  const [startTime, setStartTime] = useState()
  const [progId, setProgId] = useState()
  const {
    data,
    status,
    error
  } = useVideoProgressByVideoId(user?.uid, id)
  
  const handleChange = (player) => {
    console.log(progId.id)
    console.log(player.seconds)
    if(progId){
      console.log('gets here')
      console.log(progId || 'not value')
      updateVideoProgress(progId.id, {progress: player.seconds})
    }
    
  }
  useEffect(() => {
    if(progId){
      if(progId?.progress){
        setStartTime(progId?.progress)
      } else {
        setStartTime(0)
      }
      setLoading(false) 
    }
      
  },[progId])

  useEffect(() => {
    if(status === 'success') {

      
      if(data?.length > 0){
        setProgId(data[0])
      } else {
        createVideoProgress({owner: user.uid, videoId: id, progress: 0}).then(docRef => getUserProgress(docRef.id).then((data) => setProgId(data)))
      }
      
    }else if(user === false){
      setLoading(false)
    }
  },[status])



  return (
    <>
      {!loading &&
      
        <Vimeo 
          video={video} 
          responsive 
          width="100vw" 
          onPause={handleChange}
          onEnd={handleChange}
          start={startTime}
          style={{
            paddingTop: '2em',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        />
      }

    </> 
  )
}
export default Video