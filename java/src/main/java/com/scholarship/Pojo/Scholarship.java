/**
 * 
 */
package com.scholarship.Pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * @author 
 *
 */
@Entity
public class Scholarship {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "scholarship_id")
	private int scholarshipId;
	
	private  int year;
	
	@Column(name = "student_id")
	private int studentId;
	
	@Column(name = "sponsor_id")
	private int userId;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "last_update")
	private Date lastUpdate;

	private boolean status;
	
	

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public int getScholarshipId() {
		return scholarshipId;
	}

	public void setScholarshipId(int scholarshipId) {
		this.scholarshipId = scholarshipId;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getStudentId() {
		return studentId;
	}

	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	
}
