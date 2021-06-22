import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchSingleCategory, onUpdateCategory} from './../../../Redux/category/CategoryAction';
class EditCategory extends Component {
    constructor(props){
        console.log("Edit Cat");
        super(props);
        const id=this.props.match.params.id;
       // console.log(id);
       this.state={
        id:id,
        categoryName:"",
       }
        this.getSingleCategory(id);

    }

    getSingleCategory=async(id)=>{
        const res=await this.props.fetchSingleCategory(id);
       // console.log(res);
       this.setState({categoryName:res.categoryName});
    }
    onHandleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit=()=>{
        console.log(this.state);
        const newCategory={
            id:this.state.id,
            categoryName:this.state.categoryName,
        }
        this.props.onUpdateCategory(newCategory, this.props.history);
    }
    render() {
        const {categoryName, id}=this.state;
        return (
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 card p-5">
                <h1 className="text-center text-info">Edit Category</h1>
                <div className="form-group">
                    <label>Category Name</label>
                    <input type="text" name="categoryName" className="form-control" value={categoryName} onChange={this.onHandleChange} />
                </div>
                <div className="text-center">
                   <input type="hidden" name="id" className="form-control" value={id}/>

                    <button className="btn btn-info" onClick={this.onSubmit}>Update Category</button>
                </div>
            </div>
            </div>
        </div>
        )
    }
}


export default connect(null,{fetchSingleCategory, onUpdateCategory})(withRouter(EditCategory));