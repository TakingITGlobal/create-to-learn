import { useState, useEffect, useMemo } from 'react'
import { durations } from '../assets/options/filters'

export const useCoursesFilter = ({
  allCourses,
  categoryFilter = [],
  durationFilter = [],
  search = '',
  categories,
}) => {
  const [filteredCourses, setFilteredCourses] = useState(allCourses)
  const isHavingFilters = useMemo(
    () => search !== '' || categoryFilter.length || durationFilter.length,
    [search, categoryFilter, durationFilter],
  )
  useEffect(() => {
    //Use filters if some have been chosen. Otherwise, assume all filters are chosen.
    const categoriesToFilter =
      categoryFilter && categoryFilter.length ? categoryFilter : categories
    const durationsToFilter =
      durationFilter && durationFilter.length ? durationFilter : durations

    const filtCourses =
      allCourses &&
      allCourses.filter((course) => {
        const courseTitle = course.seriesName.toLowerCase()
        return (
          course.category.some((cat) => categoriesToFilter.includes(cat)) &&
          durationsToFilter.some(
            (duration) =>
              course.totalLength >= duration.lowerValue &&
              course.totalLength < duration.upperValue,
          ) &&
          courseTitle.search(search) !== -1
        )
      })

    setFilteredCourses(filtCourses)
  }, [categoryFilter, durationFilter, search, allCourses])

  return { data: isHavingFilters ? filteredCourses : allCourses }
}
