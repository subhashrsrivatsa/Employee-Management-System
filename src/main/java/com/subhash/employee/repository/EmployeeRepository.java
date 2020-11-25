/**
 * 
 */
package com.subhash.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.subhash.employee.model.Employee;

/**
 * @author Subhash
 *
 */

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
