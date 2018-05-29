import React from 'react';
// import { Link } from 'react-router-dom';
import "./Content1.css";

const Content1 = (props) => {
    return (

        <div className="download bg-primary text-center" id="download">
        <div className="container">
          <div className="row">
            <div className="col-12 mx-auto">
              <h2 className="section-heading">{props.header}</h2>
              {props.children}
            </div>
          </div>
        </div>
      </div>
  
);
}

export default Content1;