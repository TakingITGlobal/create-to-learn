import React, { useState, useEffect, useCallback } from 'react'
import Vimeo from '@u-wave/react-vimeo'

import { debounce } from 'lodash';
import { loadVideoProgress, saveVideoProgress } from 'util/db';

export default function Video(props) {
  const { video, user,  id,  courseId } = props;

  const [docId, setDocId] = useState(null);
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
      saveVideoProgress(docId, data)
        .then(() => localStorage.setItem(`video-progress-${id}`, JSON.stringify(data)))
        .catch(err => console.error("Failed to save video progress:", err));
    } else {
      localStorage.setItem(`video-progress-${id}`, JSON.stringify(data))
    }
    
  }, 3000), [user.uid, id, completed, docId]);

  useEffect(() => {
    setLoading(true);

    if(user?.uid !== undefined) {
      loadVideoProgress(user.uid, id )
        .then((loadedProgress) => {
          if (loadedProgress !== null) {
            setProgress(loadedProgress.progress);
            setDocId(loadedProgress.docId);
            console.log(loadedProgress);
            localStorage.setItem(`video-progress-${id}`, JSON.stringify(loadedProgress));

            if(loadedProgress.completed) setCompleted(loadedProgress.completed)
          } else {
            // Load from localStorage if no progress was found in Firestore
            const progressFromLocalStorage = JSON.parse(localStorage.getItem(`video-progress-${id}`));
            if (progressFromLocalStorage) {
              setProgress(parseInt(progressFromLocalStorage.progress, 10));
            }
          }
        })
        .catch(err => console.error("Failed to load video progress:", err))
        .finally(() => setLoading(false));
    } else {
      const progressFromLocalStorage = JSON.parse(localStorage.getItem(`video-progress-${id}`));
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