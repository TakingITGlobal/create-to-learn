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
  const hasFilters = useMemo(
    () =>
      durationFilter.length ||
      culturalGroupFilter.length ||
      categoryFilter !== ALL_CATEGORIES ||
      featuredFilter,
    [durationFilter, culturalGroupFilter, categoryFilter, featuredFilter],
  )

  useEffect(() => {
    const filtCourses =
      allCourses &&
      allCourses.filter((course) => {
        return (
          handleDurations(durationFilter, course.totalLength) &&
          handleCulturalGroup(
            culturalGroupFilter,
            course.creator,
            allCreators,
          ) &&
          handleCategory(categoryFilter, course.category) &&
          handleFeatured(featuredFilter, course.featured)
        )
      })

    setFilteredCourses(filtCourses)
  }, [
    durationFilter,
    allCourses,
    allCreators,
    culturalGroupFilter,
    categoryFilter,
    featuredFilter,
  ])

  return { data: hasFilters ? filteredCourses : allCourses }
}

const handleDurations = (durationFilter, courseLength) => {
  const durationsToFilter =
    durationFilter && durationFilter.length ? durationFilter : durations
  return durationsToFilter.some(
    (duration) =>
      courseLength >= duration.lowerValue && courseLength < duration.upperValue,
  )
}

const handleCulturalGroup = (
  culturalGroupFilter,
  courseCreator,
  allCreators,
) => {
  const creator =
    allCreators &&
    allCreators.filter((creator) => creator.name === courseCreator)
  const creatorFNMI =
    creator && creator.length ? creator[0].fnmi : culturalGroups
  const culturalGroupsToFilter =
    culturalGroupFilter && culturalGroupFilter.length
      ? culturalGroupFilter
      : culturalGroups

  return culturalGroupsToFilter.some((culturalGroup) =>
    creatorFNMI.includes(culturalGroup),
  )
}

const handleCategory = (categoryFilter, courseCategories) => {
  const categoriesToFilter =
    categoryFilter !== ALL_CATEGORIES
      ? [categoryFilter]
      : categories.map(({ label }) => label)
  return categoriesToFilter.some((category) =>
    courseCategories.includes(category),
  )
}

const handleFeatured = (featuredFilter, courseFeatured) => {
  return !featuredFilter || courseFeatured
}
