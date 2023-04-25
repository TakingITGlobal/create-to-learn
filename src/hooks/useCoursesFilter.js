import { useState, useEffect, useMemo } from 'react'
import { durations, culturalGroups } from '../assets/options/filters'
// import { categories } from '../assets/options/categories'

export const useCoursesFilter = ({
  allCreators,
  allCourses,
  durationFilter = [],
  culturalGroupFilter = [],
}) => {
  const [filteredCourses, setFilteredCourses] = useState(allCourses)
  const isHavingFilters = useMemo(
    () => durationFilter.length || culturalGroupFilter.length,
    [durationFilter, culturalGroupFilter],
  )

  useEffect(() => {
    //Use filters if some have been chosen. Otherwise, assume all filters are chosen.
    // const categoriesToFilter =
    //   categoryFilter && categoryFilter.length
    //     ? categoryFilter
    //     : categories.map((category) => category.label)
    const durationsToFilter =
      durationFilter && durationFilter.length ? durationFilter : durations
    const culturalGroupsToFilter =
      culturalGroupFilter && culturalGroupFilter.length
        ? culturalGroupFilter
        : culturalGroups

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
          culturalGroupsToFilter.some((culturalGroup) =>
            creatorFNMI.includes(culturalGroup),
          )
        )
      })

    setFilteredCourses(filtCourses)
  }, [durationFilter, allCourses, allCreators, culturalGroupFilter])

  return { data: isHavingFilters ? filteredCourses : allCourses }
}
