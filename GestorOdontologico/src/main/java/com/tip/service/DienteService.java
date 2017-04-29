package com.tip.service;

import java.util.List;

import javax.transaction.Transactional;

import com.tip.model.Cuadrante;
import com.tip.model.Diente;
import com.tip.persistence.DienteRepository;

public class DienteService extends GenericService<Diente> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Transactional
	public void updateDientes(List<Cuadrante> cuadrantes) {
	
		((DienteRepository)this.getRepository()).updateDientes(cuadrantes);
		
	}
	@Transactional
	public Diente updateDiente(Integer idDiente, Integer idEstado) {

		return ((DienteRepository)this.getRepository()).updateDiente(idDiente,idEstado);
	}

}
