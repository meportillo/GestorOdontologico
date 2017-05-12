package com.tip.model;

import java.io.Serializable;
import java.time.LocalTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "turno")
public class Turno implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idTurno")
	private Long idTurno;
	
	@Column(name = "fechaTurno")
	private Date fechaTurno;
	
	@Column(name = "horaInicio")
	private LocalTime horaInicio;
	
	@Column(name = "horaFin")
	private LocalTime horaFin;

	@Column(name = "dniPaciente")
	private Integer dniPaciente;

	
	@Column(name = "descripcion")
	private String descripcion;

	public Long getIdTurno() {
		return idTurno;
	}
	public void setIdTurno(Long idTurno) {
		this.idTurno = idTurno;
	}
	public Date getFechaTurno() {
		return fechaTurno;
	}
	public void setFechaTurno(Date fechaTurno) {
		this.fechaTurno = fechaTurno;
	}
	public LocalTime getHoraInicio() {
		return horaInicio;
	}
	public void setHoraInicio(LocalTime horaInicio) {
		this.horaInicio = horaInicio;
	}
	public LocalTime getHoraFin() {
		return horaFin;
	}
	public void setHoraFin(LocalTime horaFin) {
		this.horaFin = horaFin;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

}
