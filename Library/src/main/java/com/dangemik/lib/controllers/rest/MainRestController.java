package com.dangemik.lib.controllers.rest;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dangemik.lib.model.Book;
import com.dangemik.lib.services.LibService;

@RestController
public class MainRestController {
	
	@Autowired
	private LibService libService;
	
	@GetMapping("/findAllBooks")
	 public Collection<Book> getAllBooks(){
		 return libService.findAllBooks();
	 }
	@GetMapping("/delete")
	public void deleteBook(@RequestParam long id) {
		libService.delete(id);
	}
}
