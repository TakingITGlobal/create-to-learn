import { useState, useMemo, useContext } from 'react'
import { dataContext } from '../util/dataProvider'

export const useSearchFilter = ({ search }) => {
  const { allCourses, allCreators, loadingCourses, loadingCreators } =
    useContext(dataContext)
  const [filterCourses, setFilterCourses] = useState(allCourses)
  const [filterCreators, setFilterCreators] = useState(allCreators)

  useMemo(() => {
    if (search !== '' && !loadingCourses && !loadingCreators) {
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
  }, [search, allCourses, allCreators, loadingCourses, loadingCreators])

  return {
    filterCourses: search !== '' ? filterCourses : [],
    filterCreators: search !== '' ? filterCreators : [],
  }
}
