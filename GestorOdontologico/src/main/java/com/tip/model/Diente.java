package com.tip.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "diente")
public class Diente implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3503041860746671258L;

	@Id
	@Column(name = "iddiente")
	private Integer iddiente;

	@Column(name = "posicionCuadrante")
	private Integer posicionCuadrante;

	@Column(name = "idCuadrante")
	private Integer idCuadrante;

	@Column(name = "idEstadoDiente")
	private Integer idEstadoDiente;

	public Integer getIddiente() {
		return iddiente;
	}

	public void setIddiente(Integer iddiente) {
		this.iddiente = iddiente;
	}

	public Integer getPosicionCuadrante() {
		return posicionCuadrante;
	}

	public void setPosicionCuadrante(Integer posicionCuadrante) {
		this.posicionCuadrante = posicionCuadrante;
	}

	public Integer getIdCuadrante() {
		return idCuadrante;
	}

	public void setIdCuadrante(Integer idCuadrante) {
		this.idCuadrante = idCuadrante;
	}

	public Integer getIdEstadoDiente() {
		return idEstadoDiente;
	}

	public void setIdEstadoDiente(Integer idEstadoDiente) {
		this.idEstadoDiente = idEstadoDiente;
	}

}
