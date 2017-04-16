package com.tip.persistence;

import com.tip.model.ObraSocial;

public class ObraSocialRepository extends HibernateGenericDAO<ObraSocial> implements GenericRepository<ObraSocial> {

	private static final long serialVersionUID = 1L;

	@Override
	protected Class<ObraSocial> getDomainClass() {
		return ObraSocial.class;
	}

}
