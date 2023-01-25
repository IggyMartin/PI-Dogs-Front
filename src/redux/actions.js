import axios from 'axios'
export const GET_DOGS = "GET_DOGS"
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"
export const GET_DETAIL = "GET_DETAIL"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const CREATE_DOG = "CREATE_DOG"
export const FILTER_BY_TEMPS = "FILTER_BY_TEMPS"
export const FILTER_DB_OR_API = "FILTER_DB_OR_API"
export const ORDER_ALPHABETICALY = "ORDER_ALPHABETICALY"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"

export function getDogs() {
    return async function(dispatch) {
        const allDogs = await axios.get('/dogs')
        dispatch({
            type: GET_DOGS,
            payload: allDogs.data
        })
    }
}

export function searchByName(name) {
    return async function(dipatch) {
        const searchedDog = await axios.get(`/dogs?name=${name}`)
        dipatch({
            type: SEARCH_BY_NAME,
            payload: searchedDog.data
        })
    }
}

export function getDetail(id) {
    return async function(dispatch) {
        const dogDetail = await axios.get(`/dogs/${id}`)
        dispatch({
            type: GET_DETAIL,
            payload: dogDetail.data
        })
    }
}

export function cleanDetail() {
    return {
        type: CLEAN_DETAIL
    }
}

export function getTemperaments() {
    return async function(dispatch) {
        const temperaments = await axios.get('/temperaments')
        dispatch({
            type: GET_TEMPERAMENTS,
            payload: temperaments.data
        })
    }
}

export function createDog(payload) {
    return async function(dispatch) {
        const info = await axios.post('/dogs/create', payload)
        dispatch({
            type: CREATE_DOG,
            payload: info.data
        })
    }
}

export function filterByTemps(payload) {
    return {
        type: FILTER_BY_TEMPS,
        payload
    }
}

export function filterDbOrCreated(payload) {
    return {
        type: FILTER_DB_OR_API,
        payload
    }
}

export function orderAlphabeticaly(payload) {
    return {
        type: ORDER_ALPHABETICALY,
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}