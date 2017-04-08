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
@Table(name = "odontograma")
public class Odontograma implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "idodontograma")
	private Long idOdontograma;

	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "idOdontograma", referencedColumnName = "idodontograma")
	private List<Cuadrante> cuadrantes;

	@Column(name = "idFicha")
	private Long idFicha;

	public List<Cuadrante> getCuadrantes() {
		return cuadrantes;
	}

	public void setCuadrantes(List<Cuadrante> cuadrantes) {
		this.cuadrantes = cuadrantes;
	}

	public Long getIdFicha() {
		return idFicha;
	}

	public void setIdFicha(Long idFicha) {
		this.idFicha = idFicha;
	}

	public Long getIdOdontograma() {
		return idOdontograma;
	}

	public void setIdOdontograma(Long idOdontograma) {
		this.idOdontograma = idOdontograma;
	}
}
