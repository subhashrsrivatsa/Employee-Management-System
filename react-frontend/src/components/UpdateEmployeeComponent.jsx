import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName:'',
            lastName:'',
            emailID:''
        }
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changeEmailIDHandler=this.changeEmailIDHandler.bind(this);
        this.updateEmployee=this.updateEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeByID(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({ firstName: employee.firstName,
                lastName: employee.lastName,
                emailID: employee.emailID });
        });
    }

    updateEmployee=(e)=>{
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailID: this.state.emailID};
        console.log('employee => '+JSON.stringify(employee));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
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
                            <h3 className="text-center">Update Employee</h3>
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
                                    <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
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

export default UpdateEmployeeComponent;