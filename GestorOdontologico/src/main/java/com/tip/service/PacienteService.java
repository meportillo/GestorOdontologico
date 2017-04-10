package com.tip.service;

import java.util.List;
import javax.transaction.Transactional;

import com.tip.model.Paciente;
import com.tip.persistence.PacienteRepository;

public class PacienteService extends GenericService<Paciente> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Transactional
	public List<Paciente> getEventsByNameDniSurname(String valor) {
		return ((PacienteRepository) this.getRepository()).getEventsByNameDniSurname(valor);
	}

}
