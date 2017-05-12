package com.tip.model;

import java.io.Serializable;
import java.sql.Time;
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

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idTurno")
	private Integer idTurno;
	
	@Column(name = "horaInicio")
	private Time horaInicio;
	
	@Column(name = "fechaTurno")
	private Date fechaTurno;
	
	@Column(name = "horaFin")
	private Time horaFin;
	
	
	@OneToOne(fetch = FetchType.EAGER)
	@Cascade({CascadeType.SAVE_UPDATE, CascadeType.DELETE})
	@JoinColumn(name = "dniPaciente", referencedColumnName = "dni")
	private Paciente dniPaciente;
	
	public Turno(){
		
	}


	public Integer getIdTurno() {
		return idTurno;
	}


	public void setIdTurno(Integer idTurno) {
		this.idTurno = idTurno;
	}


	public Time getHoraInicio() {
		return horaInicio;
	}


	public void setHoraInicio(Time horaInicio) {
		this.horaInicio = horaInicio;
	}


	public Date getFechaTurno() {
		return fechaTurno;
	}


	public void setFechaTurno(Date fechaTurno) {
		this.fechaTurno = fechaTurno;
	}


	public Time getHoraFin() {
		return horaFin;
	}


	public void setHoraFin(Time horaFin) {
		this.horaFin = horaFin;
	}


	public Paciente getDniPaciente() {
		return dniPaciente;
	}


	public void setDniPaciente(Paciente dniPaciente) {
		this.dniPaciente = dniPaciente;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
