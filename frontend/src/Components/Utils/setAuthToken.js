import axios from 'axios';
const setAuthToken=(token)=>{
    if(token){
        axios.defaults.headers.common['authenticated']=token;
    }else{
        delete axios.defaults.headers.common['authenticated'];
    }
}

export default setAuthToken;