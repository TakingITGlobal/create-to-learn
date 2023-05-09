import React, { useState, useEffect } from 'react'
import Vimeo from '@u-wave/react-vimeo'
import { createVideoProgress, useVideoProgressByVideoId, updateVideoProgress } from '../util/db'
import { useAuth } from './../util/auth'


// function UpdateVideoProgress(videoId,time) {
//   return 
// }
// function HandleVideoProgressByVideoId(ownerId, videoId){
//   return 
// }
// function CreateVideoProgress(ownerId, videoId, progress){
//   return 
// }
function createProgress(owner,id){
  createVideoProgress({owner: owner, videoId: id, progress: 15})
}
function Video(props){
  const {
    video,
    user,
    id
  } = props

  const [loading, setLoading] = useState(true)

  const progressId = useVideoProgressByVideoId(user?.uid, id)
    
  useEffect(() => {
    if(user?.uid){
      setLoading(false)
    } 
  },[progressId])
  return (
    <>
    {
      !loading && 
      <Vimeo 
        video={video} 
        responsive 
        width="100vw" 
        // onTimeUpdate={handleUpdate}
        // onPause={handleChange}
        // onEnd={handleChange}
        start={0}
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