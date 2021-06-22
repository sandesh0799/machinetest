import './App.css';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom';
import Register from './Components/Scripts/Auth/Register';
import Login from './Components/Scripts/Auth/Login';
import Dashboard from './Components/Scripts/dashboard/Dashboard';
import Store from './Store';
import Header from './Components/Scripts/dashboard/Header';
import AddCategory from './Components/Scripts/dashboard/category/AddCategory';
import ViewCategory from './Components/Scripts/dashboard/category/ViewCategory';
import EditCategory from './Components/Scripts/dashboard/category/EditCategory';
import PrivateRoute from './Components/reUsable/PrivateRoute';
import PublicRoute from './Components/reUsable/PublicRoute';
import setAuthToken from './Components/Utils/setAuthToken';
import store from './Store';
import { onLoginSuccess } from './Components/Redux/auth/AuthAction';
import AddProduct from './Components/Scripts/dashboard/product/AddProduct';
import ViewProduct from './Components/Scripts/dashboard/product/ViewProduct';
import EditProduct from './Components/Scripts/dashboard/product/EditProduct';
function App() {
  const token=localStorage.getItem('user');
  if(token){
    setAuthToken(token);
    store.dispatch(onLoginSuccess(token));
  }


  const Main=withRouter(({location})=>{
    return(
      <div>
          {location.pathname!=="/" && location.pathname!="/login" && <Header/>}
          <Switch>
            <PublicRoute exact path="/" component={Register}/>
            <PublicRoute exact path="/login" component={Login}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/add-category" component={AddCategory}/>
            <PrivateRoute exact path="/view-category" component={ViewCategory}/>
            <PrivateRoute exact path="/edit-category/:id" component={EditCategory}/>
            <PrivateRoute exact path="/add-product" component={AddProduct}/>
            <PrivateRoute exact path="/view-product" component={ViewProduct}/>
            
            <PrivateRoute exact path="/edit-product/:id" component={EditProduct}/>
          </Switch>
      </div>
    )
  })
  return (
    <Provider store={Store}>
      <Router>
        <Main></Main>
      </Router>
    </Provider>
  );
}

export default App;