package com.tip.webrest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
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

}
