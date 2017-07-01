package com.tip.model;

import java.io.Serializable;
import java.util.Date;

public class TurnoMock implements Serializable {
	
	private static final long serialVersionUID = 1L;	
	
	private String title;
    private Date startsAt;
    private Date endsAt;
    private boolean draggable;
    private boolean resizable;
    private String datosPaciente;
    private ColorTurno colorPrimary;
    private Integer idTurno;
    
    public String getDatosPaciente() {
		return datosPaciente;
	}

	public void setDatosPaciente(String datosPaciente) {
		this.datosPaciente = datosPaciente;
	}

	public TurnoMock(String title, Integer idTurno, Date fecha ,Date horaInicio, Date horaFin, Paciente dniPaciente) {

		this.setTitle(title);
		this.setDraggable(true);
		this.setDraggable(true);
		this.setStartsAt(horaInicio);
		this.setEndsAt(horaFin);
		this.setColorPrimary(new ColorTurno());
		this.setIdTurno(idTurno);
		this.setDatosPaciente(dniPaciente.getNombre() + " " + dniPaciente.getApellido()+", " + dniPaciente.getDni());
	
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getStartsAt() {
		return startsAt;
	}

	public void setStartsAt(Date startsAt) {
		this.startsAt = startsAt;
	}

	public Date getEndsAt() {
		return endsAt;
	}

	public void setEndsAt(Date endsAt) {
		this.endsAt = endsAt;
	}

	public boolean isDraggable() {
		return draggable;
	}

	public void setDraggable(boolean draggable) {
		this.draggable = draggable;
	}

	public boolean isResizable() {
		return resizable;
	}

	public void setResizable(boolean resizable) {
		this.resizable = resizable;
	}

	public Integer getIdTurno() {
		return idTurno;
	}

	public void setIdTurno(Integer idTurno) {
		this.idTurno = idTurno;
	}

	public ColorTurno getColorPrimary() {
		return colorPrimary;
	}

	public void setColorPrimary(ColorTurno colorPrimary) {
		this.colorPrimary = colorPrimary;
	}
}
