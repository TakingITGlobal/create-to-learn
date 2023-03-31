import React, { useState, useEffect, useContext, createContext } from 'react'
import { useQuery } from 'react-query'
import { getFirestore, collection, getDocs, query } from 'firebase/firestore'
import { firebaseApp } from './firebase'
import { format, createQuery } from './db'

const db = getFirestore(firebaseApp)

export const useData = () => useContext(db)

export const coursesAndCreatorsContext = createContext()

export function CoursesAndCreatorsProvider({ children }) {
  const [creators, setCreators] = useState([])
  const [courses, setCourses] = useState([])
  const { data: dataCourses, isLoading: loadingCourses } = useCourses()
  const { data: dataCreators, isLoading: loadingCreators } = useCreators()

  useEffect(() => {
    if (!loadingCourses) {
      setCourses(dataCourses)
    }
    if (!loadingCreators) {
      setCreators(dataCreators)
    }
  }, [dataCourses, dataCreators, loadingCourses, loadingCreators])

  return (
    <coursesAndCreatorsContext.Provider
      value={{
        allCourses: courses,
        allCreators: creators,
        loadingCourses: loadingCourses,
        loadingCreators: loadingCreators,
      }}
    >
      {children}
    </coursesAndCreatorsContext.Provider>
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
