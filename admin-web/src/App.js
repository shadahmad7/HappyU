import React, { Component,useEffect, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  constructor() {
    super();
    this.state = {user: ""};
  }
 componentDidMount(){
  let a = window.localStorage.getItem("login");
  console.log("JHVBJHVBJH",a);
  this.setState({user:a});
 }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            {this.state.user === null  ? ( 
              <Route exact path="/" name="Login Page" element={<Login />} />
            ) : (
              <Route path="*" name="Home" element={<DefaultLayout />} />
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
