import { useState, useEffect, useMemo } from 'react'
import { culturalGroups } from '../assets/options/filters'

export const useCreatorsFilter = ({
  allCreators,
  culturalGroupFilter = [],
  search = '',
}) => {
  const [filteredCreators, setFilteredCreators] = useState(allCreators)

  const isHavingFilters = useMemo(
    () => search !== '' || culturalGroupFilter.length,
    [search, culturalGroupFilter],
  )

  useEffect(() => {
    const culturalGroupsToFilter = culturalGroupFilter.length
      ? culturalGroupFilter
      : //some creators do not have a cultural group set
        culturalGroups + ['']

    const filtCreators = allCreators.filter((creator) => {
      const creatorFNMI = creator.fnmi ? creator.fnmi : ['']
      const creatorName = creator.name ? creator.name.toLowerCase() : ''
      return creatorFNMI.some(
        (grp) =>
          culturalGroupsToFilter.includes(grp) &&
          creatorName.search(search) !== -1,
      )
    })
    setFilteredCreators(filtCreators)
  }, [culturalGroupFilter, allCreators, search])

  return { data: isHavingFilters ? filteredCreators : allCreators }
}
