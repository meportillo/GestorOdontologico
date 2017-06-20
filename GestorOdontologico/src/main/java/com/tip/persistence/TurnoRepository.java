package com.tip.persistence;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import java.util.Date;
import com.tip.model.Turno;

public class TurnoRepository extends HibernateGenericDAO<Turno> implements GenericRepository<Turno> {

	private static final long serialVersionUID = 1L;

	@Override
	protected Class getDomainClass() {
		return Turno.class;
	}
	
	public List<Turno> turnosDelMes(Date startsAt, Date endsAt){
		Session session = this.getSessionFactory().getCurrentSession();
		String hql = "FROM Turno t WHERE t.horaInicio >= :startsAt and t.horaFin <= :endsAt ";
		Query query = session.createQuery(hql);
		query.setParameter("startsAt", startsAt);
		query.setParameter("endsAt", endsAt);
		return query.list();
	}
	
	public List<Turno> turnosDeLaSemana(Date startsAt, Date endsAt){
		Session session = this.getSessionFactory().getCurrentSession();
		String hql = "FROM Turno t WHERE t.horaInicio >= :startsAt and t.horaFin <= :endsAt ";
		Query query = session.createQuery(hql);
		query.setParameter("startsAt", startsAt);
		query.setParameter("endsAt", endsAt);
		return query.list();
	}

	public List<Turno> validarTurno(Date startsAt, Date endsAt) {
		Session session = this.getSessionFactory().getCurrentSession();
		String hql = "FROM Turno t WHERE (t.horaInicio between  :startsAt  and :endsAt) or (t.horaFin between :startsAt  and :endsAt) ";
		Query query = session.createQuery(hql);
		query.setParameter("startsAt", startsAt);
		query.setParameter("endsAt", endsAt);
		return query.list();
	}

	public List<Turno> validarTurno(Date horaInicio, Date horaFin, Integer idTurno) {
		Session session = this.getSessionFactory().getCurrentSession();
		String hql = "FROM Turno t WHERE t.idTurno <> :id and ((t.horaInicio between  :startsAt  and :endsAt) or (t.horaFin between :startsAt  and :endsAt)) ";
		Query query = session.createQuery(hql);
		query.setParameter("startsAt", horaInicio);
		query.setParameter("endsAt", horaFin);
		query.setParameter("id", idTurno);
		return query.list();
	}

	public Turno refresh(Turno t) {
		Session session = this.getSessionFactory().getCurrentSession();
		String hql = "update Turno SET horaInicio = :inicio , horaFin = :fin , descripcion = :desc WHERE idTurno = :id";
		Query query = session.createQuery(hql);
		query.setParameter("inicio", t.getHoraInicio());
		query.setParameter("fin", t.getHoraFin());
		query.setParameter("desc", t.getDescripcion());
		query.setParameter("id", t.getIdTurno());
		int i = query.executeUpdate();
		return t; 
	}

}
