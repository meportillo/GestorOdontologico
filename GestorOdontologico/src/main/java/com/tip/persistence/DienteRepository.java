package com.tip.persistence;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.tip.model.Cuadrante;
import com.tip.model.Diente;

public class DienteRepository extends HibernateGenericDAO<Diente> implements GenericRepository<Diente> {

	private static final long serialVersionUID = -3729018075251133298L;

	@Override
	protected Class<Diente> getDomainClass() {

		return Diente.class;
	}

	public void updateDientes(List<Cuadrante> cuadrantes) {

		Session session = this.getSessionFactory().getCurrentSession();
		for (Cuadrante cuadrante : cuadrantes) {

			for (Diente diente : cuadrante.getDientes()) {
				session.update(diente);
			}

		}

	}

	public Diente updateDiente(Integer idDiente, Integer idEstado) {

		Session session = this.getSessionFactory().getCurrentSession();
		Query query = session.createQuery("update Diente  set idEstadoDiente = :idEstado where iddiente = :idDiente");
		query.setParameter("idDiente", idDiente);
		query.setParameter("idEstado", idEstado);

		if (query.executeUpdate() == 1) {
			String hql = "FROM Diente d WHERE d.iddiente = :idDiente ";
			Query queryget = session.createQuery(hql);
			queryget.setParameter("idDiente", idDiente);
			return (Diente) queryget.list().get(0);
		}
		return null;

	}

}
