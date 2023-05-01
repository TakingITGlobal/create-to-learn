import React, { useEffect, useState } from 'react'
import Meta from './../components/Meta'
import CreatorSection from './../components/CreatorSection'
import { useRouter } from './../util/router'
import { useCreatorByUID } from '../util/db'
function CreatorPage(props) {
  const router = useRouter()
  const [data, setData] = useState()
  const { creatorId } = router.params
  const { data: creatorData, isLoading } = useCreatorByUID(creatorId)

  useEffect(() => {
    if (!isLoading) {
      setData(creatorData[0])
    }
  }, [creatorData, isLoading])

  return (
    <>
      <Meta title="Creator" />
      {data && <CreatorSection data={data} />}
    </>
  )
}

export default CreatorPage
