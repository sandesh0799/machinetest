import axios from 'axios';
import setAuthToken from './../../Utils/setAuthToken';
import jwtDecode from 'jwt-decode';
export const onRegister=(newUser, history)=>{
    return (dispatch)=>{
        axios.post('http://localhost:5000/register', newUser)
        .then(res=>{
           // console.log(res);
           if(res.status==200){
               history.push('/login')
           }else{
               history.push('/')
           }
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const onLogin=(newUser, history)=>{
    //console.log("New User");
    return(dispatch)=>{
        axios.post('http://localhost:5000/login', newUser)
        .then(res=>{
            console.log(res);
            if(res.status==200){
                setAuthToken(res.data.token);
                const decoded=jwtDecode(res.data.token);
                console.log(decoded);
                localStorage.setItem('user', decoded);
                dispatch(onLoginSuccess(decoded));
                history.push('/dashboard');
            }else{
                //dispatch(onLoginFailure(err.response.data.msg));
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(onLoginFailure(err.response.data.msg));
        })
    }
}


export const onLogout=(history)=>{
    return (dispatch)=>{
        setAuthToken();
        localStorage.removeItem('user');
        dispatch(onLogoutSuccess());
        history.push('/login');
    }
}
export const onLoginSuccess=(user)=>{
    return {
        type:"ON_LOGIN_SUCCESS",
        payload: user,
    }
}
export const onLoginFailure=(msg)=>{
    return {
        type:"ON_LOGIN_FAILURE",
        payload:msg,
    }
}

export const onLogoutSuccess=()=>{
    return{
        type:"ON_LOGOUT_SUCCESS"
    }
}