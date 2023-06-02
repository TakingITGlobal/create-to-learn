import { renderHook } from '@testing-library/react-hooks'
import { useCoursesFilter } from './useCoursesFilter'

//Mock courses, creators,

describe('useCoursesFilter hook', () => {
  let props = {}
  beforeEach(() => {
    props = {
      allCourses: MockedCourses,
      durationFilter: [],
      culturalGroupFilter: [],
      categoryFilter: 'All',
      featuredFilter: false,
      difficultyLevelFilter: [],
      materialsFilter: [],
    }
  })

  it('returns all courses if no filter is chosen', () => {
    const { result } = renderHook(() => useCoursesFilter({ ...props }))
    expect(result.current.data).toEqual(MockedCourses)
  })

  it('returns courses that are in the category of Cultural Teaching', async () => {
    const { result } = renderHook(() =>
      useCoursesFilter({
        ...props,
        categoryFilter: 'Cultural Teaching',
      }),
    )

    const expected = [
      {
        category: ['Cultural Teaching'],
        creator: 'Christi Belcourt',
        difficultyLevel: 'Advanced',
        id: 3,
        indigenousGroups: ['Métis'],
        seriesName: 'Activism today',
        totalLength: '700',
        uid: 'activism-today',
        featured: '',
        materials: ['phone'],
      },
    ]

    // await waitForNextUpdate()
    expect(result.current.data).toEqual(expected)
  })

  it('returns featured courses', () => {
    const { result } = renderHook(() =>
      useCoursesFilter({
        ...props,
        featuredFilter: true,
      }),
    )
    const expected = [
      {
        category: ['Visual Arts'],
        creator: 'Frida Kahlo',
        difficultyLevel: 'Beginner',
        id: 1,
        indigenousGroups: ['First Nations'],
        seriesName: 'Making yourself up',
        totalLength: '1900',
        uid: 'making-yourself-up',
        featured: 'checked',
        materials: ['Paintbrush'],
      },
    ]
    expect(result.current.data).toEqual(expected)
  })

  // it('returns new courses', () => {})

  it('returns courses with Métis indigenous group', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useCoursesFilter({
        ...props,
        culturalGroupFilter: ['Métis'],
      }),
    )
    const expected = [
      {
        category: ['Cultural Teaching'],
        creator: 'Christi Belcourt',
        indigenousGroups: ['Métis'],
        difficultyLevel: 'Advanced',
        id: 3,
        seriesName: 'Activism today',
        totalLength: '700',
        uid: 'activism-today',
        featured: '',
        materials: ['phone'],
      },
    ]
    await waitForNextUpdate()
    expect(result.current.data).toEqual(expected)
  })

  // it('returns courses with Beginner difficulty level', () => {
  //   const { result } = renderHook(() =>
  //     useCoursesFilter({
  //       ...props,
  //       difficultyLevelFilter: ['Beginner'],
  //     }),
  //   )
  //   const expected = [
  //     {
  //       category: ['Visual Arts'],
  //       creator: 'Frida Kahlo',
  //       difficultyLevel: 'Beginner',
  //       id: 1,
  //       indigenousGroups: ['First Nations'],
  //       seriesName: 'Making yourself up',
  //       totalLength: '1900',
  //       uid: 'making-yourself-up',
  //       featured: 'checked',
  //       materials: ['Paintbrush'],
  //     },
  //   ]
  //   expect(result.current.data).toEqual(expected)
  // })

  // it('returns courses which require a ukulele', () => {
  //   const { result } = renderHook(() =>
  //     useCoursesFilter({
  //       ...props,
  //       materialsFilter: ['ukulele'],
  //     }),
  //   )
  //   const expected = [
  //     {
  //       category: ['Music & Songwriting'],
  //       creator: 'Israel Kamakawiwoʻole',
  //       difficultyLevel: 'Intermediate',
  //       id: 2,
  //       indigenousGroups: ['First Nations'],
  //       seriesName: 'Ukulele for the world',
  //       totalLength: '700',
  //       uid: 'ukulelel-for-the-world',
  //       featured: '',
  //       materials: ['ukulele'],
  //     },
  //   ]
  //   expect(result.current.data).toEqual(expected)
  // })

  //   it('returns courses that are more than an hour long', () => {})
})
const MockedCourses = [
  {
    category: ['Visual Arts'],
    creator: 'Frida Kahlo',
    difficultyLevel: 'Beginner',
    id: 1,
    indigenousGroups: ['First Nations'],
    seriesName: 'Making yourself up',
    totalLength: '1900',
    uid: 'making-yourself-up',
    featured: 'checked',
    materials: ['Paintbrush'],
  },
  {
    category: ['Music & Songwriting'],
    creator: 'Israel Kamakawiwoʻole',
    indigenousGroups: ['First Nations'],
    difficultyLevel: 'Intermediate',
    id: 2,
    seriesName: 'Ukulele for the world',
    totalLength: '700',
    uid: 'ukulelel-for-the-world',
    featured: '',
    materials: ['ukulele'],
  },
  {
    category: ['Cultural Teaching'],
    creator: 'Christi Belcourt',
    indigenousGroups: ['Métis'],
    difficultyLevel: 'Advanced',
    id: 3,
    seriesName: 'Activism today',
    totalLength: '700',
    uid: 'activism-today',
    featured: '',
    materials: ['phone'],
  },
]
