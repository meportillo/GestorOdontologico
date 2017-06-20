package com.tip.service;

import java.util.List;
import java.util.Date;
import javax.transaction.Transactional;

import com.tip.model.Turno;
import com.tip.persistence.TurnoRepository;

public class TurnoService extends GenericService<Turno> {

	private static final long serialVersionUID = 1L;

	@Transactional
	public List<Turno> obtenerTodosLosTurnos() {
		return this.retriveAll();
	}

	@Transactional
	public List<Turno> turnosDeLaSemana(Date startsAt, Date endsAt) {
		return ((TurnoRepository) this.getRepository()).turnosDeLaSemana(startsAt, endsAt);
	}

	@Transactional
	public List<Turno> validarTurno(Date startsAt, Date endsAt) {
		return ((TurnoRepository) this.getRepository()).validarTurno(startsAt, endsAt);
	}

	@Transactional
	public List<Turno> validarTurno(Date horaInicio, Date horaFin, Integer idTurno) {
		return ((TurnoRepository) this.getRepository()).validarTurno(horaInicio, horaFin, idTurno);
	}
	@Transactional
	public Turno refresh(Turno t) {
		return ((TurnoRepository) this.getRepository()).refresh(t);
		
	}

}
