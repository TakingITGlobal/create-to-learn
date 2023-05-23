import axios from 'axios'

const GetByIdVimeo = async (ID) => {
  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  }
  try {
    const response = await axios.get(
      `https://api.vimeo.com/videos?uris=${ID}`,
      {
        headers,
      },
    )

    if (response.status !== 200) {
      throw Error(response.statusText)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

export default GetByIdVimeo
