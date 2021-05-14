package Controllers;

import Models.Project;
import DataBaseConnector.ConnectorProject;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ProjectController {

	ConnectorProject con = ConnectorProject.getInstance();

	private ProjectController() {
	}

	private static final ProjectController obj = new ProjectController();

	public static ProjectController getInstance() {
		return obj;
	}

	public void Save(Project data) throws Exception {
		con.getConnection();
		con.aud("INSERT INTO project(category,topic,price,details,date_time) values ('" + data.getCategory() + "','"
				+ data.getTopic() + "','" + data.getPrice() + "','" + data.getDetails() + "','" + data.getDate_time()
				+ "') ");
	}

	public void Update(Project data) throws Exception {
		con.getConnection();
		con.aud("UPDATE project SET category  = '" + data.getCategory() + "',topic  = '" + data.getTopic()
				+ "',price  = '" + data.getPrice() + "',details  = '" + data.getDetails() + "',date_time  = '"
				+ data.getDate_time() + "' WHERE project_id = '" + data.getProject_id() + "'");
	}

	public void Delete(Project data) throws Exception {
		con.getConnection();
		con.aud("DELETE FROM project WHERE project_id = '" + data.getProject_id() + "'");
	}

	public List<Project> SearchAll() throws Exception {
		List<Project> objList = new ArrayList<Project>();
		con.getConnection();
		ResultSet rset = con.srh("SELECT * FROM project");
		while (rset.next()) {
			Project obj = new Project();
			obj.setProject_id(rset.getInt(1));
			obj.setCategory(rset.getString(2));
			obj.setTopic(rset.getString(3));
			obj.setPrice(rset.getString(4));
			obj.setDetails(rset.getString(5));
			obj.setDate_time(rset.getString(6));
			objList.add(obj);
		}

		return objList;
	}

	public List<Project> Search(Project data) throws Exception {
		List<Project> objList = new ArrayList<Project>();
		con.getConnection();
		ResultSet rset = con.srh("SELECT * FROM project WHERE project_id = '" + data.getProject_id() + "'");
		while (rset.next()) {
			Project obj = new Project();
			obj.setProject_id(rset.getInt(1));
			obj.setCategory(rset.getString(2));
			obj.setTopic(rset.getString(3));
			obj.setPrice(rset.getString(4));
			obj.setDetails(rset.getString(5));
			obj.setDate_time(rset.getString(6));
			objList.add(obj);
		}

		return objList;
	}

}