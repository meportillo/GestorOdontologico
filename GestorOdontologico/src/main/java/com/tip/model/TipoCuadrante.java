package com.tip.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tipocuadrante")
public class TipoCuadrante implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "tipoCuadrante")
	private Integer tipoCuadrante;

	@Column(name = "descripcion")
	private String descripcion;

	public Integer getTipoCuadrante() {
		return tipoCuadrante;
	}

	public void setTipoCuadrante(Integer tipoCuadrante) {
		this.tipoCuadrante = tipoCuadrante;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	

}
