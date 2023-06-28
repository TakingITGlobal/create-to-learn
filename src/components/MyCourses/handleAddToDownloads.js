import {
  downloadsData,
  createDownloadCourse,
  updateDownloads,
} from '../../util/db'

const getVideoDataToDownload = (videoInfo) => {
  return videoInfo.map((video) => {
    return {
      videoName: video.name,
      duration: video.duration,
      link: video.link,
      uri: video.uri,
    }
  })
}
//This function needs to be separated out to CourseSection since it is also used in CourseLessons
//It also really needs to be cleaned up a bit.
export const handleAddToDownloads = (
  videoInfo,
  downloadsData,
  handleSnackbar,
  setDownloadVideos,
  setCourseToDownload,
  auth,
  course,
) => {
  setDownloadVideos(true)

  if (!auth.user.uid) {
    return
  }

  const videoDownloadInfo = videoInfo.flatMap(({ download }) =>
    download.filter(({ public_name }) => public_name === '240p'),
  )

  setCourseToDownload(videoDownloadInfo)

  const videoDownloadData = getVideoDataToDownload(videoInfo)

  const downloadedCourse = {
    owner: auth.user.uid,
    courseId: course.id,
    courseUID: course.uid,
    videos: videoDownloadData,
  }
  const videosAlreadyAdded = downloadsData[0].videos
  const videosToAdd = videoDownloadData.filter(
    (video) =>
      !videosAlreadyAdded.map((video) => video.uri).includes(video.uri),
  )
  const isInDownloadsList = downloadsData.length > 0
  const hasVideosToAdd = videosToAdd.length > 0

  if (!isInDownloadsList) {
    createDownloadCourse(downloadedCourse).then(() =>
      handleSnackbar('Success!  Added to your Downloads'),
    )
  } else {
    if (hasVideosToAdd) {
      updateDownloads(downloadsData[0].id, {
        ...downloadsData[0],
        videos: [...videosAlreadyAdded, ...videosToAdd],
      }).then(() => handleSnackbar('Success!  Added to your Downloads'))
    } else {
      handleSnackbar('Already in your downloads!')
    }
  }
}
