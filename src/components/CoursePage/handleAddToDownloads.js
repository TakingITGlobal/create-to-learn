import { createDownloadCourse, updateDownloads } from '../../util/db'

//This function needs to be separated out to CourseSection since it is also used in CourseLessons
export const handleAddToDownloads = (
  handleCloseDrawers,
  auth,
  downloadsData,
  course,
  videosToDownload,
  videoInfo,
) => {
  if (!auth?.user?.uid) {
    return
  }

  const videoDownloadData = getVideoDataToDownload(videoInfo, videosToDownload)
  if (!downloadsData.length) {
    createDownloadCourse({
      owner: auth.user.uid,
      courseId: course.id,
      courseUID: course.uid,
      videos: videoDownloadData,
    }).then(() => handleCloseDrawers('Success!  Added to your Downloads'))
  } else {
    const videosAlreadyAdded = downloadsData[0].videos
    const videosToAdd = videoDownloadData.filter(
      (video) =>
        !videosAlreadyAdded.map((video) => video.uri).includes(video.uri),
    )
    if (videosToAdd.length) {
      updateDownloads(downloadsData[0].id, {
        ...downloadsData[0],
        videos: [...videosAlreadyAdded, ...videosToAdd],
      }).then(() => handleCloseDrawers('Success!  Added to your Downloads'))
    } else {
      handleCloseDrawers('Already in your downloads!')
    }
  }
}

const getVideoDataToDownload = (videoInfo, videosToDownload) => {
  const videos = videoInfo.filter((video) =>
    videosToDownload.includes(video.uri),
  )
  return videos.map((video) => {
    return {
      videoName: video.name,
      duration: video.duration,
      link: video.link,
      uri: video.uri,
    }
  })
}
