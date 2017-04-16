package com.tip.webrest;

import javax.ws.rs.Path;

import com.tip.service.ObraSocialService;

@Path("/obraSocial")
public class ObraSocialRest {

	private ObraSocialService obraSocialService;

	public ObraSocialService getObraSocialService() {
		return obraSocialService;
	}

	public void setObraSocialService(ObraSocialService obraSocialService) {
		this.obraSocialService = obraSocialService;
	}

}
