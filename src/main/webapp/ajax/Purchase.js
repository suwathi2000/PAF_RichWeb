function getRow() {
	var table = document.getElementById('table');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("purchase_id").value = this.cells[1].textContent;
			document.getElementById("discount").value = this.cells[2].textContent;
			document.getElementById("date_time").value = this.cells[3].textContent;
			document.getElementById("user_user_id").value = this.cells[4].textContent;
		};
	}
}

function getRowSearch() {
	var table = document.getElementById('idTable');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("purchase_id").value = this.cells[1].textContent;
			document.getElementById("discount").value = this.cells[2].textContent;
			document.getElementById("date_time").value = this.cells[3].textContent;
			document.getElementById("user_user_id").value = this.cells[4].textContent;
		};
	}
}

function getID() {
	var table = document.getElementById('table');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("purchase_id").value = this.cells[1].textContent;
		};
	}
}

function getIDserch() {
	var table = document.getElementById('idTable');
	for (var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function() {
			document.getElementById("purchase_id").value = this.cells[1].textContent;
		};
	}
}

function resetForm() {
	document.getElementById("purchase_id").value = "0";
	document.getElementById("discount").value = "";
	document.getElementById("date_time").value = "";
	document.getElementById("user_user_id").value = "";
}

function save() {
	var purchase_id = $('#purchase_id').val();
	purchase_id = parseInt(purchase_id);
	if (purchase_id === 0) {
		if(ValidInput()){
			$.ajax({
				url : 'http://localhost:8080/gb/webresources/PurchaseResources/Purchase',
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
				url : 'http://localhost:8080/gb/webresources/PurchaseResources/Purchase',
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
					url : 'http://localhost:8080/gb/webresources/PurchaseResources/Purchase/' + $('#purchase_id').val(),
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
					url : 'http://localhost:8080/gb/webresources/PurchaseResources/Purchase/' + $('#purchase_id').val(),
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
		url : 'http://localhost:8080/gb/webresources/PurchaseResources/Purchases',
		method : 'GET',
		headers : {
			Accept : "application/json",
			"Content-Type" : "application/json"
		},
		success : function(data, textStatus, errorThrown) {
			var items = [];
			$.each(data.purchase,function(key, val) {
				var index = key + 1;
				items.push("<tr>");
				items.push("<td>" + index + "</td>");
				items.push("<td>" + val.purchase_id + "</td>");
				items.push("<td>" + val.discount + "</td>");
				items.push("<td>" + val.date_time + "</td>");
				items.push("<td>" + val.user_user_id + "</td>");
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
		"purchase_id" : $('#purchase_id').val(),
		"discount" : $('#discount').val(),
		"date_time" : $('#date_time').val(),
		"user_user_id" : $('#user_user_id').val(),
	});
}

function ValidInput(){
	var purchase_id = $('#purchase_id').val();
	var discount = $('#discount').val();
	var date_time = $('#date_time').val();
	var user_user_id = $('#user_user_id').val();
	var purchase_id = $('#purchase_id').val();
	var discount = $('#discount').val();
	var date_time = $('#date_time').val();
	var user_user_id = $('#user_user_id').val();
	if(purchase_id === "" || discount === "" || date_time === "" || user_user_id === ""){
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
		url : 'http://localhost:8080/gb/webresources/PurchaseResources/Purchase/' + searchID,
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
				items.push("<td>" + val.purchase_id + "</td>");
				items.push("<td>" + val.discount + "</td>");
				items.push("<td>" + val.date_time + "</td>");
				items.push("<td>" + val.user_user_id + "</td>");
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