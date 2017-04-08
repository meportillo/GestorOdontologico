package com.tip.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ficha")
public class Ficha {

	@Id
	@Column(name = "idficha")
	private Long idFicha;

	@Column(name = "observaciones")
	private String observaciones;

	@Column(name = "fechaAlta")
	private Date fechaAlta;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "idodontograma", referencedColumnName = "idodontograma")
	private Odontograma odontograma;

	@Column(name = "idPaciente")
	private Long idPaciente;

	public Odontograma getOdontograma() {
		return odontograma;
	}

	public void setOdontograma(Odontograma odontograma) {
		this.odontograma = odontograma;
	}

	public Long getIdPaciente() {
		return idPaciente;
	}

	public void setIdPaciente(Long idPaciente) {
		this.idPaciente = idPaciente;
	}

	public Long getIdFicha() {
		return idFicha;
	}

	public void setIdFicha(Long idFicha) {
		this.idFicha = idFicha;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public Date getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(Date fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

}
