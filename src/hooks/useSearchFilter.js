import { useState, useMemo } from 'react'

export const useSearchFilter = ({ allCourses, search, allCreators }) => {
  const [filterCourses, setFilterCourses] = useState(allCourses)
  const [filterCreators, setFilterCreators] = useState(allCreators)

  useMemo(() => {
    if (search !== '') {
      const filtCourses =
        allCourses &&
        allCourses.filter((course) => {
          const courseTitle = course.seriesName.toLowerCase()
          return courseTitle.search(search.toLowerCase()) !== -1
        })

      const filtCreators =
        allCreators &&
        allCreators.filter((creator) => {
          const creatorName = creator?.name?.toLowerCase()

          return creatorName
            ? creatorName.search(search.toLowerCase()) !== -1
            : false
        })

      setFilterCourses(filtCourses)
      setFilterCreators(filtCreators)
    }
  }, [search, allCourses, allCreators])

  return {
    filterCourses: search !== '' ? filterCourses : [],
    filterCreators: search !== '' ? filterCreators : [],
  }
}
