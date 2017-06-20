package com.tip.webrest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
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
			turno.setDniPaciente(null);
			this.getTurnoService().delete(turno);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.ok(Response.Status.NOT_FOUND).build();
		}
		return Response.ok(Response.Status.OK).build();
	}

	@POST
	@Path("/crearTurno/{title}/{startsAt}/{endsAt}")
	@Produces("application/json")
	public Response crearTurno(@PathParam("title") final String title, @PathParam("startsAt") final Date startsAt,
			@PathParam("endsAt") final Date endsAt, Paciente paciente) {
		try {

			List<Turno> turnos = this.getTurnoService().validarTurno(startsAt, endsAt);
			if (!turnos.isEmpty()) {
				System.out.print("------------------LISTA VACIA------------------------------------------------------");
				System.out.print(turnos.size());
				System.out.print("------------------LISTA VACIA------------------------------------------------------");

				return Response.status(Response.Status.CONFLICT).build();
			}

			Turno turno = new Turno();
			turno.setDniPaciente(paciente);
			turno.setFechaTurno(startsAt);
			turno.setHoraInicio(startsAt);
			turno.setHoraFin(endsAt);
			turno.setDescripcion(title);

			this.getTurnoService().save(turno);
			return Response.ok(turno).build();
		
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.CONFLICT).build();
		}
	}

	@POST
	@Path("/editarTurno/{title}/{startsAt}/{endsAt}/{idTurno}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response editarTurno(@PathParam("title") final String title, @PathParam("startsAt") final Date startsAt,
			@PathParam("endsAt") final Date endsAt, @PathParam("idTurno") final Integer idTurno) {
		try {

			List<Turno> turnos = this.getTurnoService().validarTurno(startsAt, endsAt, idTurno);
			if (!turnos.isEmpty()) {
				System.out.print("------------------editar VACIA 7777777777777777777777777777777777777777");
				System.out.print(turnos.size());
				System.out.print("------------------editar VACIA 7777777777777777777777777777777777777777");

				
				
				return Response.status(Response.Status.BAD_REQUEST).build();
	
			} else {

				Turno  t = this.getTurnoService().getById(idTurno);
				t.setDescripcion(title);
				t.setHoraInicio(startsAt);
				t.setHoraFin(endsAt);
				
				this.getTurnoService().refresh(t);
				return Response.ok(new Turno()).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.CONFLICT).build();
		}
	}

	@GET
	@Path("/turnosDeLaSemana/{startsAt}/{endsAt}")
	@Produces("application/json")
	public Response turnosDeLaSemana(@PathParam("startsAt") final Date startsAt,
			@PathParam("endsAt") final Date endsAt) {
		// System.out.println(startsAt);
		// System.out.println(endsAt);
		List<Turno> ret = null;
		List<TurnoMock> retMocks = new ArrayList<TurnoMock>();
		try {
			ret = this.getTurnoService().turnosDeLaSemana(startsAt, endsAt);
			for (Turno turno : ret) {
				retMocks.add(turno.toTurnoMock());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).build();
		}

		return Response.ok(retMocks).build();
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
