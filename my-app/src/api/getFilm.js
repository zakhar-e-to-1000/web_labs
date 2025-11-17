import axios from 'axios'
const BASE_URL = 'http://localhost:5000/api'

async function get_film({ id, setLoading = () => { },
    setError = () => { } }) {
    setLoading(true)
    try {
        const res = await axios.get(BASE_URL + `/films/${id}`)
        setLoading(false)
        return res.data
    } catch (err) {
        setError(err)
        setLoading(false)
        console.log(err)
    }

}

export default get_film