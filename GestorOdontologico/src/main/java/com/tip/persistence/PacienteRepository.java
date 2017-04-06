package com.tip.persistence;

import java.util.List;
import java.util.Set;

import com.tip.model.Paciente;
import org.hibernate.Query;
import org.hibernate.Session;

public class PacienteRepository extends HibernateGenericDAO<Paciente> implements GenericRepository<Paciente> {

	private static final long serialVersionUID = 2596358444311280509L;

	@Override
	protected Class<Paciente> getDomainClass() {
		return Paciente.class;
	}
	
	public List<Paciente> getEventsByName(String name) {

		Session session = this.getSessionFactory().getCurrentSession();
		String hql = "FROM Paciente P WHERE P.nombre LIKE :name ";
		Query query = session.createQuery(hql);
		query.setParameter("name", "%" + name + "%");

		return query.list();
	}

}
