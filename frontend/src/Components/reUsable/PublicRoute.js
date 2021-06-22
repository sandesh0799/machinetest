import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const PublicRoute=({component:Component, auth, ...rest})=>(
    <Route 
        {...rest}
        render ={props=>
            auth.isAuthenticated===false?(
                <Component {...props}></Component>
            ):
            (
                <Redirect to="/dashboard"></Redirect>
            )
        }
    />
)

PublicRoute.propTypes={
    auth:propTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth,
})

export default connect(mapStateToProps)(PublicRoute);