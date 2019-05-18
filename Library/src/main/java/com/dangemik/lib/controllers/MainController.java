package com.dangemik.lib.controllers;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.dangemik.lib.model.Book;
import com.dangemik.lib.services.LibService;

@Controller
public class MainController {
	
	
	@Autowired
	private LibService libService;
	
	
	@GetMapping("/")
	public String init(HttpServletRequest req) {
		req.setAttribute("books", libService.findAllBooks());
		req.setAttribute("mode", "BOOK_VIEW");
		return "index";
	}
	
	@GetMapping("/updateBook")
	public String init(@RequestParam long id,HttpServletRequest req) {
		req.setAttribute("book", libService.findOne(id));
		req.setAttribute("mode", "BOOK_EDIT");
		return "index";
	}
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("yyyy-mm-dd"), false));
	}
	
	@PostMapping("/save")
	public String save(@ModelAttribute Book book,BindingResult bindingResult, HttpServletRequest req,HttpServletResponse resp) throws IOException {
		libService.Save(book);
		req.setAttribute("books", libService.findAllBooks());
		req.setAttribute("mode", "BOOK_VIEW");
		resp.sendRedirect("/");
		return "index";
	}
	
	@GetMapping("/newBook")
	public String newBook(HttpServletRequest req) {
		req.setAttribute("mode", "BOOK_NEW");
		return "index";
	}
	
	@GetMapping("/deleteBook")
	public void deleteBook(@RequestParam long id,HttpServletRequest req,HttpServletResponse resp) throws IOException {
		libService.Delete(id);
		resp.sendRedirect("/");
	}
	
	
	
	
	
}
