import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {Wrapper} from "../BootstrapGrid"
import API from "../../utils/API";


class SignupForm extends Component {
  state = {
    redirectTo:"",
    firstname:"",
    lastname:"",
    email: "",
    password: ""
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value})
  };

  handleSignUp = event => {
    event.preventDefault();
    const initial = (this.state.firstname.charAt(0)+this.state.lastname.charAt(0)).toUpperCase();
    console.log(initial);
    const user ={
      firstname: this.state.firstname, 
      lastname:this.state.lastname, 
      email: this.state.email, 
      password: this.state.password,
      initial: initial
    }
    console.log(user);
    API.signUp(user)
    .then(() => this.setState({
      redirectTo: "/login"
    }));
  }

  render(){
    if(this.state.redirectTo){
      return <Redirect to={this.state.redirectTo} />
    }
    return (
 
      <Wrapper>


        <form className="create-form">
        <div className="form-group">
          <label>First Name: </label>
          <input name="firstname" type="text" className="form-control" placeholder="first name" value={this.state.firstname} onChange={this.handleInputChange}></input>
          <br></br>
          <label>Last Name: </label>
          <input name="lastname" type="text" className="form-control" placeholder="last name" value={this.state.lastname} onChange={this.handleInputChange}></input>
          <br></br>
          <label>Email: </label>
          <input name="email" type="text" className="form-control" placeholder="email" value={this.state.email} onChange={this.handleInputChange}></input>
          <br></br>
          <label>Password: </label>
          <input name="password" type="password" className="form-control" placeholder="password" value={this.state.password} onChange={this.handleInputChange}></input>
          <button onClick={this.handleSignUp} className="express-btn btn btn-primary btn-xl rounded-pill mt-5">Sign Up</button>
        </div>
      </form>


      </Wrapper>
 
 
    )
  }
}

export default SignupForm;