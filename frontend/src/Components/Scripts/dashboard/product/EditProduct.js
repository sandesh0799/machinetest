import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {onFetchCategories} from './../../../Redux/category/CategoryAction';
import {fetchSingleProduct, onUpdateProduct} from './../../../Redux/product/ProductAction';
import { Spinner } from 'reactstrap';
class EditProduct extends Component {
    constructor(props){
        //console.log("Edit Cat");
        super(props);
        const id=this.props.match.params.id;
       // console.log(id);
       this.state={
        id:id,
        name:"",
        categoryId:"",
       }
        this.getSingleProduct(id);

    }
    componentDidMount(){
        this.props.onFetchCategories();
    }

    getSingleProduct=async(id)=>{
        const res=await this.props.fetchSingleProduct(id);
       console.log(res);
       this.setState({name:res.name, categoryId:res.categoryId});
    }
    onHandleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit=()=>{
        let {name, categoryId,id}=this.state;
        const obj={
            name,categoryId,id
        }
        this.props.onUpdateProduct(obj, this.props.history);
    }
    render() {
        const {name,categoryId ,id}=this.state;
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
                    <h1 className="text-center text-info">Edit Product</h1>
                    {success?<p className="text-success">{success}</p>:""}
                    {error?<p className="text-danger">{error}</p>:""}
                    
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={name} className="form-control" onChange={this.onHandleChange} />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select value={categoryId} name="categoryId" onChange={this.onHandleChange} className="form-control"> 
                            <option>--select Category--</option>
                            {categories.categories.map((cat, index)=>(
                                <option key={index} value={cat._id}>{cat.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="text-center">
                        <input type="hidden" name="id" value={id}/>
                        <button className="btn btn-info" onClick={this.onSubmit}>Update Product</button>
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
export default connect(mapStateToProps,{fetchSingleProduct, onUpdateProduct, onFetchCategories})(withRouter(EditProduct));