import { useState, useEffect, useMemo } from 'react'
import { culturalGroups } from '../assets/options/filters'
import { categories } from './../assets/options/categories'

const ALL_CATEGORIES = 'All'

export const useCreatorsFilter = ({
  allCreators,
  allCourses,
  culturalGroupFilter = [],
  categoryFilter = ALL_CATEGORIES,
  featuredFilter = false,
}) => {
  const [filteredCreators, setFilteredCreators] = useState(allCreators)

  const isHavingFilters = useMemo(
    () =>
      culturalGroupFilter.length ||
      categoryFilter !== ALL_CATEGORIES ||
      featuredFilter,
    [categoryFilter, culturalGroupFilter.length, featuredFilter],
  )

  useEffect(() => {
    const filtCreators = allCreators.filter((creator) => {
      return (
        handleCulturalGroup(
          culturalGroupFilter,
          creator.fnmi ? creator.fnmi : [''],
        ) &&
        handleCategory(categoryFilter, creator.name, allCourses) &&
        handleFeatured(featuredFilter, creator.featured)
      )
    })

    setFilteredCreators(filtCreators)
  }, [
    culturalGroupFilter,
    allCreators,
    categoryFilter,
    allCourses,
    featuredFilter,
  ])

  return { data: isHavingFilters ? filteredCreators : allCreators }
}

const handleCulturalGroup = (culturalGroupFilter, creatorFNMI) => {
  const culturalGroupsToFilter = culturalGroupFilter.length
    ? culturalGroupFilter
    : //some creators do not have a cultural group set
      culturalGroups + ['']

  return creatorFNMI.some((grp) => culturalGroupsToFilter.includes(grp))
}

const handleCategory = (categoryFilter, creatorName, allCourses) => {
  const categoryToFilter =
    categoryFilter !== ALL_CATEGORIES ? [categoryFilter] : categories

  const creatorCourses = allCourses.filter(
    (course) => creatorName === course.creator,
  )

  const creatorCategories =
    categoryFilter !== ALL_CATEGORIES
      ? creatorCourses.flatMap((course) => course.category)
      : categories

  return creatorCategories.some((category) =>
    categoryToFilter.includes(category),
  )
}

const handleFeatured = (featuredFilter, creatorFeatured) => {
  return !featuredFilter || creatorFeatured
}
