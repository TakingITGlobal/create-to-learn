import { useState, useEffect, useMemo } from 'react'
import { durations, culturalGroups } from '../assets/options/filters'
import { categories } from '../assets/options/categories'

export const useCoursesFilter = ({
  allCreators,
  allCourses,
  durationFilter = [],
  culturalGroupFilter = [],
  categoryFilter = 'all',
}) => {
  const [filteredCourses, setFilteredCourses] = useState(allCourses)
  const isHavingFilters = useMemo(
    () =>
      durationFilter.length ||
      culturalGroupFilter.length ||
      categoryFilter !== 'all',
    [durationFilter, culturalGroupFilter, categoryFilter],
  )

  useEffect(() => {
    const durationsToFilter =
      durationFilter && durationFilter.length ? durationFilter : durations
    const culturalGroupsToFilter =
      culturalGroupFilter && culturalGroupFilter.length
        ? culturalGroupFilter
        : culturalGroups
    const categoriesToFilter =
      categoryFilter !== 'All'
        ? [categoryFilter]
        : categories.map(({ label }) => label)
    const filtCourses =
      allCourses &&
      allCourses.filter((course) => {
        const creator =
          allCreators &&
          allCreators.filter((creator) => creator.name === course.creator)
        const creatorFNMI =
          creator && creator.length ? creator[0].fnmi : culturalGroups

        return (
          // course.category.some((cat) => categoriesToFilter.includes(cat)) &&
          durationsToFilter.some(
            (duration) =>
              course.totalLength >= duration.lowerValue &&
              course.totalLength < duration.upperValue,
          ) &&
          culturalGroupsToFilter.some(
            (culturalGroup) =>
              creatorFNMI.includes(culturalGroup) &&
              categoriesToFilter.some((category) =>
                course.category.includes(category),
              ),
          )
        )
      })

    setFilteredCourses(filtCourses)
  }, [
    durationFilter,
    allCourses,
    allCreators,
    culturalGroupFilter,
    categoryFilter,
  ])

  return { data: isHavingFilters ? filteredCourses : allCourses }
}
