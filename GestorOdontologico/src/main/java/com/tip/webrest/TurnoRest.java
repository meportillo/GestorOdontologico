package com.tip.webrest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
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
