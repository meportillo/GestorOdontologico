package com.tip.webrest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.tip.model.Paciente;
import com.tip.service.PacienteService;

@Path("/paciente")
public class PacienteRest {

	private PacienteService pacienteService;

	public PacienteService getPacienteService() {
		return pacienteService;
	}

	public void setPacienteService(PacienteService pacienteService) {
		this.pacienteService = pacienteService;
	}

	@GET
	@Path("/todos")
	@Produces("application/json")
	public Response pacientes() {
		List<Paciente> pacientes = this.getPacienteService().retriveAll();
		if (pacientes.isEmpty()) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.ok(pacientes).build();
	}
	
	@GET
	@Path("/getPacientePorNombre/{name}")
	@Produces("application/json")
	public Response getPacientePorNombre(@PathParam("name") final String name) {
		try {
			List<Paciente> pacientes = this.getPacienteService().getEventsByName(name);
			return Response.ok(pacientes).build();
		}catch (Exception e) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

}
