package com.tip.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "estadoDiente")
public class EstadoDiente implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7814529694457610670L;

	@Id
	@Column(name = "idEstadoDiente")
	private Long idEstadoDiente;

	@Column(name = "descripcion")
	private Long descripcion;


	
	public Long getIdEstadoDiente() {
		return idEstadoDiente;
	}

	public void setIdEstadoDiente(Long idEstadoDiente) {
		this.idEstadoDiente = idEstadoDiente;
	}

	public Long getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(Long descripcion) {
		this.descripcion = descripcion;
	}

}
