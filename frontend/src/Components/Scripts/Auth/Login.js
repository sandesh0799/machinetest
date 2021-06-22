import React, { Component } from 'react'
import {onLogin} from './../../Redux/auth/AuthAction';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
class Login extends Component {
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
        }
    }
    onHandleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit=()=>{
        //console.log(this.state);
        const { email, password} =this.state;
        const newUser={email, password};
        this.props.onLogin(newUser, this.props.history);
    }
    render() {
        const {email, password} =this.state
       // console.log(this.props);
        const error_msg=this.props.auth.error;
        return (
            <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 card p-5">
                        <h1 className="text text-center">Admin Login</h1>
                        {error_msg?  <p class="text-danger">{error_msg}</p>: null}
                       
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" name="email" className="form-control" value={email} onChange={this.onHandleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="text" name="password" className="form-control" value={password} onChange={this.onHandleChange}/>
                        </div>
                        <div className="text-center">
                            <button onClick={this.onSubmit} className="btn btn-primary">Login</button>
                            <p>Not a Registered User <Link to="/">Click Here</Link> To Register First</p>
                        </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps=state=>({
    auth:state.auth,
})

export default connect(mapStateToProps, {onLogin})(withRouter(Login));