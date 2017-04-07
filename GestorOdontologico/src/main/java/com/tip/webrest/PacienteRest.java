package com.tip.webrest;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
	
	
//	  `dni` INT NOT NULL,
//	  `nombre` VARCHAR(45) NULL ,
//	  `apellido` VARCHAR(45) NULL,
//	  `direccion` VARCHAR(45) NULL,
//	  `fechaNac` DATE NULL,
//	  `anios` INT NULL,
	/*
	@POST
	@Path("/crearPaciente/{nombre}/{apellido}/{direccion}/{anios}/{dni}/{fechaNac}/{dni}")
	@Produces("application/json")
	public Response crearPaciente(@PathParam("nombre") final String nombre,
					@PathParam("apellido") final String apellido,
					@PathParam("direccion") final String direccion,
					@PathParam("anios") final int anios,
					@PathParam("fechaNac") final int fechaNac,
					@PathParam("dni") final int dni
					) {
		try {
			
		Paciente paciente = new Paciente();
		paciente.setAnios(anios);
		paciente.setApellido(apellido);
		paciente.setDireccion(direccion);
		paciente.setDni(dni);
		paciente.setNombre(nombre);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = format.parse("2012-12-13 14:54:30");
		paciente.setFechaNac(date);
		
		this.getPacienteService().save(paciente);
		return Response.ok(paciente).build();
		}catch (Exception e) {
			return null;
		}
	}
	*/
	@POST
	@Path("/crearPaciente/{nombre}/{apellido}/{direccion}/{anios}/{fechaNac}/{dni}")
	@Produces("application/json")
	public Response crearPaciente(@PathParam("nombre") final String nombre,
					@PathParam("apellido") final String apellido,
					@PathParam("direccion") final String direccion,
					@PathParam("anios") final int anios,
					@PathParam("fechaNac") final int fechaNac,
					@PathParam("dni") final int dni
					) {
		
		Paciente paciente = new Paciente();
		paciente.setAnios(anios);
		paciente.setApellido(apellido);
		paciente.setDireccion(direccion);
		paciente.setAnios(anios);
		paciente.setNombre(nombre);
		
		paciente.setFechaNac(new Timestamp(new Date().getTime()) );
		
		paciente.setDni(dni);
		this.getPacienteService().save(paciente);
		return Response.ok(paciente).build();
		
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
