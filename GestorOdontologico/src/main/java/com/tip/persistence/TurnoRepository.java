package com.tip.persistence;

import com.tip.model.Turno;

public class TurnoRepository extends HibernateGenericDAO<Turno> implements GenericRepository<Turno> {

	private static final long serialVersionUID = 1L;

	@Override
	protected Class getDomainClass() {
		return Turno.class;
	}

}
