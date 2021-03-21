package com.scholarship.JpaRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.Pojo.Institution;

public interface ScholarshipInstituteRepo extends JpaRepository<Institution, Integer> {
	
	Institution findByAddressId(int addressId);
Institution findByInstitutionId(int institutionId);
}
