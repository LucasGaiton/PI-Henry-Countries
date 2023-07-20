//Se debe crear el estado global con nombre initialState
const initialState = {
    home:[],
    allCountries:[],
    filterCountries : [],
    activities : [],
    countryDetail : {},

}



//Creamos el reducer 
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "LOAD_HOME": return {
            ...state, home: action.payload
        };
        case "LOAD_ALL": return {
            ...state, allCountries: action.payload
        };
        case "LOAD_ACTIVITIES": return {
            ...state, activities: action.payload
        };
        case "LOAD_FILTER": return {
            ...state, filterCountries: action.payload
        };
        case "LOAD_FILTER_NAME": return {
            ...state, filterCountries: action.payload
        };
        case "LOAD_DETAIL": return {
            ...state, countryDetail: action.payload
        };
        default: return { ...state }
    }

}
export default reducer