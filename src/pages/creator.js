import React, { useContext } from 'react'
import Meta from './../components/Meta'
import CreatorSection from './../components/CreatorSection'
import { useRouter } from './../util/router'
import { dataContext } from '../util/dataProvider'

function CreatorPage(props) {
  const router = useRouter()
  const { creatorId } = router.params

  /* To Do: Decide whether we want to query the database for creators by uid 
    and courses by creator name instead.
    It is 1am and in my sleepy brain, this seemed easier to do instad of 
    creating another db query since we are already pulling in all courses and 
    creators for the data provider anyway.*/

  const { allCourses, allCreators, loadingCourses, loadingCreators } =
    useContext(dataContext)

  const creatorResults =
    allCreators.length &&
    allCreators.filter((creator) => creator?.uid === creatorId)

  const creator = creatorResults.length ? creatorResults[0] : []

  const coursesByCreator =
    allCourses.length &&
    allCourses.filter((course) => course.creator === creator.name)

  return (
    <>
      <Meta title="Creator" />
      {!loadingCourses && !loadingCreators && (
        <CreatorSection coursesByCreator={coursesByCreator} creator={creator} />
      )}
    </>
  )
}

export default CreatorPage
