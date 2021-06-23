import axios from 'axios';
export const onAddProduct=(data)=>{
    //console.log(data);
    const fd=new FormData();
    fd.append("name", data.name);
    fd.append("categoryId", data.categoryId);


    return (dispatch)=>{
        axios.post('http://localhost:5000/saveProduct',fd)
        .then(res=>{
            if(res.status==200){
                dispatch(onAddSuccess(res.data.msg))
            }else{
                dispatch(onAddFailure(res.data.msg))
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

export const onFetchProduct=()=>{
    return (dispatch)=>{
        dispatch(onFetching);
        axios.get('http://localhost:5000/viewProduct?pageNo=1&size=10')
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

export const onDeleteProducts=(id)=>{
    return (dispatch)=>{
      return axios.get('http://localhost:5000/deleteProduct/'+id)
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

export const fetchSingleProduct=(id)=>{
    return (dispatch)=>{
        return axios.get('http://localhost:5000/editProduct/'+id)
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
export const onUpdateProduct=(data, history)=>{
    const fd=new FormData();
    fd.append("name", data.name);
    fd.append("categoryId", data.categoryId);    
    fd.append("id", data.id);


    return (dispatch)=>{
        axios.post('http://localhost:5000/updateProduct', fd)
        .then(res=>{
            if(res.status==200){
                dispatch(onUpdateSuccess(res.data.msg));
                history.push('/view-product');
            }else{
                dispatch(onUpdateFailure(res.data.msg));
                history.push('/view-product');
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