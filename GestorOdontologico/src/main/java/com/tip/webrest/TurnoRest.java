package com.tip.webrest;

import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.tip.model.Turno;
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
	
	@POST
	@Path("/crearTurno/{title}/{startsAt}/{endsAt}/{dni}")
	@Produces("application/json")	
	public Response crearTurno(@PathParam("title") final String title, @PathParam("startsAt") final Date startsAt,
			@PathParam("endsAt") final Date endsAt, @PathParam("dni") final Integer dni){
		try {
			System.out.println(title);
			System.out.println(startsAt);
			System.out.println(endsAt);
			System.out.println(dni);
		return Response.ok(Status.OK).build();
		}catch(Exception e){
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

	@GET
	@Path("/obtenerTodosLosTurnos")
	@Produces("application/json")
	public Response todosLosTurnos() {

		List<Turno> ret = null;
		try {
			ret = this.getTurnoService().obtenerTodosLosTurnos();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).build();
		}

		return Response.ok(ret).build();

	}

}
