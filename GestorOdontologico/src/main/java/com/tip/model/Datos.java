package com.tip.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Datos implements Serializable {

	@JsonIgnore
	private static final long serialVersionUID = 1L;

	private Integer dni;
	private String nombre;
	private String apellido;
	private Date fechaNac;
	private String direccion;
	private Integer anios;
	private Integer idObraSocial;
	private ObraSocial obraSocial;
	private ArrayList<Turno> turnos = new ArrayList<Turno>();
	
	
	public Datos() {

	}

	public Integer getDni() {
		return dni;
	}

	public void setDni(Integer dni) {
		this.dni = dni;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public Date getFechaNac() {
		return fechaNac;
	}

	public void setFechaNac(Date fechaNac) {
		this.fechaNac = fechaNac;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public Integer getAnios() {
		return anios;
	}

	public void setAnios(Integer anios) {
		this.anios = anios;
	}

	public ObraSocial getObraSocial() {
		return obraSocial;
	}

	public void setObraSocial(ObraSocial obraSocial) {
		this.obraSocial = obraSocial;
	}

	public Integer getIdObraSocial() {
		return idObraSocial;
	}

	public void setIdObraSocial(Integer idObraSocial) {
		this.idObraSocial = idObraSocial;
	}

	public ArrayList<Turno> getTurnos() {
		return turnos;
	}

	public void setTurnos(ArrayList<Turno> turnos) {
		this.turnos = turnos;
	}

}
