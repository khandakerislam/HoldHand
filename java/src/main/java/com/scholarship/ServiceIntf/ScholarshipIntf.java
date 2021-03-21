/**
 * 
 */
package com.scholarship.ServiceIntf;

import java.util.List;

import com.scholarship.Pojo.AllData;
import com.scholarship.Pojo.Contact;
import com.scholarship.Pojo.Faq;
import com.scholarship.Pojo.Scholarship;
import com.scholarship.Pojo.User;
import com.scholarship.Pojo.data;

/**
 * @author 
 *
 */
public interface ScholarshipIntf {

	public data addFaqs(data dataObj) ;
	public List<Faq> getFaqs();
	//public data updateFaqs(data dataObj);
	public AllData login(User userObj);
	public AllData saveStudent(AllData allData);
	public AllData updateStudent(AllData allData);
	public AllData saveAdmin(AllData allData) ;
	public AllData updateAdmin(AllData allData);
	public AllData saveSponsor(AllData allData) ;
	public AllData updateSponsor(AllData allData);
	public Contact saveContactUs(Contact contactObj);
	public List<User> studentList();
	public List<User> sponsorList();
	public User checkEmailExist(String email);
	public List<User> awaitingApprovlList(User user);
	public boolean approveAdminId(List<User> ids);
	public List<User> studentListByYear(int year);
	public AllData findbyAdminUser(User userObj);
	public AllData saveMini(AllData allData);
}
