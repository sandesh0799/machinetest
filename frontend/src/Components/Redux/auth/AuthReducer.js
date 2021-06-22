const initialState={
    isAuthenticated: false,
    user:{},
    error:null,
    success: null,
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
    switch(action.type){
        case "ON_LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated:true,
                user:action.payload,
                success:true,
            }
        case "ON_LOGIN_FAILURE":
            return{
                ...state,
                user:{},
                isAuthenticated:false,
                error: action.payload,
            }
        case "ON_LOGOUT_SUCCESS":
            return {
                ...state,
                user:{},
                isAuthenticated:false,
            }
        default:
            return state;
    }
}