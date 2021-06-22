import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {onFetchCategories} from './../../../Redux/category/CategoryAction';
import {onAddProduct} from './../../../Redux/product/ProductAction'
import { Spinner } from 'reactstrap';
class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            categoryId:"",
           
        }
    }
    componentWillMount(){
        this.props.onFetchCategories();
    }
    onHandleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    
    onSubmit=()=>{
        let {name,categoryId}=this.state;
        const obj={
            name,categoryId,
        }
        this.props.onAddProduct(obj);
        this.setState({name:"",categoryId:""});

    }   
    render() {
        const {name,categoryId}=this.state;
        //console.log(this.props);
        const {categories}=this.props;
        const {success, error}=this.props.products;
        //console.log(categories);
        if(this.props.categories.dataState=="FETCHING" || this.props.categories.dataState=="NOT_INITIALIZED"){
            return(
                <div className="text-center">
                    <Spinner color="primary" />
                </div> 
            )
        }else{
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 card p-5">
                    <h1 className="text-center text-info">Add Product</h1>
                    {success?<p className="text-success">{success}</p>:""}
                    {error?<p className="text-danger">{error}</p>:""}
                    
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={name} className="form-control" onChange={this.onHandleChange} />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="categoryId" value="" onChange={this.onHandleChange} className="form-control"> 
                            <option>--select Category--</option>
                            {categories.categories.map((cat, index)=>(
                                <option key={index} value={cat._id}>{cat.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-info" onClick={this.onSubmit}>Add Product</button>
                    </div>
                </div>
                </div>
            </div>
        )
        }
    }
}

const mapStateToProps=state=>({
    categories:state.categories,
    products:state.products,
})

export default connect(mapStateToProps, {onFetchCategories, onAddProduct})(withRouter(AddProduct));