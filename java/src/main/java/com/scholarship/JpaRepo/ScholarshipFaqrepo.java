package com.scholarship.JpaRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.Pojo.Faq;


public interface ScholarshipFaqrepo extends  JpaRepository<Faq, Integer>{

	public Faq findById(int id);
}
