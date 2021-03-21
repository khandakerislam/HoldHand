package com.scholarship.JpaRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.Pojo.Contact;

public interface ScholarshipContactRepo extends  JpaRepository<Contact, Integer>{

	

}
