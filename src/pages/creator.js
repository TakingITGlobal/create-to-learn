import React, { useContext } from 'react'
import CreatorSection from './../components/CreatorSection'
import { useRouter } from './../util/router'
import { dataContext } from '../util/dataProvider'
import Meta from 'components/Meta'

function CreatorPage(props) {
  const router = useRouter()
  const { creatorId } = router.params

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
      <Meta
        title={`${creator.name} - Creators - Create to Learn)`}
        description={`${creator.pleaseIncludeAShort23SentenceBioThatWeCanUseWhenPromotingYourContent}`}
        image={creator.image}
      />
      {!loadingCourses && !loadingCreators && (
        <CreatorSection coursesByCreator={coursesByCreator} creator={creator} />
      )}
    </>
  )
}

export default CreatorPage
