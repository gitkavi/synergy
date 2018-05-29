import React from 'react';
import "./MainContentDetails.css";
import { Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

const styles={
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "10px",
    width:"300px",
    height:"500px",
    
  },
  
  contentimg:{
    width:"300px",
    height:"300px"
  }
}


const MainContentDetails = () => {
    return (
  
      <div className="container">
        <div className="row">
          <div className="col-12 hdrcol">
          <div className="contentheader">
              <h1><strong>The Synergy - Project Manager helps you manager all phases of your coding project from your "idea" to your final presentation.</strong></h1>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>


        <div className="row contentrow">

        <div style={styles.grid}>
          <div className="col-4 imgcol">
            <Card className="infocards">
              <CardImage className="contentimg" src={require("../../img/whiteboard.jpg")}  /> 
                <CardBody>
                  <CardTitle>Whiteboard</CardTitle>
                  <CardText>Use the whiteboard to develop your team's ideas and design your project</CardText>
                </CardBody>
            </Card>
          </div>
          <div className="col-4 imgcol">
          <Card className="infocards">
              <CardImage className="contentimg" src={require("../../img/logos.jpg")}  /> 
                <CardBody>
                  <CardTitle>Manage You Project</CardTitle>
                  <CardText>Manage all aspects of your project by adding team members, assigning tasks, etc. </CardText>
                </CardBody>
            </Card>
          </div>

          <div className="col-4 imgcol">
          <Card className="infocards">
              <CardImage className="contentimg" src={require("../../img/speech.jpg")}  /> 
                <CardBody>
                  <CardTitle>Presentation</CardTitle>
                  <CardText>Learn all the tricks to give your project an outstanding presentation</CardText>
                </CardBody>
            </Card>
          </div>

          </div>
          </div>
      </div>
         
    )
}

export default MainContentDetails;


