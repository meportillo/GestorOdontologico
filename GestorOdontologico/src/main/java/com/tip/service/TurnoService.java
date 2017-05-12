package com.tip.service;

import java.util.List;

import javax.transaction.Transactional;

import com.tip.model.Turno;

public class TurnoService extends GenericService<Turno> {

	private static final long serialVersionUID = 1L;

	@Transactional
	public List<Turno> obtenerTodosLosTurnos() {
		return this.retriveAll();
	}

}
