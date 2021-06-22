import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {onFetchCategories} from './../../../Redux/category/CategoryAction';

import { Spinner } from 'reactstrap';

import {onDeleteCategories} from './../../../Redux/category/CategoryAction';
class ViewCategory extends Component {
    constructor(props){
        super();
    }
    componentDidMount(){
        this.getAllCategories();
    }

    getAllCategories=()=>{
        this.props.onFetchCategories();
    }

    deleteCategory=async(id)=>{
       //console.log(id)
       const res= await this.props.onDeleteCategories(id);
       //console.log(res);
       if(res){
          // console.log("Inside if");
           this.getAllCategories();
       }
    }
   

    render() {
        console.log(this.props);
        const {categories}=this.props.categories;
        const {success, error}=this.props.categories;
        if(this.props.categories.dataState=="FETCHING" || this.props.categories.dataState=="NOT_INITIALIZED"){
            return(
                <div className="text-center">
                    <Spinner color="primary" />
                </div> 
            )
        }
        else{

        return (
            <div className="container">
                <div className="row">
                   <div className="col-md-8">
                   {success?<p className="text-success">{success}</p>:""}
                    {error?<p className="text-danger">{error}</p>:""}
                   
                       <table className="table table-bordered">
                           <thead className="table-dark">
                                 <tr>
                                    <th>S. No</th>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                           </thead>
                           <tbody>
                                {categories.map((el, i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{el.categoryName}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={()=>this.deleteCategory(el._id)}>Delete</button>
                                            <Link className="btn btn-success btn-sm" to={`/edit-category/${el._id}`}>Edit</Link>
                                        </td>
                                    </tr>
                                 ) )}
                           </tbody>
                       </table>
                   </div>
                </div>
            </div>
        )
        }
    }
}
const mapStateToProps=state=>({
    categories:state.categories
})

export default connect(mapStateToProps, {onFetchCategories, onDeleteCategories})(withRouter(ViewCategory))