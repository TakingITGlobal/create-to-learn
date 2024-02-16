import React, { useState, useEffect, useCallback } from 'react'
import Vimeo from '@u-wave/react-vimeo'

import { debounce } from 'lodash';
import { loadVideoProgress, saveVideoProgress } from 'util/db';

export default function Video(props) {
  const { video, user, videoProgress, id, duration, courseId } = props;

  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [loading, setLoading] = useState(true);

  const debouncedSaveProgress = useCallback(debounce((newProgress) => {
    const data = {
      completed: completed,
      owner: user.uid,
      videoId: id,
      progress: newProgress,
      courseId: courseId,
      videoLink: video
    }
    if(user.uid !== undefined) {
      saveVideoProgress(data)
        .then(() => localStorage.setItem(`video-progress-${id}`, newProgress.toString()))
        .catch(err => console.error("Failed to save video progress:", err));
    } else {
      localStorage.setItem(`video-progress-${id}`, newProgress.toString())
    }
    
  }, 2000), [user.uid, id]);

  useEffect(() => {
    setLoading(true);
    console.log(id);
    console.log(user.uid)
    if(user?.uid !== undefined) {
      loadVideoProgress(user.uid, id )
        .then((loadedProgress) => {
          if (loadedProgress !== null) {
            setProgress(loadedProgress.progress);
            localStorage.setItem(`video-progress-${id}`, loadedProgress.toString());

            if(loadedProgress.completed) setCompleted(loadedProgress.completed)
          } else {
            // Load from localStorage if no progress was found in Firestore
            const progressFromLocalStorage = localStorage.getItem(`video-progress-${id}`);
            if (progressFromLocalStorage) {
              setProgress(parseInt(progressFromLocalStorage, 10));
            }
          }
        })
        .catch(err => console.error("Failed to load video progress:", err))
        .finally(() => setLoading(false));
    } else {
      const progressFromLocalStorage = localStorage.getItem(`video-progress-${id}`);
      if (progressFromLocalStorage) {
        setProgress(parseInt(progressFromLocalStorage, 10));
      }
      setLoading(false);
    }
    
  }, [user.uid, id]);

  return (
    <>
      {!loading ? (
        <Vimeo
          video={video}
          responsive
          width="100vw"
          onTimeUpdate={({ seconds }) => debouncedSaveProgress(Math.floor(seconds))}
          onEnd={() => setCompleted(true)}
          start={progress}
          style={{
            paddingTop: '2em',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        />
      ) : <div>Loading Video...</div>}
    </>
  )
}