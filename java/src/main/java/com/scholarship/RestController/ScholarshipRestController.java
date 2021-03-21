/**
 * 
 */
package com.scholarship.RestController;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.codec.binary.Base64;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.scholarship.Pojo.AllData;
import com.scholarship.Pojo.Contact;
import com.scholarship.Pojo.Faq;
import com.scholarship.Pojo.Scholarship;
import com.scholarship.Pojo.User;
import com.scholarship.Pojo.data;
import com.scholarship.ServiceIntf.ScholarshipIntf;
import com.scholarship.util.CleanupInputStreamResource;
import com.scholarship.util.properties;

/**
 * @author
 *
 */
@RestController
// @CrossOrigin(origins = "https://bushra2020.com.s3-website-us-east-1.amazonaws.com")
// @CrossOrigin(origins = "*")
@CrossOrigin(origins = "*")


public class ScholarshipRestController {
	static Logger logger = LoggerFactory.getLogger(ScholarshipRestController.class);
	@Autowired
	ScholarshipIntf scIntf;

	@GetMapping(value="/", produces = MediaType.TEXT_PLAIN_VALUE)
	public String test() {
		return "This is Test page";
	}

	// save the details of FAQ
	@PostMapping(value = "/saveFAQs")
	public data savefaq(@RequestBody data dataobj) {
		data dt = scIntf.addFaqs(dataobj);
		return dt;
	}


	// get the details of FAQ
	@PostMapping(value = "/getFAQs")
	public List<Faq> getFaq(@RequestBody Faq dataobj) {
		List<Faq> obj = scIntf.getFaqs();
		return obj;
	}

	public AllData convertJsonStringtoMailTemplateObject(String jsonValue) {
		if (jsonValue != null) {
			try {
				final Gson gson = new GsonBuilder().create();
				return gson.fromJson(jsonValue, AllData.class);
			} catch (final Exception e) {
			}
		}
		return null;
	}

	@PostMapping(value = "/saveStudent")
	public ResponseEntity<Object> saveStudent(@RequestParam("multipartFiles") MultipartFile file,
			@RequestParam("allData") String allData) {
		try {
			AllData allDatas = convertJsonStringtoMailTemplateObject(allData);
			AllData obj = new AllData();
			File tempFile = convertMultipartFileToFile(file, allDatas.getUser().getLoginid());
			allDatas.getUser().setUserPhoto(file.getOriginalFilename());
			obj = scIntf.saveStudent(allDatas);
			return ResponseEntity.status(HttpStatus.OK).body(obj);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return null;
		// return obj;
	}

	@PostMapping(value = "/updateStudent")
	public ResponseEntity<Object> updateStudent(@RequestParam("multipartFiles") MultipartFile file,
			@RequestParam("allData") String allData) {
		AllData allDatas = convertJsonStringtoMailTemplateObject(allData);
		AllData obj = new AllData();
		File tempFile = convertMultipartFileToFile(file, allDatas.getUser().getLoginid());
		allDatas.getUser().setUserPhoto(file.getOriginalFilename());
		obj = scIntf.updateStudent(allDatas);
		return ResponseEntity.status(HttpStatus.OK).body(obj);
	}
	// @PostMapping(value = "/uploadimage")
	// @RequestMapping(value = "/uploadimage", headers = "content-type=multipart/*",
	// method = RequestMethod.POST)
	// public ResponseEntity<Object> uplaodImage(@RequestParam("multipartFiles")
	// MultipartFile file
	// ,@ModelAttribute final BaseUploadModel baseUploadModel
	// ) throws IOException {
	// System.out.println("Original Image Byte Size--------------- - " +
	// file.getBytes().length);

	// File tempFile = convertMultipartFileToFile(file);
	// return getFile(tempFile);

	// }

	public static File convertMultipartFileToFile(final MultipartFile file, String userLoginId) {
		
		//String imagePath = properties.imagempath + userLoginId + properties.imagearrow;
		String imagePath = "images";
		File filess = new File(imagePath);
		String absolutePath = filess.getAbsolutePath();
		
		//System.out.println("hi---------------------"+absolutePath);
		
		boolean flag = false;
		//System.out.println("+++++++++++++++"+absolutePath+'/'+userLoginId);
		final File convFile = new File(absolutePath+'/'+userLoginId);
		//System.out.println("-------------"+convFile);
		if (!convFile.exists()) {
			flag = convFile.mkdirs();
			if (!file.isEmpty()) {
				final File f = new File(absolutePath +'/'+userLoginId +  '/'+ file.getOriginalFilename());
				//System.out.println("------------------"+f);
				try (final FileOutputStream fos = new FileOutputStream(f)) {
					fos.write(file.getBytes());
					return convFile;
				} catch (final Exception e) {
					return null;
				}
			}
		} else {
			final File f = new File(absolutePath  +'/'+userLoginId +  '/' + file.getOriginalFilename());
			//System.out.println("********************"+f);
			try (final FileOutputStream fos = new FileOutputStream(f)) {
				fos.write(file.getBytes());
				return convFile;
			} catch (final Exception e) {
				return null;
			}
		}
		return convFile;
	}

	// public static File convertMultipartFileToFileTemp(final MultipartFile
	// file,String userLoginId) {
	// String imagePath = properties.imagempath+userLoginId;
	// boolean flag = false;
	// final File convFile = new File(imagePath + file.getOriginalFilename());
	// try (final FileOutputStream fos = new FileOutputStream(convFile)) {
	// fos.write(file.getBytes());
	// return convFile;
	// } catch (final Exception e) {
	// return null;
	// }
	// }

	@GetMapping("/getFile")
	public ResponseEntity<Object> getFile(@RequestParam("loginid") String loginid,
			@RequestParam("imageName") String imageName) throws IOException {

		String imagePath = properties.imagempath + loginid + properties.imagearrow + imageName;
		Path path = Paths.get(imagePath);
		File returnFile = path.toFile();
		return getFile(returnFile);
	}

	ResponseEntity<Object> getFile(File document) {
		final String mediaType = probeContentType(document.getAbsolutePath());
		CleanupInputStreamResource resource = null;
		try {
			resource = new CleanupInputStreamResource(document);
		} catch (final IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
		}
		return ResponseEntity.ok().header("Content-Disposition", "attachment; filename=\"" + document.getName() + "\"")
				.contentLength(document.length()).contentType(MediaType.parseMediaType(mediaType)).body(resource);
	}

	public static String probeContentType(final String filePath) {
		String mediaType = null;
		try {
			mediaType = Files.probeContentType(Paths.get(filePath));
		} catch (final IOException ioe) {
		}
		if (mediaType == null) {
			mediaType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
		}
		return mediaType;
	}

	@PostMapping(value = "/login")
	public AllData login(@RequestBody User user) throws FileNotFoundException {
		AllData obj = new AllData();
		obj = scIntf.login(user);
		
		if( obj.getUser().getLoginid()!=null)
		{
			
			String path = "images";
			File filess = new File(path);
			String absolutePath = filess.getAbsolutePath();
			
		final File convFile = new File(absolutePath+'/' + obj.getUser().getLoginid());
		if (convFile.exists())
				{
		       String imagePath = absolutePath+'/' + obj.getUser().getLoginid() +'/'+obj.getUser().getUserPhoto();
		       InputStream inputStream = null;
	           String imageString = null;
	           byte[] imageBytes=null;
	           ByteArrayOutputStream baos = new ByteArrayOutputStream();
	            try {
	               inputStream = new FileInputStream(imagePath);
	               byte[] buffer = new byte[1024];
	               baos = new ByteArrayOutputStream();
	               int bytesRead;
	                while ((bytesRead = inputStream.read(buffer)) != -1) {
	                baos.write(buffer, 0, bytesRead);
	                }
	             imageBytes = baos.toByteArray();
	            imageString = Base64.encodeBase64String(imageBytes);	
	            }
	            catch (IOException e) {
	                e.printStackTrace();
	            }  
	       // System.out.println("hiiiiiiiiiiii"+imageString);
	        obj.setImageBytes(imageBytes);
				}
		}
		 	return obj;
	}

	

	@PostMapping(value = "/saveAdmin")
	public ResponseEntity<Object> saveAdmin(@RequestParam("multipartFiles") MultipartFile file,
			@RequestParam("allData") String allData) {
		try {
			AllData allDatas = convertJsonStringtoMailTemplateObject(allData);
			AllData obj = new AllData();
			File tempFile = convertMultipartFileToFile(file, allDatas.getUser().getLoginid());
			allDatas.getUser().setUserPhoto(file.getOriginalFilename());
			obj = scIntf.saveAdmin(allDatas);
			return ResponseEntity.status(HttpStatus.OK).body(obj);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return null;
	}

	@PostMapping(value = "/updateAdmin")
	public ResponseEntity<Object> updateAdmin(@RequestParam("multipartFiles") MultipartFile file,
			@RequestParam("allData") String allData) {
		try {
			AllData allDatas = convertJsonStringtoMailTemplateObject(allData);
			AllData obj = new AllData();
			File tempFile = convertMultipartFileToFile(file, allDatas.getUser().getLoginid());
			allDatas.getUser().setUserPhoto(file.getOriginalFilename());
			obj = scIntf.updateAdmin(allDatas);
			return ResponseEntity.status(HttpStatus.OK).body(obj);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return null;
	}

	

	@PostMapping(value = "/saveSponsor")
	public ResponseEntity<Object> saveSponsor(@RequestParam("multipartFiles") MultipartFile file,
			@RequestParam("allData") String allData) {
		try {
			AllData allDatas = convertJsonStringtoMailTemplateObject(allData);
			AllData obj = new AllData();
			File tempFile = convertMultipartFileToFile(file, allDatas.getUser().getLoginid());
			allDatas.getUser().setUserPhoto(file.getOriginalFilename());
			obj = scIntf.saveSponsor(allDatas);
			return ResponseEntity.status(HttpStatus.OK).body(obj);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return null;
	}

	@PostMapping(value = "/updateSponsor")
	public ResponseEntity<Object> updateSponsor(@RequestParam("multipartFiles") MultipartFile file,
			@RequestParam("allData") String allData) {
		try {
			AllData allDatas = convertJsonStringtoMailTemplateObject(allData);
			AllData obj = new AllData();
			File tempFile = convertMultipartFileToFile(file, allDatas.getUser().getLoginid());
			allDatas.getUser().setUserPhoto(file.getOriginalFilename());
			obj = scIntf.updateSponsor(allDatas);
			return ResponseEntity.status(HttpStatus.OK).body(obj);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return null;
	}

	
	@PostMapping(value = "/saveContact")
	public Contact saveContact(@RequestBody Contact contact) {
		Contact obj = new Contact();
		obj = scIntf.saveContactUs(contact);
		return obj;
	}

	@PostMapping(value = "/studentList")
	public List<User> studentList() {
		List<User> stuList = scIntf.studentList();
		return stuList;
	}

	@GetMapping(value = "/sponsorList")
	public List<User> sponsorList() {
		List<User> sponsorList = scIntf.sponsorList();
		return sponsorList;
	}
	
	@PostMapping(value = "/sponsorList")
	public List<User> sponsorsList() {
		List<User> sponsorList = scIntf.sponsorList();
		return sponsorList;
	}

	@RequestMapping(value = "/checkEmailExist", method = RequestMethod.GET)
	public User checkEmailExist(@RequestParam("email") String email) {
		User us = scIntf.checkEmailExist(email);
		return us;
	}

	@PostMapping(value = "/awaitingApprovlList")
	public List<User> awaitingApprovlList(@RequestBody User user)
	// public List<User> awaitingApprovlList()
	{
		// User user=new User();
		List<User> lst = scIntf.awaitingApprovlList(user);
		return lst;
	}

	@PostMapping(value = "/approveAdminId")
	public boolean approveAdminId(@RequestBody AllData alldata) {
		List<User> ids = alldata.getIds();
		scIntf.approveAdminId(ids);
		return true;
	}

	@PostMapping(value = "/studentListByYear")
	public List<User> studentListByYear(@RequestBody Scholarship scholarship) {
		List<User> studentList = scIntf.studentListByYear(scholarship.getYear());
		return studentList;
	}

	@PostMapping(value = "/findByAdmin")
	public AllData findByAdmin(@RequestBody User user) {
		AllData obj = new AllData();
		obj = scIntf.findbyAdminUser(user);
		return obj;
	}
	
	
	@PostMapping(value = "/saveMini")
	public AllData saveMini(@RequestBody AllData allData) {
		AllData obj = new AllData();
		obj = scIntf.saveMini(allData);
		return obj;
	}
}
