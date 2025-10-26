import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'


function get_params(options) {
    // const def =
    // {
    //     searchPreffix: '',
    //     sortField: '',
    //     sortOrder: '',
    //     durationRange: [NaN, NaN],
    //     reviewsRange: [NaN, NaN],
    // }
    const { searchPreffix, sortField, sortOrder, durationRange, reviewsRange } = options
    const params = {
        searchPreffix: searchPreffix || undefined,
        sortField: sortField || undefined,
        sortOrder: sortOrder || undefined
    }
    const [durationMin, durationMax] = durationRange
    if (!Number.isNaN(durationMin)) {
        params.durationMin = durationMin
    }
    if (!Number.isNaN(durationMax)) {
        params.durationMax = durationMax
    }
    const [reviewsMin, reviewsMax] = reviewsRange
    if (!Number.isNaN(reviewsMin)) {
        params.reviewsMin = reviewsMin
    }
    if (!Number.isNaN(reviewsMax)) {
        params.reviewsMax = reviewsMax
    }
    return params
}

async function get_films({ options, setLoading = () => { },
    setError = () => { }, setShowList = () => { } }) {
    setLoading(true)
    try {
        const res = await axios.get(BASE_URL + '/films', {
            params: get_params(options)
        })
        setShowList(res.data)
        setLoading(false)
    } catch (err) {
        setError(err)
        setLoading(false)
        console.log(err)
    }

}

export default get_films