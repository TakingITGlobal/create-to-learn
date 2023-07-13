import { createDownloadCourse } from '../../util/db'
import { saveAs } from 'file-saver'

//This function needs to be separated out to CourseSection since it is also used in CourseLessons
//Can this be made into a custom hook??

export const handleAddToDownloads = (
  handleCloseDrawers,
  auth,
  downloadsData,
  course,
  videosToDownload,
  videoInfo,
  quality,
) => {
  if (!auth?.user?.uid) {
    return
  }

  //Find a way to collapse this with the other handleAddToDownloads

  const downloadedCourse = {
    owner: auth.user.uid,
    courseId: course.id,
    courseUID: course.uid,
  }

  const videos = videoInfo.filter((video) =>
    videosToDownload.includes(video.uri),
  )
  const videoDownloadInfo = videos.flatMap(({ download, name }) => {
    return {
      ...download.filter(({ public_name }) => public_name === '240p')[0],
      name: name,
    }
  })

  downloadCourse(videoDownloadInfo, course.seriesName)

  const isInDownloadsList = downloadsData.length > 0

  if (!isInDownloadsList) {
    createDownloadCourse(downloadedCourse).then(() =>
      handleCloseDrawers('Success!  Added to your Downloads'),
    )
  } else {
    handleCloseDrawers('Already in your downloads!')
  }
}

const downloadCourse = (files, name) => {
  const zip = require('jszip')()

  for (let file = 0; file < files.length; file++) {
    zip.file(`${files[file].name}.mp4`, files[file].link, { binary: true })
  }
  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, `${name}.zip`)
  })
}
