package com.scholarship.JpaRepo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.Pojo.Scholarship;

public interface ScholarshipScholarshipRepo extends JpaRepository<Scholarship, Integer>{
	
	//List<Scholarship> findByScholarshipId(int scholarshipId);
	List<Scholarship> findByStudentIdAndStatus(int studentid,boolean status);
	List<Scholarship> findByUserIdAndStatus(int userId,boolean status);
	Scholarship findByScholarshipId(int scholarshipId);
	//List<Scholarship> findDistinctByStudentIda();
	List<Scholarship> findByStudentIdAndYear(int studentid,int year);
	List<Scholarship> findByUserIdAndYearAndStatus(int userid,int year,boolean status);

	//@Query("SELECT DISTINCT student_id FROM scholarship WHERE YEAR = :year AND STATUS = :status")
	 List<Scholarship> findDistinctByYearAndStatus(int year, boolean status);
	
//	@Query("SELECT DISTINCT student_id FROM scholarship WHERE YEAR = :year AND STATUS = :status")
//	 List<Scholarship> findDistinctByStudentId(@Param("year") int year, @Param("status") boolean status);
}
