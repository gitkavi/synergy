import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "mdbreact";
import Task from "../Task";

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "10px",
        height: "50px",
        color:"black"
        
    },
    projectContent:{
        paddingTop:"200px"
    },
    project:{
        fontSize:"16px"
    },
    preProject: {
        textAlign: "center",
        paddingTop: "25px"
    },
    cardWidth: {
        backgroundColor: "lightgrey",
        paddingTop: "25px",
        textAlign: "center"
    },
    cardStyle:{
        height:"250px",
        width:"250px"
    },
    projectLbl:{
        paddingRight:"10px",
       clear:"both"
    },
    edit:{
        paddingTop:"16px",
    },
    projectHeading:{
        paddingTop:"200px",
        paddingRight:"10px",
        clear:"both",
        fontSize:"1.75rem",
        fontWeight:"bold"
    },
    create:{
        paddingTop:"215px"
    },
    modalHeader:{
    backgroundColor: "indianred",
    color: "white",
    fontSize:"8px",
    fontWeight:"bold",
    height:"40px"
    }


}

class Welcome extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            redirectTo: "",
            user:this.props.user,
            projects:[],
            tasks:[],
            show: false, 
            projectname:"",
            projectId:""
        };

        this.createToggle = this.createToggle.bind(this);
        this.updateToggle = this.updateToggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    componentDidMount() {
        this.loadTasks();
        this.loadProjects();
    }

    createToggle = () => {
        console.log("create Toggle");
        this.setState({
            createModal: !this.state.createModal
        });
    }

    updateToggle = (id, name) => {
        console.log("update toggle");
        this.setState({
            updateModal: !this.state.updateModal,
            projectId:id,
            projectname:name
        });
    }

    handleInputChange=event=>{
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    handleFormSubmit=event=> {
        event.preventDefault();
        if(this.state.projectname){
            console.log("UserId inside save project: ",this.state.user.id);
            const newProject={
                projectname:this.state.projectname,
                UserId:this.state.user.id
            };
            API.saveProject(newProject).then(()=>{
                console.log("Project Created");
                this.setState({projectname:"",
                createModal: !this.state.createModal});
                this.loadProjects();
            }).catch(err=>console.log(err));
        }
    }

    handleFormUpdate =(event) => {
        event.preventDefault();
        const id = event.target.getAttribute("data-id");
        console.log("Project id: ", id);
        if(this.state.projectname){
            console.log("update project: ",this.state.projectname);
            const updatedProject={
                projectname:this.state.projectname,
            };
            API.updateProject(id,updatedProject).then(()=>{
                console.log("Project Updated");
                this.setState({projectname:"",
                updateModal: !this.state.updateModal
            });
                this.loadProjects();
           }).catch(err=>console.log(err));
        }
    }

    loadProjects = () =>{
        API.getUserProject(this.state.user.id).then(projects =>{
            console.log("Projects: ",projects.data);
            this.setState({projects:projects.data});
        }).catch(err => console.log(err));
    }

    loadTasks = () => {
        API.getUserTask(this.state.user.id).then(tasks => {
            console.log("Tasks: ",tasks.data);
            this.setState({tasks:tasks.data});
        }).catch(err => console.log(err));
    }

    handleProject = (projectid) => {
        this.setState({ redirectTo: "/projectpage/"+projectid});
    }

    testHandler = event => {
        console.log(event.target.getAttribute("data-id"))
    }

    render() {
        if(!this.props.loggedIn){
            return <Redirect to="/" />
        }
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }
        return (
            <div className="container text-left" style={styles.body}>
                <h2 className="taskshdr"><strong>Tasks</strong></h2>
                <div className="row">
                <div className="col-12">
                {this.state.tasks.length ? (
                    // <div style={styles.grid}>
                        <div>
                        {this.state.tasks.map(task => (
                            <Task  key ={task.id} welcomePage={true} taskId={task.id} projectName={task.Project.projectname} />
                        )
                        )}
                    </div>
                         ) : (
                            <div style={styles.grid}>
                
                                <div className="card taskcard" style={styles.cardStyle}>
                                <img className="card-img-top" src={require("../../img/shared-task.jpg")} alt="Shared task"/>
                                <h6 className="card-block" style={styles.preProject} >
                                Create Projects and Tasks
                                </h6>
                                </div>
                            </div>
                            )} 
                        </div>   
                        </div>
                    <br/>
                {/* <div><label style={styles.projectHeading}>Projects</label> <i className="fas fa-plus" style={styles.create} onClick={this.createToggle}>
                                </i></div> */}
                           <div className="container">
                                <div className="row btnrow">
                                 <div className="col-12">
                               <button onClick={this.createToggle} className="express-btn btn btn-primary btn-xl rounded-pill mt-5 loginbtn newpbtn" >Create New Project</button>
                                        </div></div>

                    {this.state.projects.map(project =>(
                        <div key ={project.id}>
                            {/* <div className="row">
                                 <div className="col-12">
                            <label style={styles.projectLbl} onClick={()=>this.handleProject(project.id)}>{project.projectname}</label> 
                                <i className="fas fa-edit" data-id={project.id} style={styles.edit} onClick={()=>this.updateToggle(project.id,project.projectname)}>
                                </i> 
                                </div></div>     */}

                                    <div className="row">
                                 <div className="col-2 pname">
                                    <label style={styles.projectLbl} >{project.projectname}</label>
                                 </div>
                                 <div className="col-5">
                                    <button  onClick={()=>this.handleProject(project.id)} className="express-btn btn btn-primary btn-xl rounded-pill mt-5 loginbtn newtaskbtn" >Add New Tasks</button>
                                 </div>
                                 <div className="col-5">
                                    <button  onClick={()=>this.updateToggle(project.id,project.projectname)} className="express-btn btn btn-primary btn-xl rounded-pill mt-5 loginbtn updatepbtn" >Update Project Name</button>
                                 </div>
                                 </div>

                                
                                                
                        <Modal isOpen={this.state.updateModal} >
                            <form onSubmit={this.handleFormUpdate} data-id={this.state.projectId} >
                                <ModalHeader style={styles.modalHeader}>Update Project Name</ModalHeader>
                                <ModalBody>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <input type="text" name="projectname" value={this.state.projectname || ''} onChange={this.handleInputChange} placeholder={this.state.projectname} className="form-control" />
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <input type="submit" value="Submit" color="success" className="btn btn-success"  />
                                    <Button color="danger" onClick={(event)=>this.updateToggle(project.id)}>Cancel</Button>
                                </ModalFooter>
                            </form>
                        </Modal>
                        </div>
                        ))}
                    
                        {/* <h4 style={styles.projectLbl} onClick={this.createToggle}>
                            + Create New Project
                    </h4> */}
                
                <br />
                <div>
                    <Modal isOpen={this.state.createModal}>
                        <form onSubmit={this.handleFormSubmit}>
                            <ModalHeader style={styles.modalHeader}>Project Name</ModalHeader>
                            <ModalBody>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <input type="text" name="projectname" value={this.state.projectname} onChange={this.handleInputChange} className="form-control" />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <input type="submit" value="Submit" color="success" className="btn btn-success" />
                                <Button color="danger" onClick={this.createToggle}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </Modal>
                </div>
                </div>
            </div>
            
        );
    }
}

export default Welcome;