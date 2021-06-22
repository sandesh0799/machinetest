import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {onFetchProduct, onDeleteProducts} from './../../../Redux/product/ProductAction';

import { Spinner } from 'reactstrap';
class ViewProduct extends Component {
    constructor(props){
        super();
    }
    componentWillMount(){
        this.getAllProducts();
    }

    getAllProducts=()=>{
        this.props.onFetchProduct();
    }
    deleteProduct=async(id)=>{
     const res= await this.props.onDeleteProducts(id);
       //console.log(res);
       if(res){
         
           this.getAllProducts();
       }
    }
    render() {
       // console.log(this.props);
        const {products}=this.props.products;
        const {success, error}=this.props.products;
        if(this.props.products.dataState=="FETCHING" || this.props.products.dataState=="NOT_INITIALIZED"){
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
                    {success?<p className="text-success">{success}</p>:""}
                    {error?<p className="text-danger">{error}</p>:""}
                   
                    <table className="table table-bordered">
                        <thead className="tbale-dark">
                            <tr>
                                <th>ProductId</th>
                                <th>ProductName</th>
                                <th>CategoryName</th>
                                <th>CategoryId</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((el, i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{el.name}</td>
                                <td>{el.categoryId.categoryName}</td>
                                <td>{el.categoryId._id}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={()=>this.deleteProduct(el._id)}>Delete</button>
                                    <Link className="btn btn-success btn-sm" to={`/edit-product/${el._id}`}>Edit</Link>
                                </td>
                            </tr>
                        ) )}

                        </tbody>
                    </table>
                </div>
            </div>
        )
        }
    }
}

const mapStateToProps=state=>({
    products:state.products
})

export default connect(mapStateToProps, {onFetchProduct, onDeleteProducts})(withRouter(ViewProduct))