/**
 * 
 */
package com.subhash.employee.model.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.subhash.employee.exception.ResourceNotFoundException;
import com.subhash.employee.model.Employee;
import com.subhash.employee.repository.EmployeeRepository;

/**
 * @author Subhash
 *
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	// get all the employees
	@GetMapping("/employees")
	public List<Employee> getAlEmployees(){
		return employeeRepository.findAll();
	}
	
	// create employee REST API
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	// get employee by id REST API
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeByID(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee does not exists with the id "+id));
		return ResponseEntity.ok(employee);
	}
	
	// update Employee REST API
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,@RequestBody Employee employeeDetails){
		Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee does not exists with the id "+id));
		
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmailID(employeeDetails.getEmailID());
		
		Employee updaEmployee = employeeRepository.save(employee);
		
		return ResponseEntity.ok(updaEmployee);
	}
	
	// delete Employee REST API
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee does not exists with the id "+id));
		
		employeeRepository.delete(employee);
		Map<String, Boolean> respose = new HashMap<>();
		respose.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(respose);
		
	}

}
