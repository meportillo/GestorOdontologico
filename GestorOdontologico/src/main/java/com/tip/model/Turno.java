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
	private Date horaInicio;
	
	@Column(name = "fechaTurno")
	private Date fechaTurno;
	
	@Column(name = "horaFin")
	private Date horaFin;
	
	@Column(name = "descripcion")
	private String descripcion;
	
	
	@OneToOne(fetch = FetchType.EAGER)
	@Cascade({CascadeType.SAVE_UPDATE, CascadeType.DELETE})
	@JoinColumn(name = "dniPaciente", referencedColumnName = "dni")
	private Paciente dniPaciente;

	public TurnoMock toTurnoMock(){
		
		
		TurnoMock turnoM = new TurnoMock(descripcion, idTurno, fechaTurno, horaInicio, horaFin, 123242);
		return turnoM;
		
	}
	
	public Turno(){
		
	}


	public Integer getIdTurno() {
		return idTurno;
	}


	public void setIdTurno(Integer idTurno) {
		this.idTurno = idTurno;
	}


	public Date getHoraInicio() {
		return horaInicio;
	}


	public void setHoraInicio(Date horaInicio) {
		this.horaInicio = horaInicio;
	}


	public Date getFechaTurno() {
		return fechaTurno;
	}


	public void setFechaTurno(Date fechaTurno) {
		this.fechaTurno = fechaTurno;
	}


	public Date getHoraFin() {
		return horaFin;
	}


	public void setHoraFin(Date horaFin) {
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


	public String getDescripcion() {
		return descripcion;
	}


	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	

}
