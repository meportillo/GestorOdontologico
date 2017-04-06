package com.tip.persistence;

import com.tip.model.Paciente;

public class PacienteRepository extends HibernateGenericDAO<Paciente> implements GenericRepository<Paciente> {

	private static final long serialVersionUID = 2596358444311280509L;

	@Override
	protected Class<Paciente> getDomainClass() {
		return Paciente.class;
	}

}
