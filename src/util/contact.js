import { apiRequestExternal } from './util.js'

const endpoint = `${process.env.REACT_APP_AIRTABLE_ENDPOINT}?tableName=${process.env.REACT_APP_AIRTABLE_NAME}`

function submit(data) {
  return apiRequestExternal(endpoint, 'POST', [
    {
      Name: data.name,
      Email: data.email,
      Message: data.message,
    },
  ])
}

const contact = { submit }

export default contact
