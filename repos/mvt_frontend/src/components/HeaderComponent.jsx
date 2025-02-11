import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Navbar from './Navbar'

const HeaderComponent = ( props ) => {

  let { user, logoutUser } = useContext(AuthContext)
  // let { user } = useContext(AuthContext)
  let location = useLocation()

  return (
    <div>
      { user ? (
        <>
          {/* <Link to="/" >Home</Link>
          <span> | </span>
          <Link onClick={ logoutUser }>Logout</Link> */}
          {/* <Navbar props = { props } >
            {props.children}
          </Navbar> */}
        </>
      ) : (
        <>
          <Link to="/landing" >Landing</Link>
          <span> | </span>
          { location.pathname !== '/login' && <Link to="/login" >Login</Link> }
          { location.pathname === '/landing' && <span> | </span> }
          { location.pathname !== '/signup' && <Link to="/signup" >Signup</Link> }
        </>
      )}

      {/* { user && <p>Hello {user.username}</p> } */}
      
    </div>
  )
}

export default HeaderComponent;