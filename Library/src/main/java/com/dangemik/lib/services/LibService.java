package com.dangemik.lib.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dangemik.lib.dao.LibRepository;
import com.dangemik.lib.model.Book;

@Service
public class LibService {

	@Autowired
	private LibRepository libRepository;

	public Collection<Book> findAllBooks() {
		List<Book> books = new ArrayList<Book>();

		for (Book book : libRepository.findAll()) {
			books.add(book);
		}

		return books;
	}

	public void delete(long id) {
		libRepository.deleteById(id);
	}

	public Book findOne(long id) {

		List<Book> books = (List<Book>) libRepository.findAll();
		if (!books.isEmpty()) {
			for (int i = 0; i < books.size(); i++) {
				if (books.get(i).getId() == id) {
					return books.get(i);
				}

			}
		}
		return null;
	}
	public void Save(Book book) {
		libRepository.save(book);
	}
	
	public void Delete(long id) {
		libRepository.deleteById(id);
	}
	

}
