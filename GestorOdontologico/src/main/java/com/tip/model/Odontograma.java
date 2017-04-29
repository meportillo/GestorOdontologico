package com.tip.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "odontograma")
public class Odontograma implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "idodontograma", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idOdontograma;

	@OneToMany(fetch = FetchType.EAGER)
	@Cascade({ CascadeType.SAVE_UPDATE, CascadeType.DELETE })
	@JoinColumn(name = "idOdontograma", referencedColumnName = "idodontograma")
	private List<Cuadrante> cuadrantes;

	@Column(name = "idFicha")
	private Long idFicha;

	public Odontograma() {
		this.cuadrantes = new ArrayList<Cuadrante>();
		for (int i = 1; i < 5; i++) {
			this.cuadrantes.add(new Cuadrante(i));
		}

	}

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

	public void actualizarcuadrantes() {
		for (Cuadrante c : this.getCuadrantes()) {
			c.setIdOdontograma(this.getIdOdontograma());
			for (Diente d : c.getDientes()) {
				d.setIdCuadrante(c.getIdCuadrante());
			}
		}
	}

}
