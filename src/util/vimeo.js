import axios from 'axios'

const GetByIdVimeo = async (ID) => {
  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  }
  const response = await axios.get(`https://api.vimeo.com/videos/${ID}`, {
    headers,
  })

  return response
}

export default GetByIdVimeo
