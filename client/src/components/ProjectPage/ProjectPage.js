import React, { Component } from "react";
import TaskGroup from '../TaskGroup';
import {Wrapper, Col, Row} from "../BootstrapGrid";
import { Redirect } from "react-router-dom"
import API from "../../utils/API";



class ProjectPage extends Component {
  
  state ={
    projectname:"",
    todoTasks: [],
    doingTasks: [],
    doneTasks: [],
    newTask1: false,
    newTask2: false,
    newTask3: false,
    newTask1Name: "",
    newTask2Name: "",
    newTask3Name: ""
  }

  componentDidMount(){
    this.loadname();
    this.loadTasks();
  }

  loadTasks = () =>{
        
    API.getProjectTask(this.props.projectId)
    .then(res => {
        const todoTasks = res.data.filter(task => task.status === "To Do");
        const doingTasks = res.data.filter(task => task.status === "Doing");
        const doneTasks = res.data.filter(task => task.status === "Done");

        this.setState({ todoTasks, doingTasks, doneTasks })
    }).catch(err => {
        console.log(err)
    });
  }

  loadname =() =>{
    API.getProject(this.props.projectId).then(res=>{
      this.setState({projectname:res.data.projectname});
    }).catch(err=>console.log(err));
  }

  reloadComponent = () => {
    this.setState({
      refresh: !this.state.refresh
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  newTask = (taskListId) => {
    this.setState({
      [`newTask${taskListId}`]: !this.state[`newTask${taskListId}`]
    });
  }

  getTaskStatus = taskListId => {
    switch(taskListId){
      case "1":
        return "To Do";
      case "2":
        return "Doing";
      case "3": 
        return "Done";
    }
  }

  submitTask = (event, taskListId) => {
    event.preventDefault();

    const status = this.getTaskStatus(taskListId);
    const taskname = this.state[`newTask${taskListId}Name`];
    
    API.saveTask({taskname, status, UserId: this.props.user.id, ProjectId: this.props.projectId})
    .then(data=>{
        this.setState({ [`newTask${taskListId}`]: !this.state[`newTask${taskListId}`] })
        this.loadTasks()
    })
    .catch(err=>{
        console.log(err)
    })
}

  render() {
    if(!this.props.loggedIn){
      return <Redirect to="/" />
    }
    
    return (
      <div>
        <h4> <strong>Project:{this.state.projectname}</strong></h4>
        <Wrapper>
          <Row>
          <Col>
            <TaskGroup
              tasks={this.state.todoTasks}
              projectId = {this.props.projectId}
              user = {this.props.user}
              header='To Do'
              newTask={this.newTask}
              isNewTask={this.state.newTask1}
              handleInputChange={this.handleInputChange}
              submitTask={this.submitTask}
              value={this.state.newTask1Name}
              loadTasks={this.loadTasks}
              id='1'/>              
          </Col>
          <Col>
            <TaskGroup 
              tasks={this.state.doingTasks}
              projectId = {this.props.projectId}
              user = {this.props.user}
              header='Doing'
              newTask={this.newTask}
              isNewTask={this.state.newTask2}
              handleInputChange={this.handleInputChange}
              submitTask={this.submitTask}
              value={this.state.newTask2Name}
              loadTasks={this.loadTasks}
              id="2"/>
          </Col>
          <Col>
            <TaskGroup 
              tasks={this.state.doneTasks}
              projectId = {this.props.projectId}
              user = {this.props.user}
              header='Done'
              newTask={this.newTask}
              isNewTask={this.state.newTask3}
              handleInputChange={this.handleInputChange}
              submitTask={this.submitTask}
              value={this.state.newTask3Name}
              loadTasks={this.loadTasks}
              id="3"/>
          </Col>
          </Row>
        </Wrapper>    
      </div>
    )
  }

}

export default ProjectPage;