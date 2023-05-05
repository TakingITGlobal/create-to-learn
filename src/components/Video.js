import React, { useState, useEffect } from 'react'
import Vimeo from '@u-wave/react-vimeo'
import { createVideoProgress, useVideoProgressByVideoId } from '../util/db'
import { useAuth } from './../util/auth'

function Video(props){
  const [progress, setProgress] = useState()
  const [startTime, setStartTime] = useState(0)
  // const test = createVideoProgress({owner: auth.user.uid, videoId: props.id, progress: 0})
  useEffect(() => {
    if(props.user){
      setProgress(createVideoProgress({owner: props.user.uid, videoId: props.id, progress: 0}))
    }   
  }, [props.user])
  useEffect(() => {
    console.log(props.user?.uid)
    console.log(progress)
  }, [progress])
  useEffect(() => {
    localStorage.setItem('courseId', props.id)
  }, [props.id])

  function handleUpdate(player) {
    localStorage.setItem('courseProgress',player.seconds)
  }

  return (
    <>
      <Vimeo 
        video={props.video} 
        responsive 
        width="100vw" 
        onTimeUpdate={handleUpdate}
        start={progress}
      />
    </>
    
  )
}
export default Video