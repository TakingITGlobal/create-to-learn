import { useState, useEffect, useMemo } from 'react'
import { culturalGroups } from '../assets/options/filters'
import { categories } from '../assets/options/categories'

export const useCreatorsFilter = ({
  allCreators,
  allCourses,
  culturalGroupFilter = [],
  categoryFilter = 'All',
}) => {
  const [filteredCreators, setFilteredCreators] = useState(allCreators)

  const isHavingFilters = useMemo(
    () => culturalGroupFilter.length || categoryFilter !== 'All',
    [categoryFilter, culturalGroupFilter.length],
  )

  useEffect(() => {
    const culturalGroupsToFilter = culturalGroupFilter.length
      ? culturalGroupFilter
      : //some creators do not have a cultural group set
        culturalGroups + ['']

    const categoryToFilter =
      categoryFilter !== 'all' ? [categoryFilter] : categories

    const filtCreators = allCreators.filter((creator) => {
      const creatorCourses = allCourses.filter(
        (course) => creator.name === course.creator,
      )
      const creatorCategories =
        categoryFilter !== 'All'
          ? creatorCourses.flatMap((course) => course.category)
          : categories

      const creatorFNMI = creator.fnmi ? creator.fnmi : ['']
      return (
        creatorFNMI.some((grp) => culturalGroupsToFilter.includes(grp)) &&
        creatorCategories.some((category) =>
          categoryToFilter.includes(category),
        )
      )
    })
    setFilteredCreators(filtCreators)
  }, [culturalGroupFilter, allCreators, categoryFilter, allCourses])

  return { data: isHavingFilters ? filteredCreators : allCreators }
}
