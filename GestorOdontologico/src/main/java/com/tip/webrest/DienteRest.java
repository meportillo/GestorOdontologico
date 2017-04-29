package com.tip.webrest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.tip.service.DienteService;

@Path("/diente")
public class DienteRest {
	
	private DienteService dienteService;

	public DienteService getDienteService() {
		return dienteService;
	}

	public void setDienteService(DienteService dienteService) {
		this.dienteService = dienteService;
	}
	@POST
	@Path("/updateDiente/{idDiente}/{idEstado}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updateDiente(@PathParam("idDiente") final Integer idDiente, @PathParam("idEstado") final Integer idEstado){
		return Response.ok(this.getDienteService().updateDiente(idDiente, idEstado)).build();
	}

}
