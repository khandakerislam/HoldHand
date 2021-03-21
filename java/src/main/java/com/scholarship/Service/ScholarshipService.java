/**
 * 
 */
package com.scholarship.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scholarship.JpaRepo.ScholarshipAddressRepo;
import com.scholarship.JpaRepo.ScholarshipContactRepo;
import com.scholarship.JpaRepo.ScholarshipFaqrepo;
import com.scholarship.JpaRepo.ScholarshipInstituteRepo;
import com.scholarship.JpaRepo.ScholarshipScholarshipRepo;
import com.scholarship.JpaRepo.ScholarshipStudentRepo;
import com.scholarship.JpaRepo.ScholarshipUserRepo;
import com.scholarship.Pojo.AllData;
import com.scholarship.Pojo.Contact;
import com.scholarship.Pojo.Faq;
import com.scholarship.Pojo.Institution;
import com.scholarship.Pojo.Scholarship;
import com.scholarship.Pojo.Student;
import com.scholarship.Pojo.User;
import com.scholarship.Pojo.address;
import com.scholarship.Pojo.data;
import com.scholarship.ServiceIntf.ScholarshipIntf;
import com.scholarship.util.emailWithHTMLTemplate;
import com.scholarship.util.properties;

/**
 * @author
 *
 */
@Service
public class ScholarshipService implements ScholarshipIntf {
	@Autowired
	ScholarshipFaqrepo scholarshipFaqrepo;
	@Autowired
	ScholarshipUserRepo scholarshipUserRepo;
	@Autowired
	ScholarshipContactRepo scholarshipContactRepo;
	@Autowired
	ScholarshipStudentRepo scholarshipStudentRepo;
	@Autowired
	ScholarshipInstituteRepo scholarshipInstituteRepo;
	@Autowired
	ScholarshipAddressRepo scholarshipAddressRepo;
	@Autowired
	ScholarshipScholarshipRepo scholarshipScholarshipRepo;

	@Override
	public data addFaqs(data dataObj) {
		data dt = new data();

		try {
			List<Faq> dtlist = dataObj.getFaqList();
			for (Faq faq : dtlist) {

				scholarshipFaqrepo.save(faq);
			}

			dtlist = scholarshipFaqrepo.findAll();
			dt.setFaqList(dtlist);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dt;
	}

	@Override
	public List<Faq> getFaqs() {
		List<Faq> dtlist = new ArrayList<>();
		try {
			dtlist = scholarshipFaqrepo.findAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dtlist;
	}

	/*
	 * @Override public data updateFaqs(data dataObj) { data dt = new data(); int id
	 * = 0; try { if (dataObj.getId() > 0) { data dts =
	 * scholarshipFaqrepo.save(dataObj); id = dts.getId(); dt =
	 * scholarshipFaqrepo.findById(id); } } catch (Exception e) {
	 * e.printStackTrace(); } return dt; }
	 */

	@Override
	public AllData login(User userObj) {
		AllData aldta = new AllData();
		try {
			User usr = scholarshipUserRepo.findByLoginidAndPasswordAndRole(userObj.getLoginid(), userObj.getPassword(),
					userObj.getRole());
			aldta.setUser(usr);

			if (usr != null) {
				if (usr.getRole().equalsIgnoreCase("Student")) {
					Student st = new Student();
					st = scholarshipStudentRepo.findByUserId(usr.getUserId());
					aldta.setStudent(st);

					List<address> addlist = scholarshipAddressRepo.findByUserIdAndStatus(usr.getUserId(), true);
					int addressid = 0;
					if (!addlist.isEmpty()) {
						for (address adds : addlist) {
							if (adds.getAddressType().equalsIgnoreCase("institutionAddress"))
								addressid = adds.getAddressId();
						}
						aldta.setAddList(addlist);
					}

					if (addressid > 0) {
						Institution inst = new Institution();
						inst = scholarshipInstituteRepo.findByAddressId(addressid);
						aldta.setInstitution(inst);
					}

					if (st != null) {
						List<Scholarship> sclorshiplist = scholarshipScholarshipRepo
								.findByStudentIdAndStatus(st.getStudentId(), true);
						if (!sclorshiplist.isEmpty()) {
							aldta.setScholarshipList(sclorshiplist);
						}
					}
					aldta.setStatus(true);
				}

				else if (usr.getRole().equalsIgnoreCase("Donor")) {
					List<Scholarship> sclorshiplist = scholarshipScholarshipRepo.findByUserIdAndStatus(usr.getUserId(),
							true);
					List<Scholarship> sclorshiplist1 = new ArrayList<>();

					if (!sclorshiplist.isEmpty()) {
						for (Scholarship scholarship : sclorshiplist) {
							Scholarship sc = new Scholarship();
							Student students = scholarshipStudentRepo.findByStudentId(scholarship.getStudentId());
							sc.setUserId(students.getUserId());
							sc.setStudentId(scholarship.getStudentId());
							sc.setScholarshipId(scholarship.getScholarshipId());
							sclorshiplist1.add(sc);
						}
					}
					aldta.setScholarshipList(sclorshiplist1);
					aldta.setStatus(true);
				}

				else if ((usr.getRole().equalsIgnoreCase("ADMIN")) || (usr.getRole().equalsIgnoreCase("SUPERADMIN"))) {
					if (usr.isStatus()) {
						List<Scholarship> sclorshiplist = scholarshipScholarshipRepo
								.findByUserIdAndStatus(usr.getUserId(), true);
						List<Scholarship> sclorshiplist1 = new ArrayList<>();

						if (!sclorshiplist.isEmpty()) {
							for (Scholarship scholarship : sclorshiplist) {
								Scholarship sc = new Scholarship();
								Student students = scholarshipStudentRepo.findByStudentId(scholarship.getStudentId());
								sc.setUserId(students.getUserId());
								sc.setStudentId(scholarship.getStudentId());
								sc.setScholarshipId(scholarship.getScholarshipId());
								sclorshiplist1.add(sc);
							}
						}
						aldta.setScholarshipList(sclorshiplist1);
						aldta.setStatus(true);
					} else {
						aldta.setStatus(false);
						aldta.setMsg("Admin is not active");
					}
				} else {
					aldta.setStatus(false);
				}

			} else {
				aldta.setStatus(false);
				aldta.setMsg("User Not available");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return aldta;
	}

	//// save student
	@Override
	public AllData saveStudent(AllData allData) {
		AllData datas = new AllData();
		try {
			/*
			 * User exist =
			 * scholarshipUserRepo.findByLoginidAndStatus(allData.getUser().getLoginid(),
			 * true); if (exist == null) {
			 */
				Date dat = new Date();
				User usr = allData.getUser();
				usr.setLastUpdate(dat);
				usr.setStatus(true);
				User us = scholarshipUserRepo.save(usr);

				List<address> addList = allData.getAddList();
				int addressid = 0;
				for (address add : addList) {
					add.setLastUpdate(dat);
					add.setUserId(us.getUserId());
					add.setStatus(true);
					address addr = scholarshipAddressRepo.save(add);

					if (add.getAddressType().equalsIgnoreCase("institutionAddress"))
						;
					addressid = addr.getAddressId();
				}

				Institution inst = allData.getInstitution();
				inst.setLastUpdate(dat);
				inst.setAddressId(addressid);
				inst.setStatus(true);
				Institution ins = scholarshipInstituteRepo.save(inst);

				Student st = allData.getStudent();
				st.setLastUpdate(dat);
				st.setUserId(us.getUserId());
				st.setInstitutionId(ins.getAddressId());
				Student stu = scholarshipStudentRepo.save(st);

				List<Scholarship> schloarshipList = allData.getScholarshipList();
				if (!schloarshipList.isEmpty()) {
					for (Scholarship scholarship : schloarshipList) {
						scholarship.setStatus(true);
						scholarship.setYear(dat.getYear() + 1900);
						scholarship.setStudentId(stu.getStudentId());
						scholarship.setLastUpdate(dat);
						scholarship.setUserId(scholarship.getUserId());
						scholarshipScholarshipRepo.save(scholarship);
					}
				}
				datas.setStatus(true);
				datas.setMsg("Data Inserted");
			/*} else {
				datas.setStatus(false);
				datas.setMsg("Email Already exist");
			}*/
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}

////update student
	@Override
	public AllData updateStudent(AllData allData) {
		AllData datas = new AllData();
		try {

			// User usr = scholarshipUserRepo.findByUserId(allData.getUser().getUserId());
			User usr = allData.getUser();
			Date dat = new Date();
			System.out.println(dat);
			usr.setLastUpdate(dat);
			usr.setStatus(true);
			User us = scholarshipUserRepo.save(usr);

			List<address> addList = allData.getAddList();
			int addressid = 0;
			for (address add : addList) {
				// add = scholarshipAddressRepo.findByAddressId(add.getAddressId());
				if (add.getAddressId() > 0) {
					add.setAddressId(add.getAddressId());
				}
				add.setLastUpdate(dat);
				add.setUserId(us.getUserId());
				add.setStatus(true);
				address addr = scholarshipAddressRepo.save(add);

				if (add.getAddressType().equalsIgnoreCase("institutionAddress"))
					;
				addressid = addr.getAddressId();
			}

			// Institution inst =
			// scholarshipInstituteRepo.findByInstitutionId(allData.getInstitution().getInstitutionId());
			Institution inst = allData.getInstitution();
			if (inst.getInstitutionId() > 0)
				inst.setInstitutionId(inst.getInstitutionId());
			inst.setLastUpdate(dat);
			inst.setAddressId(addressid);
			Institution ins = scholarshipInstituteRepo.save(inst);

			// Student st =
			// scholarshipStudentRepo.findByStudentId(allData.getStudent().getStudentId());
			Student st = allData.getStudent();

			if (allData.getStudent().getStudentId() > 0) {
				st.setStudentId(allData.getStudent().getStudentId());
			}
			st.setLastUpdate(dat);
			st.setUserId(us.getUserId());
			st.setInstitutionId(ins.getAddressId());
			Student stu = scholarshipStudentRepo.save(st);

			int year = dat.getYear() + 1900;
			/// all deactivate
			List<Scholarship> schloarshipLists = scholarshipScholarshipRepo
					.findByStudentIdAndYear(allData.getStudent().getStudentId(), year);
			if (!schloarshipLists.isEmpty()) {
				for (Scholarship scholarship : schloarshipLists) {
					// scholarship =
					// scholarshipScholarshipRepo.findByScholarshipId(scholarship.getScholarshipId());
					scholarship.setStatus(false);
					scholarship.setLastUpdate(dat);
					scholarshipScholarshipRepo.save(scholarship);
				}
			}

			List<Scholarship> schloarshipList = allData.getScholarshipList();
			if (!schloarshipList.isEmpty()) {
				for (Scholarship scholarship : schloarshipList) {

					// Scholarship scholarshipp =
					// scholarshipScholarshipRepo.findByScholarshipId(scholarship.getScholarshipId());
					Scholarship scholarshipp = scholarship;

					if (scholarshipp.getScholarshipId() > 0) {
						scholarship.setScholarshipId(scholarshipp.getScholarshipId());
						scholarship.setYear(dat.getYear() + 1900);
						scholarship.setStudentId(stu.getStudentId());
						scholarship.setLastUpdate(dat);
						scholarship.setStatus(true);
						scholarship.setUserId(scholarship.getUserId());
						scholarshipScholarshipRepo.save(scholarship);
					} else {
						scholarship.setYear(dat.getYear() + 1900);
						scholarship.setStudentId(stu.getStudentId());
						scholarship.setLastUpdate(dat);
						scholarship.setStatus(true);
						scholarship.setUserId(scholarship.getUserId());
						scholarshipScholarshipRepo.save(scholarship);
					}

				}
			}
			datas.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}

////save Sponsor
	@Override
	public AllData saveSponsor(AllData allData) {
		AllData datas = new AllData();
		try {
			User exist = scholarshipUserRepo.findByLoginidAndStatus(allData.getUser().getLoginid(), true);
			if (exist == null) {
				Date dat = new Date();

				User usr = allData.getUser();
				usr.setStatus(true);
				usr.setLastUpdate(dat);
				User us = scholarshipUserRepo.save(usr);

				List<Scholarship> schloarshipList = allData.getScholarshipList();
				if (!schloarshipList.isEmpty()) {
					for (Scholarship scholarship : schloarshipList) {
						Student stun = scholarshipStudentRepo.findByUserId(scholarship.getUserId());
						scholarship.setStatus(true);
						scholarship.setYear(dat.getYear() + 1900);
						scholarship.setStudentId(stun.getStudentId());
						scholarship.setLastUpdate(dat);
						scholarship.setUserId(us.getUserId());
						scholarshipScholarshipRepo.save(scholarship);
					}
				}
				datas.setStatus(true);
				datas.setMsg("Data Inserted");
			} else {
				datas.setStatus(false);
				datas.setMsg("Email Already exist");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}

////update sponsor
	@Override
	public AllData updateSponsor(AllData allData) {
		AllData datas = new AllData();
		try {
			Date dat = new Date();

			// User usr = scholarshipUserRepo.findByUserId(allData.getUser().getUserId());
			User usr = allData.getUser();
			usr.setLastUpdate(dat);
			User us = scholarshipUserRepo.save(usr);

			/// all deactivate
			int year = dat.getYear() + 1900;
			/// all deactivate
			List<Scholarship> schloarshipLists = scholarshipScholarshipRepo
					.findByUserIdAndYearAndStatus(usr.getUserId(), year, true);
			if (!schloarshipLists.isEmpty()) {
				for (Scholarship scholarship : schloarshipLists) {

					scholarship.setStatus(false);
					scholarship.setLastUpdate(dat);
					scholarshipScholarshipRepo.save(scholarship);
				}
			}

			List<Scholarship> schloarshipList = allData.getScholarshipList();
			if (!schloarshipList.isEmpty()) {
				for (Scholarship scholarship : schloarshipList) {

					if (scholarship.getScholarshipId() > 0) {
						Scholarship scholarships = new Scholarship();
						Student stun = scholarshipStudentRepo.findByUserId(scholarship.getUserId());
						scholarships.setScholarshipId(scholarship.getScholarshipId());
						scholarships.setYear(dat.getYear() + 1900);
						scholarships.setStudentId(stun.getStudentId());
						scholarships.setLastUpdate(dat);
						scholarships.setStatus(true);
						scholarships.setUserId(usr.getUserId());
						scholarshipScholarshipRepo.save(scholarships);
					} else {
						Scholarship scholarships = new Scholarship();
						Student stun = scholarshipStudentRepo.findByUserId(scholarship.getUserId());
						scholarships.setYear(dat.getYear() + 1900);
						scholarships.setStudentId(stun.getStudentId());
						scholarships.setLastUpdate(dat);
						scholarships.setStatus(true);
						scholarships.setUserId(usr.getUserId());
						scholarshipScholarshipRepo.save(scholarships);
					}
				}
			}
			datas.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}

////save admin
	@Override
	public AllData saveAdmin(AllData allData) {
		AllData datas = new AllData();
		try {
			User exist = scholarshipUserRepo.findByLoginidAndStatus(allData.getUser().getLoginid(), true);
			if (exist == null) {
				Date dat = new Date();

				User usr = allData.getUser();
				usr.setLastUpdate(dat);
				usr.setStatus(false);
				User us = scholarshipUserRepo.save(usr);

				List<Scholarship> schloarshipList = allData.getScholarshipList();
				if (!schloarshipList.isEmpty()) {
					for (Scholarship scholarship : schloarshipList) {
						Student stun = scholarshipStudentRepo.findByUserId(scholarship.getUserId());
						scholarship.setStatus(true);
						scholarship.setYear(dat.getYear() + 1900);
						scholarship.setStudentId(stun.getStudentId());
						scholarship.setLastUpdate(dat);
						scholarship.setUserId(us.getUserId());
						scholarshipScholarshipRepo.save(scholarship);
					}
				}
				datas.setStatus(true);
				datas.setMsg("Data Inserted");
			} else {
				datas.setStatus(false);
				datas.setMsg("Email Already exist");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}

////update admin
	@Override
	public AllData updateAdmin(AllData allData) {
		AllData datas = new AllData();
		try {
			Date dat = new Date();

			User usr = allData.getUser();
			usr.setLastUpdate(dat);
			usr.setStatus(true);
			User us = scholarshipUserRepo.save(usr);

			int year = dat.getYear() + 1900;
			/// all deactivate
			List<Scholarship> schloarshipLists = scholarshipScholarshipRepo
					.findByUserIdAndYearAndStatus(usr.getUserId(), year, true);
			if (!schloarshipLists.isEmpty()) {
				for (Scholarship scholarship : schloarshipLists) {

					scholarship.setStatus(false);
					scholarship.setLastUpdate(dat);
					scholarshipScholarshipRepo.save(scholarship);
				}
			}

			List<Scholarship> schloarshipList = allData.getScholarshipList();
			if (!schloarshipList.isEmpty()) {
				for (Scholarship scholarship : schloarshipList) {

					if (scholarship.getScholarshipId() > 0) {
						Scholarship scholarships = new Scholarship();
						Student stun = scholarshipStudentRepo.findByUserId(scholarship.getUserId());
						scholarships.setScholarshipId(scholarship.getScholarshipId());
						scholarships.setYear(dat.getYear() + 1900);
						scholarships.setStudentId(stun.getStudentId());
						scholarships.setLastUpdate(dat);
						scholarships.setStatus(true);
						scholarships.setUserId(usr.getUserId());
						scholarshipScholarshipRepo.save(scholarships);
					} else {
						Scholarship scholarships = new Scholarship();
						Student stun = scholarshipStudentRepo.findByUserId(scholarship.getUserId());
						scholarships.setYear(dat.getYear() + 1900);
						scholarships.setStudentId(stun.getStudentId());
						scholarships.setLastUpdate(dat);
						scholarships.setStatus(true);
						scholarships.setUserId(usr.getUserId());
						scholarshipScholarshipRepo.save(scholarships);
					}

				}
			}
			datas.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}

	@Override
	public Contact saveContactUs(Contact contactObj) {
		Contact contact = new Contact();
		try {
			Date dat = new Date();
			contactObj.setStatus(true);
			contactObj.setQuerydate(dat);
			contact = scholarshipContactRepo.save(contactObj);

			String path = properties.path;
			File file = new File(path);
			String absolutePath = file.getAbsolutePath();
			
			
			
			if(contact!=null)
			{
				
				Map<String, String> map = new HashMap<String, String>();
				map.put("firstname", contact.getName());
				map.put("lastname", "");
				map.put("template", absolutePath+'\\'+properties.Contact);
				map.put("recipient_mail_id", contact.getEmail());
				map.put("phone", contact.getContactnumber());
				map.put("location", contact.getLocation());
				map.put("subject", "Contact Hand Hold");
				new emailWithHTMLTemplate().sendMailInJava(map);
			
				
				String adminid=properties.adminId;
				
				Map<String, String> maps = new HashMap<String, String>();
				maps.put("firstname", contact.getName());
				maps.put("lastname", "");
				maps.put("template", absolutePath+'\\'+properties.ContactAdmin);
				maps.put("recipient_mail_id", adminid);
				maps.put("phone", contact.getContactnumber());
				maps.put("location", contact.getLocation());
				maps.put("subject", "Hand Hold New Query");
				maps.put("query", contact.getQuery());
				maps.put("useremail",contact.getEmail());
				new emailWithHTMLTemplate().sendMailInJava(maps);
				
				
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return contact;
	}

	@Override
	public List<User> studentList() {
		List<User> stuList = new ArrayList<>();
		try {
			stuList = scholarshipUserRepo.findByRole("Student");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return stuList;
	}

	@Override
	public List<User> sponsorList() {
		List<User> usrLists = new ArrayList<>();
		try {
			usrLists = scholarshipUserRepo.findByRole("Donor");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return usrLists;
	}

	@Override
	public User checkEmailExist(String email) {
		User us = new User();
		try {
			us = scholarshipUserRepo.findByLoginidAndStatus(email, true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return us;
	}

	@Override
	public List<User> awaitingApprovlList(User user) {
		List<User> list = new ArrayList<>();
		try {
			if (user.getRole() != null && user.getLoginid() == null) {
				list = scholarshipUserRepo.findByRole(user.getRole());
			} else if (user.getLoginid() != null && user.getRole() == null) {
				list = scholarshipUserRepo.findByLoginid(user.getLoginid());
			} else if (user.getRole() != null && user.getLoginid() != null) {
				list = scholarshipUserRepo.findByRoleAndLoginid(user.getRole(), user.getLoginid());
			} else {

				list = scholarshipUserRepo.findAll();

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public boolean approveAdminId(List<User> ids) {
		try {
			for (User usrs : ids) {
				User usr = scholarshipUserRepo.findByUserId(usrs.getUserId());
				usr.setStatus(true);
				scholarshipUserRepo.save(usr);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	@Override
	public List<User> studentListByYear(int year) {
		List<User> userList = new ArrayList<User>();
		try {
			// List<Scholarship> ids=
			// scholarshipScholarshipRepo.findDistinctByStudentId(year,true);
			List<Scholarship> ids = scholarshipScholarshipRepo.findDistinctByYearAndStatus(year, true);

			List<Student> stlist = new ArrayList<>();
			for (Scholarship sp : ids) {
				Student stu = scholarshipStudentRepo.findByStudentId(sp.getStudentId());
				stlist.add(stu);
			}
			for (Student student : stlist) {
				User usr = scholarshipUserRepo.findByUserId(student.getUserId());
				userList.add(usr);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return userList;
	}

	//// find by passing only login id
	@Override
	public AllData findbyAdminUser(User userObj) {
		AllData aldta = new AllData();
		try {
			User usr = scholarshipUserRepo.findByLoginidAndStatus(userObj.getLoginid(), true);
			aldta.setUser(usr);

			if (usr != null) {
				if (usr.getRole().equalsIgnoreCase("Student")) {
					Student st = new Student();
					st = scholarshipStudentRepo.findByUserId(usr.getUserId());
					aldta.setStudent(st);

					List<address> addlist = scholarshipAddressRepo.findByUserIdAndStatus(usr.getUserId(), true);
					int addressid = 0;
					if (!addlist.isEmpty()) {
						for (address adds : addlist) {
							if (adds.getAddressType().equalsIgnoreCase("institutionAddress"))
								addressid = adds.getAddressId();
						}
						aldta.setAddList(addlist);
					}

					Institution inst = new Institution();
					inst = scholarshipInstituteRepo.findByAddressId(addressid);
					aldta.setInstitution(inst);

					List<Scholarship> sclorshiplist = scholarshipScholarshipRepo
							.findByStudentIdAndStatus(st.getStudentId(), true);
					aldta.setScholarshipList(sclorshiplist);
					aldta.setStatus(true);
				}

				else if (usr.getRole().equalsIgnoreCase("Donor")) {
					List<Scholarship> sclorshiplist = scholarshipScholarshipRepo.findByUserIdAndStatus(usr.getUserId(),
							true);
					List<Scholarship> sclorshiplist1 = new ArrayList<>();

					for (Scholarship scholarship : sclorshiplist) {
						Scholarship sc = new Scholarship();
						Student students = scholarshipStudentRepo.findByStudentId(scholarship.getStudentId());
						sc.setUserId(students.getUserId());
						sc.setStudentId(scholarship.getStudentId());
						sc.setScholarshipId(scholarship.getScholarshipId());
						sclorshiplist1.add(sc);
					}
					aldta.setScholarshipList(sclorshiplist1);
					aldta.setStatus(true);
				}

				else if ((usr.getRole().equalsIgnoreCase("ADMIN")) || (usr.getRole().equalsIgnoreCase("SUPERADMIN"))) {
					if (usr.isStatus()) {
						List<Scholarship> sclorshiplist = scholarshipScholarshipRepo
								.findByUserIdAndStatus(usr.getUserId(), true);
						List<Scholarship> sclorshiplist1 = new ArrayList<>();

						for (Scholarship scholarship : sclorshiplist) {
							Scholarship sc = new Scholarship();
							Student students = scholarshipStudentRepo.findByStudentId(scholarship.getStudentId());
							sc.setUserId(students.getUserId());
							sc.setStudentId(scholarship.getStudentId());
							sc.setScholarshipId(scholarship.getScholarshipId());
							sclorshiplist1.add(sc);
						}
						aldta.setScholarshipList(sclorshiplist1);
						aldta.setStatus(true);
					} else {
						aldta.setStatus(false);
						aldta.setMsg("Admin is not active");
					}
				} else {
					aldta.setStatus(false);
				}

			} else {
				aldta.setStatus(false);
				aldta.setMsg("User Not available");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return aldta;
	}
	
	
////save student
	@Override
	public AllData saveMini(AllData allData) {
		AllData datas = new AllData();
		try {
			User exist = scholarshipUserRepo.findByLoginidAndStatus(allData.getUser().getLoginid(), true);
			if (exist == null) {
				Date dat = new Date();
				User usr = allData.getUser();
				usr.setLastUpdate(dat);
				usr.setStatus(true);
				User us = scholarshipUserRepo.save(usr);
				datas.setStatus(true);
				datas.setMsg("Data Inserted");

				String path = properties.path;
				File file = new File(path);
				String absolutePath = file.getAbsolutePath();
				
				
				
				if(us!=null)
				{
					
					Map<String, String> map = new HashMap<String, String>();
					map.put("firstname","");
					map.put("lastname", "");
					map.put("template", absolutePath+'\\'+properties.register);
					map.put("recipient_mail_id", us.getLoginid());
					map.put("phone", "");
					map.put("Password", us.getPassword());
					map.put("subject", "Hold Hand Credientials");
					map.put("role", us.getRole());
					new emailWithHTMLTemplate().sendMailInJava(map);
					
				}
				
				
			} else {
				datas.setStatus(false);
				datas.setMsg("Email Already exist");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}

	
	
	
	
}