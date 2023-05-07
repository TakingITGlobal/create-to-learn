import { useState, useEffect, useMemo } from 'react'
import { culturalGroups } from '../assets/options/filters'
import { categories } from '../assets/options/categories'

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
    const culturalGroupsToFilter = culturalGroupFilter.length
      ? culturalGroupFilter
      : //some creators do not have a cultural group set
        culturalGroups + ['']

    const categoryToFilter =
      categoryFilter !== ALL_CATEGORIES ? [categoryFilter] : categories

    const filtCreators = allCreators.filter((creator) => {
      const creatorCourses = allCourses.filter(
        (course) => creator.name === course.creator,
      )
      const creatorCategories =
        categoryFilter !== ALL_CATEGORIES
          ? creatorCourses.flatMap((course) => course.category)
          : categories

      const creatorFNMI = creator.fnmi ? creator.fnmi : ['']
      return (
        creatorFNMI.some((grp) => culturalGroupsToFilter.includes(grp)) &&
        (!featuredFilter || creator.featured) &&
        creator.featured &&
        creatorCategories.some((category) =>
          categoryToFilter.includes(category),
        )
      )
    })
    console.log(featuredFilter)
    console.log(filtCreators)
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
