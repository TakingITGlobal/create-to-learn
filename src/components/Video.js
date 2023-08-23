import React, { useState, useEffect } from 'react'
import Vimeo from '@u-wave/react-vimeo'
import {
  createVideoProgress,
  updateVideoProgress,
  getUserProgress,
} from '../util/db'

function Video(props) {
  const { video, user, id, duration, courseId } = props

  const [loading, setLoading] = useState(true)
  const [startTime, setStartTime] = useState()
  const [progId, setProgId] = useState()

  const handleChange = (player) => {
    if (progId) {
      const complete = parseInt(player.seconds + 30) / parseInt(duration) >= 1
      console.log(duration)
      updateVideoProgress(progId.id, {
        progress: player.seconds,
        complete: complete,
        courseId: courseId,
        videoLink: video,
      })
    }
  }

  useEffect(() => {
    if (progId) {
      if (progId?.progress) {
        setStartTime(progId?.progress)
      } else {
        setStartTime(0)
      }
      setLoading(false)
    }
  }, [progId])

  useEffect(() => {
    createVideoProgress({
      owner: user.uid,
      videoId: id,
      progress: 0,
      videoLink: video,
      courseId: courseId,
    }).then((docRef) =>
      getUserProgress(docRef.id).then((data) => setProgId(data)),
    )
  }, [id, user, video, courseId])

  return (
    <>
      {!loading && (
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
      )}
    </>
  )
}
export default Video
