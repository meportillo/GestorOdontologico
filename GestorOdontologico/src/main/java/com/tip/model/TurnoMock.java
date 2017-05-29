package com.tip.model;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

public class TurnoMock implements Serializable {
	
	private static final long serialVersionUID = 1L;	
	/*
	    title: 'An event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true,
        actions: actions 
        dni
	 
	 */
	
	
	private String title;
//    color: calendarConfig.colorTypes.warning,
    private Date startsAt;
    private Date endsAt;
    private boolean draggable;
    private boolean resizable;
    private Integer dni;
    private ColorTurno colorPrimary;
    private Integer idTurno;
    
//    actions: actions
	
	public TurnoMock(String title, Integer idTurno, Date fecha ,Date horaInicio, Date horaFin, Integer dni) {
		this.setTitle(title);
		this.setDraggable(true);
		this.setDraggable(true);
		
		Date fechaInicio = (Date) fecha.clone();
		
		fechaInicio.setHours(horaInicio.getHours());
		fechaInicio.setMinutes(horaInicio.getMinutes());
		this.setStartsAt(fechaInicio);
		
		Date fechaFin = (Date) fecha.clone();
		fechaFin.setHours(horaFin.getHours());
		fechaFin.setMinutes(horaFin.getMinutes());
		this.setEndsAt(fechaFin);
		
		this.setColorPrimary(new ColorTurno());
		this.setIdTurno(idTurno);
		this.setDni(123456);
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

	public Integer getDni() {
		return dni;
	}

	public void setDni(Integer dni) {
		this.dni = dni;
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
