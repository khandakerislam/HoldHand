/**
 * 
 */
package com.scholarship.JpaRepo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.Pojo.User;

/**
 * @author 
 *
 */
public interface ScholarshipUserRepo extends JpaRepository<User, Integer>{

	User findByLoginidAndPasswordAndRole(String loginid,String password,String role);
	User findByUserId(int userId);
	List<User> findByRole(String role);
	User findByLoginidAndStatus(String loginid,boolean status);
	List<User> findByStatus(boolean status);
	List<User> findByLoginid(String loginid);
	List<User> findByRoleAndLoginid(String role,String loginid);
	
}
