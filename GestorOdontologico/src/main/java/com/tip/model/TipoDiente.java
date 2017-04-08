package com.tip.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tipoDiente")
public class TipoDiente implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7066334899592929175L;

	@Id
	@Column
	private Long idtipodiente;

	@Column
	private String descripcion;

	public Long getIdtipodiente() {
		return idtipodiente;
	}

	public void setIdtipodiente(Long idtipodiente) {
		this.idtipodiente = idtipodiente;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

}
