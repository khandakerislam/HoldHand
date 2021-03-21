package com.scholarship.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.Map.Entry;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;


import javax.mail.internet.MimeMultipart;



public class emailWithHTMLTemplate {

	/*
	 * public static void main(String[] args) { Map<String, String> map = new
	 * HashMap<String, String>(); map.put("firstname", "dev"); map.put("lastname",
	 * "gread"); map.put("Password", "12222"); new
	 * emailWithHTMLTemplate().sendMailInJava(map); }
	 */

// Method to send an Email   
	public static void sendMailInJava(Map<String, String> templateMap) {
		try {
			
			// Email data
			String Email_Id = properties.email;
			String password = properties.password;
			String recipient_mail_id = templateMap.get("recipient_mail_id");
			
			String mail_subject = templateMap.get("subject");
			String templete = templateMap.get("template");;

			String firstname = templateMap.get("firstname");
			String lastname = templateMap.get("lastname");
			String passwordUser = templateMap.get("Password");

			// Set mail properties
			Properties props = System.getProperties();
			String host_name = "smtp.mail.yahoo.com";
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", host_name);
			props.put("mail.smtp.user", Email_Id);
			props.put("mail.smtp.password", password);
			props.put("mail.smtp.port", "587");
			props.put("mail.smtp.auth", "true");

			Session session = Session.getDefaultInstance(props);
			MimeMessage message = new MimeMessage(session);

			try {
				// Set email data
				message.setFrom(new InternetAddress(Email_Id));
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient_mail_id));
				message.setSubject(mail_subject);
				MimeMultipart multipart = new MimeMultipart();
				BodyPart messageBodyPart = new MimeBodyPart();

				String query = templateMap.get("query");
				String location = templateMap.get("location");
				String useremail = templateMap.get("useremail");
				String phone = templateMap.get("phone");
				String role=templateMap.get("role");
				
				// Set key values
				Map<String, String> input = new HashMap<String, String>();
				input.put("Content In", "English");
				if(firstname!=null)
				input.put("firstnameuser", firstname);
				if(lastname!=null)
				input.put("lastnameuser", lastname);
				input.put("recipient_mail_id", recipient_mail_id);
				if(passwordUser!=null)
				input.put("passwordUser", passwordUser);
				if(query!=null)
					input.put("query", templateMap.get("query"));
				if(location!=null)
					input.put("location", location);
				if(phone!=null)
					input.put("phone", phone);
				if(useremail!=null)
					input.put("useremail", useremail);
				if(role!=null)
					input.put("role", role);
				
				
				
				
				
				
				
				
				// input.put

				// HTML mail content
				String htmlText = readEmailFromHtml(templete, input); // template location
				messageBodyPart.setContent(htmlText, "text/html");

				multipart.addBodyPart(messageBodyPart);
				message.setContent(multipart);

				// cc and bcc
				// message.addRecipient(RecipientType.BCC, new
				// InternetAddress("your@email.com"));
				//message.addRecipient(RecipientType.CC, new InternetAddress("devendra.gread@yahoo.in"));

				// Conect to smtp server and send Email
				Transport transport = session.getTransport("smtp");
				transport.connect(host_name, Email_Id, password);
				transport.sendMessage(message, message.getAllRecipients());
				transport.close();
				System.out.println("Mail sent successfully...");

			} catch (MessagingException ex) {

			} catch (Exception ae) {
				ae.printStackTrace();
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}
	}

//Method to replace the values for keys
	protected static String readEmailFromHtml(String filePath, Map<String, String> input) {
		String msg = readContentFromFile(filePath);
		try {
			Set<Entry<String, String>> entries = input.entrySet();
			for (Map.Entry<String, String> entry : entries) {
				msg = msg.replace(entry.getKey().trim(), entry.getValue().trim());
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return msg;
	}

//Method to read HTML file as a String 
	private static String readContentFromFile(String fileName) {
		StringBuffer contents = new StringBuffer();

		try {
			// use buffering, reading one line at a time
			BufferedReader reader = new BufferedReader(new FileReader(fileName));
			try {
				String line = null;
				while ((line = reader.readLine()) != null) {
					contents.append(line);
					contents.append(System.getProperty("line.separator"));
				}
			} finally {
				reader.close();
			}
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return contents.toString();
	}
}