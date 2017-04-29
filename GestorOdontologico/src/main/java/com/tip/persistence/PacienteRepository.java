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

	public List<Paciente> getEventsByNameDniSurname(String value) {

		Session session = this.getSessionFactory().getCurrentSession();
		String hql = "FROM Paciente P WHERE P.nombre LIKE :value or P.apellido LIKE :value or P.dni LIKE :value  ";
		Query query = session.createQuery(hql);
		query.setParameter("value", "%" + value + "%");

		return query.list();
	}

	public Paciente updatePaciente(Integer dni, Paciente paciente) {

		Session session = this.getSessionFactory().getCurrentSession();
		String hql = "FROM Paciente P WHERE P.dni = :dni  ";
		Query query = session.createQuery(hql);
		query.setParameter("dni",  dni);
		Paciente ret = (Paciente) query.list().get(0);

		session.save(ret);
		ret.setFicha(paciente.getFicha());
		session.merge(ret);
		
		return ret;

	}

}
