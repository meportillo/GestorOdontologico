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
@Table(name = "cuadrante")
public class Cuadrante implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idCuadrante" ,nullable= false)
	private Integer idCuadrante;

	@Column(name = "idTipoCuadrante")
	private Integer idTipoCuadrante;

	@Column(name = "idOdontograma")
	private Long idOdontograma;

	@OneToMany(fetch = FetchType.EAGER)
	@Cascade({CascadeType.SAVE_UPDATE, CascadeType.DELETE})

	@JoinColumn(name = "idCuadrante", referencedColumnName = "idCuadrante")
	private List<Diente> dientes;

	public Cuadrante(){
		
	}
	
	public Cuadrante(Integer idTipoCuadrante){
		this.idTipoCuadrante = idTipoCuadrante;
		this.dientes = new ArrayList<Diente>();
		for(int i = 1; i < 9; i++){
			this.dientes.add(new Diente(i));
		}
		
	}
	
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
