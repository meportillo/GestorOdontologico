package com.tip.persistence;

import java.io.Serializable;
import java.util.List;

import com.tip.model.Turno;

public interface GenericRepository<T> {

	void save(T entity);

	void delete(T entity);

	void update(T entity);

	T findById(Serializable id);

	List<T> findAll();

	void deleteById(Serializable id);

	int count();

	List<T> findByExample(T exampleObject);


}
