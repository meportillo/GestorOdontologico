package com.tip.model;

import java.io.Serializable;
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
@Table(name = "ficha")
public class Ficha implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idficha", nullable= false)
	private Long idFicha;

	@Column(name = "observaciones",nullable=true)
	private String observaciones;

	@Column(name = "fechaAlta",nullable=true)
	private Date fechaAlta;

	@OneToOne(fetch = FetchType.EAGER)
	@Cascade({CascadeType.SAVE_UPDATE, CascadeType.DELETE})
	@JoinColumn(name = "idodontograma", referencedColumnName = "idodontograma",nullable=true)
	private Odontograma odontograma;

	@Column(name = "idPaciente", nullable=true)
	private Long idPaciente;

	public Ficha(){
		this.observaciones ="";
		this.fechaAlta = new Date();
		this.fechaAlta.setHours(0);
		this.odontograma = new Odontograma();
		
	}
	
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
