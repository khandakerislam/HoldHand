/**
 * 
 */
package com.scholarship.Pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * @author Devendra Gread
 *
 */
@Entity
public class Faq implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name = "faqs_ques")
	private String faqsQues;
	@Column(name = "faqs_ans")
	private String faqsAns;
	@Column(name = "status")
	private boolean status;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFaqsQues() {
		return faqsQues;
	}
	public void setFaqsQues(String faqsQues) {
		this.faqsQues = faqsQues;
	}
	public String getFaqsAns() {
		return faqsAns;
	}
	public void setFaqsAns(String faqsAns) {
		this.faqsAns = faqsAns;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
	
}
