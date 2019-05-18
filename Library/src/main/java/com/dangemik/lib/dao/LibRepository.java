package com.dangemik.lib.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dangemik.lib.model.Book;
@Repository
public interface LibRepository extends CrudRepository<Book, Long>{

}
