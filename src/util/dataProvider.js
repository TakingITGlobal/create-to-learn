import React, { useState, useEffect, useContext, createContext } from 'react'
import { useQuery } from 'react-query'
import { getFirestore, collection, getDocs, query } from 'firebase/firestore'
import { firebaseApp } from './firebase'
import { format, createQuery } from './db'

const db = getFirestore(firebaseApp)

export const useData = () => useContext(db)

export const dataContext = createContext()

export function DataProvider({ children }) {
  const [creators, setCreators] = useState([])
  const [courses, setCourses] = useState([])
  const [learningPaths, setLearningPaths] = useState([])
  const { data: dataCourses, isLoading: loadingCourses } = useCourses()
  const { data: dataCreators, isLoading: loadingCreators } = useCreators()
  const { data: dataLearningPaths, isLoading: loadingLearningPaths } =
    useLearningPaths()

  useEffect(() => {
    if (!loadingCourses) {
      setCourses(dataCourses)
    }
    if (!loadingCreators) {
      setCreators(dataCreators)
    }
    if (!loadingLearningPaths) {
      setLearningPaths(dataLearningPaths)
    }
  }, [loadingCourses, loadingCreators, loadingLearningPaths])

  return (
    <dataContext.Provider
      value={{
        allCourses: courses,
        allCreators: creators,
        learningPaths,
        loadingCourses,
        loadingCreators,
        loadingLearningPaths,
      }}
    >
      {children}
    </dataContext.Provider>
  )
}

export function useCourses() {
  return useQuery(
    ['/Series'],
    // When fetching once there is no need to use `createQuery` to setup a subscription
    // Just fetch normally using `getDoc` so that we return a promise
    () => getDocs(collection(db, '/Series')).then(format),
  )
}

export function useCreators() {
  return useQuery(
    ['/Artists'],
    createQuery(() => query(collection(db, '/Artists'))),
  )
}

export function useLearningPaths() {
  return useQuery(
    ['/LearningPaths'],
    createQuery(() => query(collection(db, '/LearningPaths'))),
  )
}
