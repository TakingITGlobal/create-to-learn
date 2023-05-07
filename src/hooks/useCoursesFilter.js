import { useState, useEffect, useMemo } from 'react'
import { durations, culturalGroups } from '../assets/options/filters'
import { categories } from '../assets/options/categories'

const ALL_CATEGORIES = 'All'

export const useCoursesFilter = ({
  allCreators,
  allCourses,
  durationFilter = [],
  culturalGroupFilter = [],
  categoryFilter = ALL_CATEGORIES,
  featuredFilter,
}) => {
  const [filteredCourses, setFilteredCourses] = useState(allCourses)
  const isHavingFilters = useMemo(
    () =>
      durationFilter.length ||
      culturalGroupFilter.length ||
      categoryFilter !== ALL_CATEGORIES ||
      featuredFilter,
    [durationFilter, culturalGroupFilter, categoryFilter, featuredFilter],
  )

  useEffect(() => {
    const durationsToFilter =
      durationFilter && durationFilter.length ? durationFilter : durations
    const culturalGroupsToFilter =
      culturalGroupFilter && culturalGroupFilter.length
        ? culturalGroupFilter
        : culturalGroups
    const categoriesToFilter =
      categoryFilter !== ALL_CATEGORIES
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
          durationsToFilter.some(
            (duration) =>
              course.totalLength >= duration.lowerValue &&
              course.totalLength < duration.upperValue,
          ) &&
          (!featuredFilter || course.featured) &&
          culturalGroupsToFilter.some(
            (culturalGroup) =>
              creatorFNMI.includes(culturalGroup) &&
              categoriesToFilter.some((category) =>
                course.category.includes(category),
              ),
          )
        )
      })
    console.log(filtCourses)
    setFilteredCourses(filtCourses)
  }, [
    durationFilter,
    allCourses,
    allCreators,
    culturalGroupFilter,
    categoryFilter,
    featuredFilter,
  ])

  return { data: isHavingFilters ? filteredCourses : allCourses }
}
