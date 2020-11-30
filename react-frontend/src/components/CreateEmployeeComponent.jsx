import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            firstName:'',
            lastName:'',
            emailID:''
        }
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changeEmailIDHandler=this.changeEmailIDHandler.bind(this);
        this.saveEmployee=this.saveEmployee.bind(this);
    }

    saveEmployee=(e)=>{
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailID: this.state.emailID};
        console.log('employee => '+JSON.stringify(employee));

        EmployeeService.createEmpoloyee(employee).then(res => {
            this.props.history.push('/employees')
        });
    }
    changeFirstNameHandler=(event)=>{
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler=(event)=>{
        this.setState({lastName: event.target.value});
    }

    changeEmailIDHandler=(event)=>{
        this.setState({emailID: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Employee</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label>First Name</label>
                                        <input placeholder="first name" name="firstName" className="form-control" 
                                        value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className = "form-group">
                                        <label>Last Name</label>
                                        <input placeholder="last name" name="lastName" className="form-control" 
                                        value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className = "form-group">
                                        <label>Email Address</label>
                                        <input placeholder="email id" name="emailID" className="form-control" 
                                        value={this.state.emailID} onChange={this.changeEmailIDHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;