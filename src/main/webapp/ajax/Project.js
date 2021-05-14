function getRow() {
	var table = document.getElementById('table');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("project_id").value = this.cells[1].textContent;
			document.getElementById("category").value = this.cells[2].textContent;
			document.getElementById("topic").value = this.cells[3].textContent;
			document.getElementById("price").value = this.cells[4].textContent;
			document.getElementById("details").value = this.cells[5].textContent;
			document.getElementById("date_time").value = this.cells[6].textContent;
		};
	}
}

function getRowSearch() {
	var table = document.getElementById('idTable');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("project_id").value = this.cells[1].textContent;
			document.getElementById("category").value = this.cells[2].textContent;
			document.getElementById("topic").value = this.cells[3].textContent;
			document.getElementById("price").value = this.cells[4].textContent;
			document.getElementById("details").value = this.cells[5].textContent;
			document.getElementById("date_time").value = this.cells[6].textContent;
		};
	}
}

function getID() {
	var table = document.getElementById('table');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("project_id").value = this.cells[1].textContent;
		};
	}
}

function getIDserch() {
	var table = document.getElementById('idTable');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("project_id").value = this.cells[1].textContent;
		};
	}
}

function resetForm() {
	document.getElementById("project_id").value = "0";
	document.getElementById("category").value = "";
	document.getElementById("topic").value = "";
	document.getElementById("price").value = "";
	document.getElementById("details").value = "";
	document.getElementById("date_time").value = "";
}

function save() {
	var project_id = $('#project_id').val();
	project_id = parseInt(project_id);
	if (project_id === 0) {
		if(ValidInput()){
			$.ajax({
				url : 'http://localhost:8080/gb/webresources/ProjectResources/Project',
				method : 'POST',
				headers : {
					"Content-Type" : "application/json"
				},
				data : getJSON(),
				success : function(data) {
					$("#idTable").find("tr:gt(0)").remove();
					$("#table").find("tr:gt(0)").remove();
					load();
					resetForm();
					alert(data);
				},
				error : function(jqXHR, exception) {
					alert("error");
				}
			});
		}else{
			alert("Fill form");
		}
	}else{
		if(ValidInput()){
			$.ajax({
				url : 'http://localhost:8080/gb/webresources/ProjectResources/Project',
				method : 'PUT',
				headers : {
					"Content-Type" : "application/json"
				},
				data : getJSON(),
				success : function(data) {
					$("#idTable").find("tr:gt(0)").remove();
					$("#table").find("tr:gt(0)").remove();
					load();
					resetForm();
					alert(data);
				},
				error : function(jqXHR, exception) {
					alert("error");
				}
			});
		}else{
			alert("Fill form");
		}
	}
}

function delet(){
	getID();
	swal({
		title: "Are you sure?",
		text: "Do you realy want to Delete this?",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
		.then((willDelete) => {
			if (willDelete) {
				$.ajax({
					url : 'http://localhost:8080/gb/webresources/ProjectResources/Project/' + $('#project_id').val(),
					method: 'DELETE',
					success: function (resultText) {
						$("#table").find("tr:gt(0)").remove();
						$("#idTable").find("tr:gt(0)").remove();
						load();
						swal("Deleted!", {
							icon: "success",
							});
						},
						error: function (jqXHR, exception) {
							swal("fail");
						}
					});
				} else {
					swal("Safe!");
				}
			});
}

function deletSearch(){
	getIDserch();
	swal({
		title: "Are you sure?",
		text: "Do you realy want to Delete this?",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
		.then((willDelete) => {
			if (willDelete) {
				$.ajax({
					url : 'http://localhost:8080/gb/webresources/ProjectResources/Project/' + $('#project_id').val(),
					method: 'DELETE',
					success: function (resultText) {
						$("#table").find("tr:gt(0)").remove();
						$("#idTable").find("tr:gt(0)").remove();
						load();
						swal("Deleted!", {
							icon: "success",
							});
						},
						error: function (jqXHR, exception) {
							swal("fail");
						}
					});
				} else {
					swal("Safe!");
				}
			});
}

function load() {
	$.ajax({
		url : 'http://localhost:8080/gb/webresources/ProjectResources/Projects',
		method : 'GET',
		headers : {
			Accept : "application/json",
			"Content-Type" : "application/json"
		},
		success : function(data, textStatus, errorThrown) {
			var items = [];
			$.each(data.project,function(key, val) {
				var index = key + 1;
				items.push("<tr>");
				items.push("<td>" + index + "</td>");
				items.push("<td>" + val.project_id + "</td>");
				items.push("<td>" + val.category + "</td>");
				items.push("<td>" + val.topic + "</td>");
				items.push("<td>" + val.price + "</td>");
				items.push("<td>" + val.details + "</td>");
				items.push("<td>" + val.date_time + "</td>");
				items.push("<td><button onclick='getRow()' type='button' class='btn btn-info btn-fill'>Edit</button></td>");
				items.push("<td><button onclick='delet()' type='button' class='btn btn-danger btn-fill'>Delete</button></td>");
				items.push("</tr>");
			});
		$("<tbody/>", {
			html : items.join("")
		}).appendTo("#table");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Ajax request fail");
		},
		timeout : 120000,
	});
}

function getJSON() {
	return JSON.stringify({
		"project_id" : $('#project_id').val(),
		"category" : $('#category').val(),
		"topic" : $('#topic').val(),
		"price" : $('#price').val(),
		"details" : $('#details').val(),
		"date_time" : $('#date_time').val(),
	});
}

function ValidInput(){
	var project_id = $('#project_id').val();
	var category = $('#category').val();
	var topic = $('#topic').val();
	var price = $('#price').val();
	var details = $('#details').val();
	var date_time = $('#date_time').val();
	var project_id = $('#project_id').val();
	var category = $('#category').val();
	var topic = $('#topic').val();
	var price = $('#price').val();
	var details = $('#details').val();
	var date_time = $('#date_time').val();
	if(project_id === "" || category === "" || topic === "" || price === "" || details === "" || date_time === ""){
		return false;
	}else{
		return true;
	}
	return true;
}

function search(){
$("#idTable").find("tr:gt(0)").remove();
	var searchID = $('#searchID').val();
	if(searchID === ""){
		alert("Please Enter ID")
	}else{
	$.ajax({
		url : 'http://localhost:8080/gb/webresources/ProjectResources/Project/' + searchID,
		method : 'GET',
		headers : {
			Accept : "application/json",
			"Content-Type" : "application/json"
		},
		success : function(data, textStatus, errorThrown) {
			var items = [];
			$.each(data,function(key, val) {
				var index = key + 1;
				items.push("<tr>");
				items.push("<td>" + index + "</td>");
				items.push("<td>" + val.project_id + "</td>");
				items.push("<td>" + val.category + "</td>");
				items.push("<td>" + val.topic + "</td>");
				items.push("<td>" + val.price + "</td>");
				items.push("<td>" + val.details + "</td>");
				items.push("<td>" + val.date_time + "</td>");
				items.push("<td><button onclick='getRow()' type='button' class='btn btn-info btn-fill'>Edit</button></td>");
				items.push("<td><button onclick='delet()' type='button' class='btn btn-danger btn-fill'>Delete</button></td>");
				items.push("</tr>");
			});
		$("<tbody/>", {
			html : items.join("")
		}).appendTo("#idTable");
	},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Ajax request fail");
		},
		timeout : 120000,
		});
	}
}