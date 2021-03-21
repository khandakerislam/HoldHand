/**
 * 
 */
package com.scholarship.JpaRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.Pojo.Student;

/**
 * @author 
 *
 */
public interface ScholarshipStudentRepo extends JpaRepository<Student, Integer> {

	Student findByUserId(int studentId);
	Student findByStudentId(int studentId);
}
