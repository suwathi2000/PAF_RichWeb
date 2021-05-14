package com.rest.gb;

import Models.Project;
import Controllers.ProjectController;

import java.util.List;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("ProjectResources")
public class ProjectResource {

	@GET
	@Path("Projects")
	@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
	public List<Project> getAllProjects() throws Exception {
		return ProjectController.getInstance().SearchAll();
	}

	@GET
	@Path("Project/{project_id}")
	@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
	public List<Project> getProject(@PathParam("project_id") int project_id) throws Exception {
		Project obj = new Project();
		obj.setProject_id(project_id);
		return ProjectController.getInstance().Search(obj);
	}

	@POST
	@Path("Project")
	public String saveProject(Project obj) throws Exception {
		ProjectController.getInstance().Save(obj);
		return "Project Saved";
	}

	@PUT
	@Path("Project")
	public String updateProject(Project obj) throws Exception {
		ProjectController.getInstance().Update(obj);
		return "Project Updated";
	}

	@DELETE
	@Path("Project/{project_id}")
	public String deleteProject(@PathParam("project_id") int project_id) throws Exception {
		Project obj = new Project();
		obj.setProject_id(project_id);
		ProjectController.getInstance().Delete(obj);
		return "Project Deleted";
	}
}