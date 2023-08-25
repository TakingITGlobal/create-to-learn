export type VideoProgress = {
  complete: Boolean
  courseId: number
  createdAt: CreatedAt
  id: string
  owner: string
  progress: number
  videoId: string
  videoLink: string
}

type CreatedAt = {
  nanoseconds: number
  seconds: number
}
