package com.tip.webrest;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.tip.model.Datos;
import com.tip.model.ObraSocial;
import com.tip.model.Paciente;
import com.tip.service.DienteService;
import com.tip.service.ObraSocialService;
import com.tip.service.PacienteService;

@Path("/paciente")
public class PacienteRest {

	private PacienteService pacienteService;
	
	private DienteService dienteService;

	private ObraSocialService osService;
	
	public DienteService getDienteService() {
		return dienteService;
	}

	public void setDienteService(DienteService dienteService) {
		this.dienteService = dienteService;
	}

	public PacienteService getPacienteService() {
		return pacienteService;
	}

	public void setPacienteService(PacienteService pacienteService) {
		this.pacienteService = pacienteService;
	}
	
	public ObraSocialService getOsService() {
		return osService;
	}

	public void setOsService(ObraSocialService osService) {
		this.osService = osService;
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

	@POST
	@Path("/crearPaciente/{nombre}/{apellido}/{direccion}/{anios}/{fechaNac}/{obraSocial}/{dni}")
	@Produces("application/json")
	public Response crearPaciente(@PathParam("nombre") final String nombre,
			@PathParam("apellido") final String apellido, @PathParam("direccion") final String direccion,
			@PathParam("anios") final Integer anios, @PathParam("fechaNac") final Date fechaNac,
			@PathParam("obraSocial") final String obraSocial, @PathParam("dni") final int dni) {

		try {
			Paciente paciente = new Paciente();
			paciente.setAnios(anios);
			paciente.setApellido(apellido);
			paciente.setDireccion(direccion);
			paciente.setAnios(anios);
			paciente.setNombre(nombre);

			ObraSocial obraS = new ObraSocial();
			obraS.setNombre(obraSocial);

			paciente.setObraSocial(obraS);

			paciente.setFechaNac(new Timestamp(fechaNac.getTime()));

			paciente.setDni(dni);
			this.getPacienteService().save(paciente);
			return Response.ok(paciente).build();
		} catch (Exception e) {
			System.out.println(e);
			return Response.status(Response.Status.NOT_FOUND).build();
		}

	}
	
	@POST
	@Path("/crearPaciente")
	@Consumes("application/json")
	@Produces("application/json")
	public Response crearPaciente(Paciente datos) {

		try {
			Paciente paciente = new Paciente();
			paciente.setAnios(datos.getAnios());
			paciente.setApellido(datos.getApellido());
			paciente.setDireccion(datos.getDireccion());
			paciente.setNombre(datos.getNombre());

			paciente.setObraSocial(datos.getObraSocial());
			paciente.setFechaNac(new Timestamp(datos.getFechaNac().getTime()));
			paciente.setDni(datos.getDni());

			this.getPacienteService().save(paciente);
			paciente.getFicha().setIdPaciente(new Long(datos.getDni()));
			paciente.getFicha().getOdontograma().setIdFicha(paciente.getFicha().getIdFicha());
			paciente.getFicha().getOdontograma().actualizarcuadrantes();
			this.getPacienteService().update(paciente);
			
			return Response.ok(paciente).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}

	}


	@GET
	@Path("/getPacientePorNombreApellidoDni/{valor}")
	@Produces("application/json")
	public Response getPacientePorNombreApellidoDni(@PathParam("valor") final String valor) {
		try {
			List<Paciente> pacientes = this.getPacienteService().getEventsByNameDniSurname(valor);
			return Response.ok(pacientes).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

	

	@GET
	@Path("/getPacientePorDni/{dni}")
	@Produces("application/json")
	public Response getPacientePorDni(@PathParam("dni") final Integer dni) {
		try {
			Paciente paciente = this.getPacienteService().getEventsByDni(dni);
				return Response.ok(paciente).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

	
	@PUT
	@Path("/updatePaciente/{dni}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updatePaciente(@PathParam("dni") final Integer dni,final Paciente paciente) {

		Paciente ret = null;
		try {

			this.getPacienteService().updatePaciente(dni,paciente);
			ret = this.getPacienteService().getById(dni);

		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(ret).build();
	}
	
	@GET
	@Path("/getTopPacientes")
	@Produces("application/json")
	public Response getTopPacientes() {
		try {
			List<Paciente> pacientes = this.getPacienteService().getTopPacientes(10);		
			return Response.ok(pacientes).build();
			
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}	
	
	@POST
	@Path("/crearPacienteSimple/{dni}/{nombre}/{apellido}")
	@Produces("application/json")
	public Response crearPacienteSimple(@PathParam("dni") final Integer dni,@PathParam("nombre") final String nombre,@PathParam("apellido") final String apellido ) {

		try {
			Paciente paciente = new Paciente();
			paciente.setApellido(apellido);
			paciente.setNombre(nombre);
			paciente.setDni(dni);
			
			this.getPacienteService().save(paciente);
			paciente.getFicha().setIdPaciente(new Long(dni));
			paciente.getFicha().getOdontograma().setIdFicha(paciente.getFicha().getIdFicha());
			paciente.getFicha().getOdontograma().actualizarcuadrantes();
			this.getPacienteService().update(paciente);
			
			return Response.ok(paciente).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}

	}




}
