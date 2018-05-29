import React from 'react';

const styles = {
    
    input:{
        width:"50%",
        // textAlign:"center"
    }
  }

const Input = props => {
    return(
        <div className="form-group" >
            <input className="form-control" style={styles.input} {...props} />
        </div>
    );
}

export default Input;
