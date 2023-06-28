import React from 'react'

const Download = ({ videoInfo, quality, videosToDownload }) => {
  const videos = videoInfo.filter((video) =>
    videosToDownload.includes(video.uri),
  )
  const videoDownloadInfo = videos.flatMap(({ download }) =>
    download.filter(({ public_name }) => public_name === quality),
  )

  console.log(videoDownloadInfo, quality, videosToDownload)

  return (
    <div style={{ display: 'none' }}>
      {videoDownloadInfo.map((video, index) =>
        video?.link ? (
          <iframe
            key={`${video.link}-${index}`}
            title={`${video.link}-${index}`}
            src={video.link}
            loading="lazy"
          />
        ) : null,
      )}
    </div>
  )
}

export default Download
