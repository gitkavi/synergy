import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";


const styles={
  roundBtn: {
    width:"30px",
    height:"30px",
    borderRadius:"50%",
    fontSize:"11px",
    padding:"0px",
    textAlign:"center",
    paddingLeft:"3px",
    paddingTop:"2px",
    backgroundColor:"#fdcc52"
  },
  btnNav:{
    paddingTop:"0px"
  },
  logo:{
    fontFamily: 'Pacifico',
    fontSize:"30px"
  }
}

const Navbar = ({loggedIn, logout, user}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container">
        <Link className="navbar-brand js-scroll-trigger" style={styles.logo} to="/">Synergy</Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fa fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">       
            <ul className="navbar-nav ml-auto">
            {loggedIn ? 
            [
                <li className="nav-item" key="logout">
                  <a className="nav-item nav-link" href="#" onClick={logout}>Logout</a>
                </li>,
                <li className="nav-item" key="whiteboard">
                  {/* <a className="nav-link js-scroll-trigger" href="#features">Manage Project</a> */}
                  <Link className="nav-utm nav-link" to="/whiteboard">Whiteboard</Link>
                </li>,

                <li className="nav-item" key="user">
                  <Link className="nav-utm nav-link" style={styles.btnNav} to="/Profile"><button className="btn" style={styles.roundBtn}>{user.initial}</button></Link>
                </li>

              ]
            : 
              [
                <li key="signup" className="nav-item">
                  <Link className="nav-item nav-link" to="/signup">Signup</Link>
                </li>,
                <li key="login" className="nav-item">
                  <Link className="nav-item nav-link" to="/login">Login</Link>
                </li>
              ]    
          }
            </ul>      
        </div>
      </div>
    </nav>
  );
}

export default Navbar;