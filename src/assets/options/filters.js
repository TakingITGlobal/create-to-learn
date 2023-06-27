import { languages as languageList } from './languages.js'
export const durations = [
  {
    id: 'less-20',
    label: 'Less than 20 min',
    lowerValue: 0,
    upperValue: 20 * 60,
  },
  {
    id: '20-45',
    label: '20-45 min',
    lowerValue: 20 * 60,
    upperValue: 45 * 60,
  },
  {
    id: '45-60',
    label: ' 45 min to 1 hour',
    lowerValue: 45 * 60,
    upperValue: 60 * 60,
  },
  {
    id: 'more-60',
    label: 'More than 1 hour',
    lowerValue: 60 * 60,
    upperValue: 100000,
  },
]

export const culturalGroups = ['First Nations', 'Métis', 'Inuit']
export const languages = languageList.split('\n')
export const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced']
