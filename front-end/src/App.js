import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      theClass:[]
    }
    //make sure addStudent uses the current "this"
    this.addStudent = this.addStudent.bind(this)
  }
  //runs AFTER the first render
    componentDidMount() {
      //get JSON request to localhost:3000... that's where Express
      $.getJSON('http://localhost:3000/getStudents', (studentsFromApi)=>{
        //log the JSON response from Express
        console.log(studentsFromApi)
        this.setState({
          theClass: studentsFromApi
        })
      });
      // this.setState({
        //update the state...this will cause a re-render
        // theClass:[1,2,3,4]
      // })
      addStudent(event){
        var studentToAdd = event.target.parentNode.childNodes[0].value;
        //var studentToAdd = document.getElementById('newStudent')
        // console.log(studentToAdd);
        //this is a post request, so we cant use $.getJson, only does get
        //$.ajax- expects an object that tells it what to send(data), where to send it (url),and how to send it ( method)
        //$.ajax-is a promise which has a "done " method that wll run when ajax is back. It gets a param of whatever JSON was returned by the  API request inside that function. We update Ract(theClass) which .... a re-render, which updates the list because we are mapping...
        $.ajax({
          method:"POST",
          url:"http://localhost:3000/addStudent",
          data: {name: studentToAdd}
        }).done((studentsArray)=>{
          this.setState({
            theClass:studentsArray
          })
        })
      }
      
  
  render() {
    //create an array to dump into our return. It will contain  components or html tags.
    var theClassArray = [];
    //loop through our state var. the first time through it will be
    this.state.theClass.map((mightyDuck,index)=>{
      //loop through our state v
      theClassArray.push(<li key ={index}>{mightyDuck.name}</li>)
    });
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="add-box">
          <input type="text" id="newStudent" />
          <button onClick={this.addStudent}>Add Student</button>
        </div>
        <p>
        {theClassArray}
        </p>
      </div>
    );
  }
}

export default App;
