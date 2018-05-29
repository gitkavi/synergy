import axios from "axios";

export default {
  getAllUsers: () => axios.get('/auth'),

  getCurrentUser: function(){
    return axios.get("/auth/getUser");
  },
  
  signUp: (newUser) => {
    return axios.post("/auth/signup", newUser)
  },

  login: (user) => {
    return axios.post("/auth/login", user)
  },

  logout: () => {
    return axios.get("/auth/logout");
  },
  getAllProject: function(){
    return axios.get("/api/projects");
  },
  saveProject: function(projectData){
    console.log("SaveProject called");
    return axios.post("/api/projects",projectData);
  },
  getUserProject: function(id){
    return axios.get("api/userprojects/"+id);
  },
  getProject: function(id){
    return axios.get("/api/projects/"+id);
  },
  updateProject: function(id,projectData){
    return axios.put("/api/projects/"+id, projectData);
  },
  deleteProject: function(id){
    return axios.delete("/api/projects/"+id);
  },
  getAllTask: function(){
    return axios.get("/api/tasks");
  },
  getUserTask: function(id){
    return axios.get("/api/usertasks/"+id);
  },
  getProjectTask: function(id){
    return axios.get("/api/projecttasks/"+id)
  },
  saveTask: function(taskData){
    return axios.post("/api/tasks",taskData);
  },
  getTask: function(id){
    return axios.get("/api/tasks/"+id);
  },
  updateTask:function(id,taskData){
    return axios.put("/api/tasks/"+id, taskData);
  },
  deleteTask: function(id){
    return axios.delete("/api/tasks/"+id);
  },
  getAllComments: () => axios.get('/api/taskComments'),
  saveComment: commentData => axios.post('/api/taskComments', commentData),
  getTaskComments: id => axios.get('/api/taskComments/'+id)
}