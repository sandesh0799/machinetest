import React, { Component } from 'react'
import {addCategory} from './../../../Redux/category/CategoryAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
class AddCategory extends Component {
    constructor(props){
        super();
        this.state={
            categoryName:"",
        }
    }
    onHandleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit=()=>{
        console.log(this.state);
        const newCategory={
            categoryName:this.state.categoryName,
        }
        this.props.addCategory(newCategory);
    }
    render() {
        const {categoryName}=this.state;
        //console.log(this.props);
        const {success, error}=this.props.categories;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 card p-5">
                    <h1 className="text-center text-info">Add Category</h1>
                    {success?<p className="text-success">{success}</p>:""}
                    {error?<p className="text-danger">{error}</p>:""}
                    <div className="form-group">
                        <label>Category Name</label>
                        <input type="text" name="categoryName" className="form-control" value={categoryName} onChange={this.onHandleChange} />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-info" onClick={this.onSubmit}>Add Category</button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    categories:state.categories
})
export default connect(mapStateToProps,{addCategory})(withRouter(AddCategory));