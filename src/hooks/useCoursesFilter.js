import { useState, useEffect, useMemo } from 'react'
import {
  durations,
  culturalGroups,
  difficultyLevels,
} from '../assets/options/filters'
import { categories } from '../assets/options/categories'

const ALL_CATEGORIES = 'All'

export const useCoursesFilter = ({
  allCreators,
  allCourses,
  durationFilter = [],
  culturalGroupFilter = [],
  categoryFilter = ALL_CATEGORIES,
  featuredFilter,
  difficultyLevelFilter,
  materialsFilter,
}) => {
  const [filteredCourses, setFilteredCourses] = useState(allCourses)
  const hasFilters = useMemo(
    () =>
      durationFilter.length ||
      culturalGroupFilter.length ||
      categoryFilter !== ALL_CATEGORIES ||
      featuredFilter ||
      difficultyLevelFilter.length ||
      materialsFilter.length,
    [
      durationFilter,
      culturalGroupFilter,
      categoryFilter,
      featuredFilter,
      difficultyLevelFilter,
      materialsFilter,
    ],
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
          handleFeatured(featuredFilter, course.featured) &&
          handleDifficulty(
            difficultyLevelFilter,
            difficultyLevels,
            course.difficultyLevel,
          ) &&
          handleMaterials(materialsFilter, course.materials)
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
    difficultyLevelFilter,
    materialsFilter,
  ])

  return { data: hasFilters ? filteredCourses : allCourses }
}

//ToDo: collapse some of these into one function

const handleDurations = (durationFilter, courseLength) => {
  if (!durationFilter) {
    return true
  }
  return durationFilter.some(
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
  if (!culturalGroupFilter.length) {
    return true
  }

  return culturalGroupFilter.some((culturalGroup) =>
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

const handleDifficulty = (
  difficultyLevelFilter,
  difficultyLevels,
  courseDifficulty,
) => {
  if (!difficultyLevelFilter.length) {
    return true
  }
  return difficultyLevelFilter.some((level) => level === courseDifficulty)
}

const handleMaterials = (materialsFilter, courseMaterials) => {
  if (!materialsFilter.length) {
    return true
  }
  return (
    courseMaterials &&
    materialsFilter.some((material) =>
      courseMaterials.some((m) => m === material),
    )
  )
}
