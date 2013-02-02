GMN.Admin.Board = function(_options) {
	var options = {
			"refreshBoardInterval":1000
		}

	var boardTimer,
		started = false;

	for(var option in _options) {
		options[option] = _options[option];
	}

	var getData = function(callback) {
		$.ajax({
			"url": GMN.Server.Config.getServer() + ":" + GMN.Server.Config.getPort() + "/admin/board/" + GMN.Server.Config.getAdminPassword(),
			"complete": function(data) {
				var msg = data.responseText ? JSON.parse(data.responseText) : {error:'0', message:'unhandled error'};
				callback(msg,data.status);
			}
		})
	}
	var refreshBoard = function() {
		getData(function(data,status){
			//console.log(status);
			if(status === 200) {
				//console.log(data);
				$(".error").hide();
				var source = $("#board").html();
				var template = Handlebars.compile(source);
				for(var i = 0; i < data.players.length; i++) data.players[i].serverTime = data.stats.serverTime;
				var html = template(data);
				$(".boardTableContainer").html(html);



			} else {
				stop();
				$("#startButton").removeAttr("disabled");
				$("#stopButton").attr("disabled", "disabled");
				$("#boardContainer").hide();
				$("#loginContainer").show();
				$(".error").text("ERROR " + status + ": " + data.message).show();
			}
			if(started) {
				boardTimer = setTimeout(refreshBoard, options.refreshBoardInterval);
			} else {
				console.log("stoped");
			}
		});
	}
	var reset = function(){
		$.ajax({
			url: GMN.Server.Config.getServer() +":"+ GMN.Server.Config.getPort() + "/admin/reset/1234"})
			.statusCode({
				200:function(){console.log("Players restarted")},
				401:function(){console.log("Admin password is incorrect")}
			})
	}	

	var start = function() {
		started = true;
		//console.log("starting");
		boardTimer = setTimeout(refreshBoard, options.refreshBoardInterval);
	}

	var stop = function() {
		started = false;
		//console.log("stoping");
		clearTimeout(boardTimer);
	}
	var version = function() {
		$.ajax({
			"url":GMN.Server.Config.getServer()+":"+GMN.Server.Config.getPort()+"/version",
			"complete": function(data){
				var msg=JSON.parse(data.responseText);
				if (data.status === 200){
					$("#version").val("Version:" + msg.version);
					console.log("Version " + msg.version);
				}else{
					$(".error").text("ERROR Get version Error");
				}
			}
		})
	}
	return {
		"start":start,
		"stop":stop,

		"version":version
		"reset":reset 

	}
}
