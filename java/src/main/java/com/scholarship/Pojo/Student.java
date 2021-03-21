/**
 * 
 */
package com.scholarship.Pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * @author Devendra Gread
 *
 */
@Entity
public class Student implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "student_id")
	private int studentId;
	
	@Column(name = "user_id")
	private int userId;
	
	/*
	 * @Column(name = "sponsor_id") private int sponsorId;
	 */
	
	@Column(name = "institution_id")
	private int institutionId;
	
	@Column(name = "faculty_name")
	private String facultyName;
	
	@Column(name = "father_name")
	private String fatherName;
	
	@Column(name = "father_profession")
	private String fatherProfession;
	
	@Column(name = "parent_phone")
	private String parentPhone;
	
	@Column(name = "mother_name")
	private String motherName;
	
	@Column(name = "mother_profession")
	private String motherProfession;
	
	
	@Temporal(TemporalType.DATE)
	@Column(name = "last_update")
	private Date lastUpdate;

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

	/*
	 * public int getSponsorId() { return sponsorId; }
	 * 
	 * public void setSponsorId(int sponsorId) { this.sponsorId = sponsorId; }
	 */

	public int getInstitutionId() {
		return institutionId;
	}

	public void setInstitutionId(int institutionId) {
		this.institutionId = institutionId;
	}

	public String getFacultyName() {
		return facultyName;
	}

	public void setFacultyName(String facultyName) {
		this.facultyName = facultyName;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public String getFatherProfession() {
		return fatherProfession;
	}

	public void setFatherProfession(String fatherProfession) {
		this.fatherProfession = fatherProfession;
	}

	public String getParentPhone() {
		return parentPhone;
	}

	public void setParentPhone(String parentPhone) {
		this.parentPhone = parentPhone;
	}

	public String getMotherName() {
		return motherName;
	}

	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}

	public String getMotherProfession() {
		return motherProfession;
	}

	public void setMotherProfession(String motherProfession) {
		this.motherProfession = motherProfession;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	/*
	 * public String getInstitueName() { return institueName; }
	 * 
	 * public void setInstitueName(String institueName) { this.institueName =
	 * institueName; }
	 */
	
	
}
