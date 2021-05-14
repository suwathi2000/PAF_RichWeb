function getRow() {
	var table = document.getElementById('table');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("user_id").value = this.cells[1].textContent;
			document.getElementById("full_name").value = this.cells[2].textContent;
			document.getElementById("user_type").value = this.cells[3].textContent;
			document.getElementById("username").value = this.cells[4].textContent;
			document.getElementById("password").value = this.cells[5].textContent;
			document.getElementById("date_time").value = this.cells[6].textContent;
		};
	}
}

function getRowSearch() {
	var table = document.getElementById('idTable');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("user_id").value = this.cells[1].textContent;
			document.getElementById("full_name").value = this.cells[2].textContent;
			document.getElementById("user_type").value = this.cells[3].textContent;
			document.getElementById("username").value = this.cells[4].textContent;
			document.getElementById("password").value = this.cells[5].textContent;
			document.getElementById("date_time").value = this.cells[6].textContent;
		};
	}
}

function getID() {
	var table = document.getElementById('table');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("user_id").value = this.cells[1].textContent;
		};
	}
}

function getIDserch() {
	var table = document.getElementById('idTable');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("user_id").value = this.cells[1].textContent;
		};
	}
}

function resetForm() {
	document.getElementById("user_id").value = "0";
	document.getElementById("full_name").value = "";
	document.getElementById("user_type").value = "";
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	document.getElementById("date_time").value = "";
}

function save() {
	var user_id = $('#user_id').val();
	user_id = parseInt(user_id);
	if (user_id === 0) {
		if(ValidInput()){
			$.ajax({
				url : 'http://localhost:8080/gb/webresources/UserResources/User',
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
				url : 'http://localhost:8080/gb/webresources/UserResources/User',
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
					url : 'http://localhost:8080/gb/webresources/UserResources/User/' + $('#user_id').val(),
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
					url : 'http://localhost:8080/gb/webresources/UserResources/User/' + $('#user_id').val(),
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
		url : 'http://localhost:8080/gb/webresources/UserResources/Users',
		method : 'GET',
		headers : {
			Accept : "application/json",
			"Content-Type" : "application/json"
		},
		success : function(data, textStatus, errorThrown) {
			var items = [];
			$.each(data.user,function(key, val) {
				var index = key + 1;
				items.push("<tr>");
				items.push("<td>" + index + "</td>");
				items.push("<td>" + val.user_id + "</td>");
				items.push("<td>" + val.full_name + "</td>");
				items.push("<td>" + val.user_type + "</td>");
				items.push("<td>" + val.username + "</td>");
				items.push("<td>" + val.password + "</td>");
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
		"user_id" : $('#user_id').val(),
		"full_name" : $('#full_name').val(),
		"user_type" : $('#user_type').val(),
		"username" : $('#username').val(),
		"password" : $('#password').val(),
		"date_time" : $('#date_time').val(),
	});
}

function ValidInput(){
	var user_id = $('#user_id').val();
	var full_name = $('#full_name').val();
	var user_type = $('#user_type').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var date_time = $('#date_time').val();
	var user_id = $('#user_id').val();
	var full_name = $('#full_name').val();
	var user_type = $('#user_type').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var date_time = $('#date_time').val();
	if(user_id === "" || full_name === "" || user_type === "" || username === "" || password === "" || date_time === ""){
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
		url : 'http://localhost:8080/gb/webresources/UserResources/User/' + searchID,
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
				items.push("<td>" + val.user_id + "</td>");
				items.push("<td>" + val.full_name + "</td>");
				items.push("<td>" + val.user_type + "</td>");
				items.push("<td>" + val.username + "</td>");
				items.push("<td>" + val.password + "</td>");
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