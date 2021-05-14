function getRow() {
	var table = document.getElementById('table');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("funding_id").value = this.cells[1].textContent;
			document.getElementById("name").value = this.cells[2].textContent;
			document.getElementById("description").value = this.cells[3].textContent;
			document.getElementById("loyalty").value = this.cells[4].textContent;
			document.getElementById("date_time").value = this.cells[5].textContent;
		};
	}
}

function getRowSearch() {
	var table = document.getElementById('idTable');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("funding_id").value = this.cells[1].textContent;
			document.getElementById("name").value = this.cells[2].textContent;
			document.getElementById("description").value = this.cells[3].textContent;
			document.getElementById("loyalty").value = this.cells[4].textContent;
			document.getElementById("date_time").value = this.cells[5].textContent;
		};
	}
}

function getID() {
	var table = document.getElementById('table');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("funding_id").value = this.cells[1].textContent;
		};
	}
}

function getIDserch() {
	var table = document.getElementById('idTable');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("funding_id").value = this.cells[1].textContent;
		};
	}
}

function resetForm() {
	document.getElementById("funding_id").value = "0";
	document.getElementById("name").value = "";
	document.getElementById("description").value = "";
	document.getElementById("loyalty").value = "";
	document.getElementById("date_time").value = "";
}

function save() {
	var funding_id = $('#funding_id').val();
	funding_id = parseInt(funding_id);
	if (funding_id === 0) {
		if(ValidInput()){
			$.ajax({
				url : 'http://localhost:8080/gb/webresources/FundingResources/Funding',
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
				url : 'http://localhost:8080/gb/webresources/FundingResources/Funding',
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
					url : 'http://localhost:8080/gb/webresources/FundingResources/Funding/' + $('#funding_id').val(),
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
					url : 'http://localhost:8080/gb/webresources/FundingResources/Funding/' + $('#funding_id').val(),
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
		url : 'http://localhost:8080/gb/webresources/FundingResources/Fundings',
		method : 'GET',
		headers : {
			Accept : "application/json",
			"Content-Type" : "application/json"
		},
		success : function(data, textStatus, errorThrown) {
			var items = [];
			$.each(data.funding,function(key, val) {
				var index = key + 1;
				items.push("<tr>");
				items.push("<td>" + index + "</td>");
				items.push("<td>" + val.funding_id + "</td>");
				items.push("<td>" + val.name + "</td>");
				items.push("<td>" + val.description + "</td>");
				items.push("<td>" + val.loyalty + "</td>");
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
		"funding_id" : $('#funding_id').val(),
		"name" : $('#name').val(),
		"description" : $('#description').val(),
		"loyalty" : $('#loyalty').val(),
		"date_time" : $('#date_time').val(),
	});
}

function ValidInput(){
	var funding_id = $('#funding_id').val();
	var name = $('#name').val();
	var description = $('#description').val();
	var loyalty = $('#loyalty').val();
	var date_time = $('#date_time').val();
	var funding_id = $('#funding_id').val();
	var name = $('#name').val();
	var description = $('#description').val();
	var loyalty = $('#loyalty').val();
	var date_time = $('#date_time').val();
	if(funding_id === "" || name === "" || description === "" || loyalty === "" || date_time === ""){
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
		url : 'http://localhost:8080/gb/webresources/FundingResources/Funding/' + searchID,
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
				items.push("<td>" + val.funding_id + "</td>");
				items.push("<td>" + val.name + "</td>");
				items.push("<td>" + val.description + "</td>");
				items.push("<td>" + val.loyalty + "</td>");
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