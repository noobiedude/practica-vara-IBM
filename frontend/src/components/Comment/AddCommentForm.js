import "../Inspect/Inspect.scss";
import React from "react";
 function getId(){
   
    
 }

class AddCommentForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
     let x=window.location.pathname.split('/')[3];
      fetch('http://localhost:3000/posts/'+x+'/comments/', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(this.state.value)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
                 <input type="text" value={this.state.value} placeholder="Add a comment" onChange={this.handleChange}/>
                
                <div className="submit-button">
               <button type="submit" className="glow-on-hover">Add</button>
               </div>
        
             </form>
      );
    }
  }

// class AddCommentForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { name: '' };
//     }
  
//     handleChange = (event) => {
//       this.setState({name: event.target.value});
//     }
  
//     handleSubmit = (event) => {
//       alert('A form was submitted: ' + this.state);
  
//       fetch('http://localhost:3000/:id/comments/', {
//           method: 'POST',
//           // We convert the React state to JSON and send it as the POST body
//           body: JSON.stringify(this.state)
//         }).then(function(response) {
//           console.log(response)
//           return response.json();
//         });
  
//       event.preventDefault();
//   }
  
//     render() {
//       return (
//        
//       );
//     }
//   }

  export default AddCommentForm;