package com.tip.webrest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.tip.model.Paciente;
import com.tip.model.Turno;
import com.tip.model.TurnoMock;
import com.tip.service.TurnoService;

@Path("/turno")
public class TurnoRest {

	private TurnoService turnoService;

	public TurnoService getTurnoService() {
		return turnoService;
	}

	public void setTurnoService(TurnoService turnoService) {
		this.turnoService = turnoService;
	}
	
	@DELETE
	@Path("/borrarTurno/{id}")
	@Produces("application/json")
	public Response borrarTurno(@PathParam("id") final Integer id) {

		try {
			Turno turno = this.getTurnoService().getById(id);
			this.getTurnoService().delete(turno);
		} catch (Exception e) {
			return Response.ok(Response.Status.NOT_FOUND).build();
		}
		return Response.ok(Response.Status.OK).build();
	}
	
	@POST
	@Path("/crearTurno/{title}/{startsAt}/{endsAt}")
	@Produces("application/json")	
	public Response crearTurno(@PathParam("title") final String title, @PathParam("startsAt") final Date startsAt,
			@PathParam("endsAt") final Date endsAt, Paciente paciente){
		try {
			
		Turno turno = new Turno();
		turno.setDniPaciente(paciente);
		turno.setFechaTurno(startsAt);
		turno.setHoraInicio(startsAt);
		turno.setHoraFin(endsAt);
		turno.setDescripcion(title);
		this.getTurnoService().save(turno);
		
//			System.out.println(title);
//			System.out.println(startsAt);
//			System.out.println(endsAt);
//			System.out.println(dni);
//			System.out.println(color);
		return Response.ok(turno).build();
		}catch(Exception e){
			e.printStackTrace();
			return Response.status(Response.Status.CONFLICT).build();
		}
	}

	@GET
	@Path("/obtenerTodosLosTurnos")
	@Produces("application/json")
	public Response todosLosTurnos() {

		List<Turno> ret = null;
		List<TurnoMock> retMocks = new ArrayList<TurnoMock>();
		
		try {
			ret = this.getTurnoService().obtenerTodosLosTurnos();
			for (Turno turno : ret) {
				retMocks.add(turno.toTurnoMock());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).build();
		}

		return Response.ok(retMocks).build();

	}

}
