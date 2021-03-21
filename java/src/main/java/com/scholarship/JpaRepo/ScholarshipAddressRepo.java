package com.scholarship.JpaRepo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scholarship.Pojo.address;

public interface ScholarshipAddressRepo extends JpaRepository<address, Integer> {
	
	List<address> findByUserIdAndStatus (int userId,boolean status);
	address findByAddressId(int addressId);
}
