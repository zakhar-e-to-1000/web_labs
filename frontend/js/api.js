const baseRequest = async (url, method, body = null) => {
    const fetchParams = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    }
    if (body !== null) {
        fetchParams.body = body;
    }
    try {
        return await fetch(url, fetchParams)
    } catch (error) {
        console.log('HTTP ERROR: ', error)
    }
}

export const getAllFilms = async ({ SearchPreffix = '', sort = '' }) => {
    const params = {}
    if (SearchPreffix !== '') {
        params.s = SearchPreffix
    }
    if (sort != '') {
        // const ll = ['name', 'duration', 'rev']
        params.sort = sort;
    }
    const url_params = new URLSearchParams(params)
    const r = await baseRequest(`/film?${url_params}`, 'GET')
    return await r.json()
}


export const postNewFilm = async ({ name, duration, reviews }) => {
    const body = { name, duration, reviews }
    const r = await baseRequest('/film', 'POST', JSON.stringify(body))
    return await r.text

}

export const deleteFilm = async (id) => {
    const r = await baseRequest(`/film/${id}`, 'DELETE')
    return await r.text

}

export const updateFilm = async ({ id, name, duration, reviews }) => {
    const body = { name, duration, reviews }
    const r = await baseRequest(`/film/${id}`, 'PUT', JSON.stringify(body))
    return await r.text
}