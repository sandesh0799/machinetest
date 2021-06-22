const initialState={
    categories:null,
    error:null,
    success:null,
    dataState:"NOT_INITIALIZED",
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
    switch(action.type){
        case "ADD_SUCCESS":
            return{
                ...state,
                success:action.payload
            }
        case "ADD_FAILURE":
            return{
                ...state,
                error:action.payload,
            }
        case "FETCHING":
            return{
                ...state,
                dataState:"FETCHING",
            }
        case "FETCH_SUCCESS":
            return{
                ...state,
                categories:action.payload,
                dataState:"FETCHED_SUCCESSFULLY",
            }
        case "FETCH_FAILURE":
            return {
                ...state,
                error:action.payload,
            }
        case "DELETE_SUCCESS":
            return{
                ...state,
                success:action.payload,
            }
        case "DELETE_FAILURE":
            return{
                ...state,
                error:action.payload,
            }
        case "UPDATE_SUCCESS":
            return{
                ...state,
                success:action.payload,
            }
        case "UPDATE_FAILURE":
            return{
                ...state,
                error:action.payload,
            }
        default:
            return state;
    }
}