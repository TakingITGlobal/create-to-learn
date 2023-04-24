import React, { useState, useContext, createContext, useMemo } from 'react'
import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from './firebase'
import { useCourses, useCreators, useLearningPaths } from './db'

const db = getFirestore(firebaseApp)

export const useData = () => useContext(db)

export const dataContext = createContext()

export function DataProvider({ children }) {
  const [creators, setCreators] = useState([])
  const [courses, setCourses] = useState([])
  const [learningPaths, setLearningPaths] = useState([])
  const {
    data: dataCourses,
    isLoading: loadingCourses,
    error: errorLoadingCourses,
  } = useCourses()
  const {
    data: dataCreators,
    isLoading: loadingCreators,
    error: errorLoadingCreators,
  } = useCreators()
  const { data: dataLearningPaths, isLoading: loadingLearningPaths } =
    useLearningPaths()

  useMemo(() => {
    if (!loadingCourses) {
      setCourses(dataCourses)
    }
    if (!loadingCreators) {
      setCreators(dataCreators)
    }
    if (!loadingLearningPaths) {
      setLearningPaths(dataLearningPaths)
    }
  }, [dataCreators, dataCourses])

  return (
    <dataContext.Provider
      value={{
        allCourses: courses || [],
        allCreators: creators || [],
        learningPaths,
        loadingCourses,
        loadingCreators,
        loadingLearningPaths,
        errorLoadingCourses,
        errorLoadingCreators,
      }}
    >
      {children}
    </dataContext.Provider>
  )
}
