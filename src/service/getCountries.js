import axios from 'axios'

export default async function() {
  const endpoint = 'https://restcountries.eu/rest/v2/all'

  try {
    const { data, status } = await axios(endpoint)

    if (status === 200) {
      return data
    } else {
      return []
    }
  } catch (error) {
    throw new Error(error)
  }
}
