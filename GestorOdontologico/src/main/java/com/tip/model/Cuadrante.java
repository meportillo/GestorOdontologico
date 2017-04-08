package com.tip.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "cuadrante")
public class Cuadrante implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "idCuadrante")
	private Integer idCuadrante;

	@Column(name = "idTipoCuadrante")
	private Integer idTipoCuadrante;

	@Column(name = "idOdontograma")
	private Long idOdontograma;

	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "idCuadrante", referencedColumnName = "idCuadrante")
	private List<Diente> dientes;

	public Integer getIdCuadrante() {
		return idCuadrante;
	}

	public Long getIdOdontograma() {
		return idOdontograma;
	}

	public void setIdOdontograma(Long idOdontograma) {
		this.idOdontograma = idOdontograma;
	}

	public List<Diente> getDientes() {
		return dientes;
	}

	public void setDientes(List<Diente> dientes) {
		this.dientes = dientes;
	}

	public void setIdCuadrante(Integer idCuadrante) {
		this.idCuadrante = idCuadrante;
	}

	public Integer getIdTipoCuadrante() {
		return idTipoCuadrante;
	}

	public void setIdTipoCuadrante(Integer idTipoCuadrante) {
		this.idTipoCuadrante = idTipoCuadrante;
	}

}
