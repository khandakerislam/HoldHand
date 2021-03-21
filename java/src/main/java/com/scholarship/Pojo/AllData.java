/**
 * 
 */
package com.scholarship.Pojo;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.scholarship.util.CleanupInputStreamResource;

/**
 * @author Devendra Gread
 *
 */
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class AllData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private User user;
	private Institution institution;
	private address add;
	private List<address> addList;
	private Scholarship scholarship;
	private List<Scholarship> scholarshipList;
	private Student student;
	private boolean status;
	private String msg;
	private List<User> ids;
	private byte[] imageBytes;

	// @Lob
	// private byte[] file;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Institution getInstitution() {
		return institution;
	}

	public void setInstitution(Institution institution) {
		this.institution = institution;
	}

	public address getAdd() {
		return add;
	}

	public void setAdd(address add) {
		this.add = add;
	}

	public Scholarship getScholarship() {
		return scholarship;
	}

	public void setScholarship(Scholarship scholarship) {
		this.scholarship = scholarship;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public List<address> getAddList() {
		return addList;
	}

	public void setAddList(List<address> addList) {
		this.addList = addList;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public List<Scholarship> getScholarshipList() {
		return scholarshipList;
	}

	public void setScholarshipList(List<Scholarship> scholarshipList) {
		this.scholarshipList = scholarshipList;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public List<User> getIds() {
		return ids;
	}

	public void setIds(List<User> ids) {
		this.ids = ids;
	}
	/*
	 * public byte[] getFile() { return file; } public void setFile(byte[] file) {
	 * this.file = file; }
	 */

	public byte[] getImageBytes() {
		return imageBytes;
	}

	public void setImageBytes(byte[] imageBytes) {
		this.imageBytes = imageBytes;
	}

	

}
