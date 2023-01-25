const { GET_DOGS, SEARCH_BY_NAME, GET_DETAIL, CLEAN_DETAIL, GET_TEMPERAMENTS, CREATE_DOG, FILTER_BY_TEMPS, FILTER_DB_OR_API, ORDER_ALPHABETICALY, ORDER_BY_WEIGHT } = require('./actions')

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: {}
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: {}
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case CREATE_DOG:
            return {
                ...state,
                dogs: [...state.dogs, action.payload]
            }
        case FILTER_BY_TEMPS:
            let dogsWithTemps = []
            // let dogsWithTemps = state.allDogs.filter(breed => breed.temperaments?.includes(action.payload))
            state.allDogs.filter(breed => {
                if(Array.isArray(breed.temperaments)) {
                    breed.temperaments.forEach(t => {
                        if(t.name === action.payload) dogsWithTemps.push(breed)
                    });
                } else {
                    if(breed.temperaments?.includes(action.payload)) dogsWithTemps.push(breed)
            }})
            return {
                ...state,
                dogs: dogsWithTemps
            }
        case FILTER_DB_OR_API:
            let createdOrDb = []
            if(action.payload === "created") {createdOrDb = state.allDogs.filter(breed => breed.created === true)}
            else if(action.payload === "existant") {createdOrDb = state.allDogs.filter(breed => !breed.created)}
            if(!createdOrDb.length) createdOrDb = "No dogs have been created"
            return {
                ...state,
                dogs: createdOrDb
            }
        case ORDER_ALPHABETICALY:
            let alphabeticalOrder = action.payload === "asc" ? state.allDogs?.sort((a, b) => a.name.localeCompare(b.name))
                                                             : state.allDogs?.sort((a, b) => b.name.localeCompare(a.name))
            return {
                ...state,
                dogs: alphabeticalOrder
            }
        case ORDER_BY_WEIGHT:
            const weightSort =  action.payload === "minWeight" ?
            state.allDogs?.sort((a, b) => {
                if(parseInt(a.weight.slice(0, 2).trim()) > parseInt(b.weight.slice(0, 2).trim())) {
                    return 1
                } else if(parseInt(a.weight.slice(0, 2).trim()) < parseInt(b.weight.slice(0, 2).trim())) {
                    return -1
                } else {
                    return 0
                }
            }) : state.allDogs?.sort((a, b) => {
                if(Number(b.weight.split(" ")[0]) > Number(a.weight.split(" ")[0])) {
                    return 1
                } else if(parseInt(b.weight.slice(0, 2).trim()) < parseInt(a.weight.slice(0, 2).trim())) {
                    return -1
                } else {
                    return 0
                }
            })    
            return {
                ...state,
                dogs: weightSort
            }
        default:
            return state
    }
}