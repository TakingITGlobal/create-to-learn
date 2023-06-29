export type CourseData = {
  added: string //should be Date
  category: string[]
  creator: string
  creatorPhoto: string
  descriptions: string
  difficultyLevel: string
  featured: string
  id: number
  indigenousGroups: string[]
  materials: string[]
  originalThumbnail: Thumbnail
  qrCode: string
  seriesName: string
  thumbnail: Thumbnail
  thumbnailAdded: string //should be Date
  totalLength: number
  uid: string
  videoLinks: string
  videos: string[]
  webUrl: string
}

export type CourseProgress = {
  complete: Boolean
  courseId: number
  createdAt: CreatedAt
  id: string
  owner: string
  progress: number
  videoId: string
  videoLink: string
}

type Thumbnail = {
  downloadURL: string
  lastModifiedTS: number
  name: string
  ref: string
  type: string
}

type CreatedAt = {
  nanoseconds: number
  seconds: number
}
