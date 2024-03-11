import React, { useState, useContext, createContext, useMemo } from 'react'
import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from './firebase'
import { useCourses, useCreators } from './db'

const db = getFirestore(firebaseApp)
export const useData = () => useContext(db)
export const dataContext = createContext()

export function DataProvider({ children }) {
  const [creators, setCreators] = useState([])
  const [courses, setCourses] = useState([])
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

  useMemo(() => {
    if (!loadingCourses) {
      setCourses(dataCourses)
    }
    if (!loadingCreators) {
      setCreators(dataCreators)
    }
  }, [loadingCourses, loadingCreators, dataCourses, dataCreators])

  return (
    <dataContext.Provider
      value={{
        allCourses: courses || [],
        allCreators: creators || [],
        loadingCourses,
        loadingCreators,
        errorLoadingCourses,
        errorLoadingCreators,
      }}
    >
      {children}
    </dataContext.Provider>
  )
}
