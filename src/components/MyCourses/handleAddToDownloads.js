import { createDownloadCourse } from '../../util/db'
import { saveAs } from 'file-saver'

//Find a way to collapse this with the other handleAddToDownloads
export const handleAddToDownloads = (
  videosToDownload,
  downloadsData,
  handleSnackbar,
  auth,
  course,
) => {
  if (!auth.user.uid) {
    return
  }

  const videoDownloadInfo = videosToDownload.flatMap(({ download, name }) => {
    return {
      ...download.filter(({ public_name }) => public_name === '240p')[0],
      name: name,
    }
  })

  downloadCourse(videoDownloadInfo, course.seriesName)

  const downloadedCourse = {
    owner: auth.user.uid,
    courseId: course.id,
    courseUID: course.uid,
  }

  const isInDownloadsList = downloadsData.length > 0

  if (!isInDownloadsList) {
    createDownloadCourse(downloadedCourse).then(() =>
      handleSnackbar('Success!  Added to your Downloads'),
    )
  } else {
    handleSnackbar('Already in your downloads!')
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
