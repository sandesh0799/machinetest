import React, { Component } from 'react'
import {onRegister} from './../../Redux/auth/AuthAction';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
class Register  extends Component {
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            password:"",
            gender:'',
        }
    }
    onHandleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit=()=>{
        //console.log(this.state);
        const {name, email, password,gender} =this.state;
        const newUser={name, email, password,gender};
        this.props.onRegister(newUser, this.props.history);
    }
    render() {
        const {name, email, password,gender} =this.state
        return (
            <div className="container  mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 card p-5">
                            <h1 className="text text-center">Admin Registration</h1>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" name="name" className="form-control" value={name} onChange={this.onHandleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Eamil:</label>
                                <input type="text" name="email" className="form-control" value={email} onChange={this.onHandleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="text" name="password" className="form-control" value={password} onChange={this.onHandleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Gender:</label>
                                <input type="radio" name="gender" className="form-control-check" onChange={this.onHandleChange} value="male"/>Male
                                <input type="radio" name="gender" className="form-control-check" onChange={this.onHandleChange} value="female"/>Female
                            </div>
                            <div className="text-center">
                                <button onClick={this.onSubmit} className="btn btn-primary">Register</button>
                                <p>Already Registered User <Link to="/login">Click Here</Link> To Login</p>
                            </div>
                           
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null,{onRegister})(withRouter(Register));