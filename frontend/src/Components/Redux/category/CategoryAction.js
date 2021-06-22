import axios from 'axios';
export const addCategory=(newCategory)=>{
    //console.log("Add Cat");
    console.log(newCategory);
    return (dispatch)=>{
        axios.post('http://localhost:5000/saveCategory', newCategory)
        .then(res=>{
            if(res.status==200){
                dispatch(onAddSuccess(res.data.msg));
            }else{
                dispatch(onAddFailure(res.data.msg));
            }
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const onFetchCategories=()=>{
    return (dispatch)=>{
        dispatch(onFetching)
        axios.get('http://localhost:5000/viewCategory')
        .then(res=>{
            if(res.status==200){
                dispatch(onFetchSuccess(res.data));
            }else{
                dispatch(onFetchFailure(res.data.msg));
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

export const onDeleteCategories=(id)=>{
    return (dispatch)=>{
      return axios.get('http://localhost:5000/deleteCategory/'+id)
        .then(res=>{
            if(res.status==200){
                dispatch(onDeleteSuccess(res.data.msg));
                console.log("Success");
                return true;
            }else{
                dispatch(onDeleteFailure(res.data.msg));
                console.log("Failure");
                return false;
            }
        }).catch(err=>{
            console.log(err);
            console.log("Failure");
            return false;
        })
    }
}
export const fetchSingleCategory=(id)=>{
    return (dispatch)=>{
        return axios.get('http://localhost:5000/editCategory/'+id)
        .then(res=>{
            if(res.status==200){
                return res.data;
            }else{
                return false;
            }
        })
        .catch(err=>{
            console.log(err);
            return false;
        })
    }
}
export const onUpdateCategory=(data, history)=>{
    return (dispatch)=>{
        axios.post('http://localhost:5000/updateCategory', data)
        .then(res=>{
            if(res.status==200){
                dispatch(onUpdateSuccess(res.data.msg));
                history.push('/view-category');
            }else{
                dispatch(onUpdateFailure(res.data.msg));
                history.push('/view-category');
            }
        })
        .catch(err=>{
            dispatch(onUpdateFailure());
        })
    }
}
export const onAddSuccess=(msg)=>{
    return{
        type:"ADD_SUCCESS",
        payload:msg
    }
}
export const onAddFailure=(msg)=>{
    return{
        type:"ADD_FAILURE",
        payload:msg
    }
}

export const onFetching=()=>{
    return{
        type:"FETCHING"
    }
}
export const onFetchSuccess=(data)=>{
    return{
        type:"FETCH_SUCCESS",
        payload:data,
    }
}

export const onFetchFailure=(msg)=>{
    return{
        type:"FETCH_FAILURE",
        payload:msg,
    }
}
export const onDeleteSuccess=(msg)=>{
    return {
        type:"DELETE_SUCCESS",
        payload:msg,
    }
}

export const onDeleteFailure=(msg)=>{
    return {
        type:"DELETE_FAILURE",
        payload:msg,
    }
}
export const onUpdateSuccess=(msg)=>{
    return{
        type:"UPDATE_SUCCESS",
        payload:msg,
    }
}
export const onUpdateFailure=(msg)=>{
    return{
        type:"UPDATE_FAILURE",
        payload:msg,
    }
}