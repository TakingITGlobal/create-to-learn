export const displayTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const formattedSeconds =
    seconds < 10 ? `0${Math.floor(seconds)}` : Math.floor(seconds)
  return `${minutes}: ${formattedSeconds}`
}

export const displayMinutes = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
  return `${minutes} minutes`
}
