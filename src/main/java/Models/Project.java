package Models;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Project {

	private int project_id;
	private String category;
	private String topic;
	private String price;
	private String details;
	private String date_time;

	public Project() {
	}

	public Project(int project_id) {
		this.project_id = project_id;
	}

	public Project(int project_id, String category, String topic, String price, String details, String date_time) {
		this.project_id = project_id;
		this.category = category;
		this.topic = topic;
		this.price = price;
		this.details = details;
		this.date_time = date_time;
	}

	public int getProject_id() {
		return project_id;
	}

	public void setProject_id(int project_id) {
		this.project_id = project_id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getDate_time() {
		return date_time;
	}

	public void setDate_time(String date_time) {
		this.date_time = date_time;
	}

}