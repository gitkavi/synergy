import React, {Component} from 'react';
import "./Profile.css";
import API from "../../utils/API";

const styles={
    body:{
        paddingTop:"100px"
    }
}

class Profile extends Component {

    state={
        user:""
    }

    componentDidMount(){
        this.loadUser();
    }

    loadUser(){
        API.getCurrentUser().then(user=>{
            this.setState({user:user.data});
        }).catch(err=>{console.log(err)});
    }
    
    render(){
        
        return(
        <div className="container" style={styles.body}>
            <h5>Profile</h5>
            <div>
                <h6>Firstname: {this.state.user.firstname}</h6>
                <h6>Lastname: {this.state.user.lastname}</h6>
                <h6>Initials: {this.state.user.initial}</h6>
                <h6>Email: {this.state.user.email}</h6>
            </div>
        </div>
        );
    }
}

export default Profile;
