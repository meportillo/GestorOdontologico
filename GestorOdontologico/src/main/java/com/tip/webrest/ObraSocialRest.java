package com.tip.webrest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.tip.model.ObraSocial;
import com.tip.service.ObraSocialService;

@Path("/obraSocial")
public class ObraSocialRest {

	private ObraSocialService obraSocialService;
	
	
	@GET
	@Path("/getObraSocialId/{id}")
	@Produces("application/json")
	public Response getPacientePorNombreApellidoDni(@PathParam("id") final int id) {
		try {
			ObraSocial obraSocial = this.getObraSocialService().getById(id);
			return Response.ok(obraSocial).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}
	
	@POST
	@Path("/updateprofilejson/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updateProfilejson(final ObraSocial os) {
		try{
			this.getObraSocialService().update(os);
			return Response.ok(os).build();
		} catch (Exception e) {
			return Response.status(Response.Status.NOT_IMPLEMENTED).build();
		}
	}
	
	
	
	@POST
	@Path("/crearPaciente/{nombre}/{codigo}")
	@Produces("application/json")	
	public Response crearObraSocial(@PathParam("nombre") final String nombre, @PathParam("codigo") final String codigo){
		try {
		ObraSocial obraSocial = new ObraSocial();
		obraSocial.setCodigo(codigo);
		obraSocial.setNombre(nombre);
		this.getObraSocialService().save(obraSocial);
		return Response.ok(obraSocial).build();
		}catch(Exception e){
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

	public ObraSocialService getObraSocialService() {
		return obraSocialService;
	}

	public void setObraSocialService(ObraSocialService obraSocialService) {
		this.obraSocialService = obraSocialService;
	}

}
