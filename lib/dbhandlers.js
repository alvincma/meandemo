/**
 * Helper module to read divisions list and division's team list from MongoDB
 *
 * Author: Alvin Ma
 *
 */

var errorResp = {
    error: {
        message: "Unknown error",
        code: 500
    },
    data: null
};

var successResp = {
    error: null,
    data: {}
};

function divisionListHandler(req, res) {
    loadDivisionListFromDb(function(err, data) {
        if (err) {
            res.writeHead(503, {"Content-Type": "application/json"});
            errorResp.error = err;
            res.end(JSON.stringify(errorResp) + "\n");
            return;
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            successResp.data = data;
            res.end(JSON.stringify(successResp) + "\n");
            return;
        }
    });
}

function divisionTeamListHandler(req, res) {
    var divisionName = req.params.divisionName;

    loadDivisionTeamListFromDb(divisionName, function(err, data) {
        if (err) {
            res.writeHead(503, {"Content-Type": "application/json"});
            errorResp.error = err;
            res.end(JSON.stringify(errorResp) + "\n");
            return;

        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            successResp.data = data;
            res.end(JSON.stringify(successResp) + "\n");
            return;
        }
    })
}

function loadDivisionListFromDb(callback) {
	mongodb.connect(url, function(err, db) {
		var divisions = [];
		
		if (err) {
			throw err;
		} else {
			db.listCollections().toArray(function(err, cols) {
				if (err) {
					throw err;
				} else {
					for (var index = 0; index < cols.length; index++) {
						if (cols[index].name != "system.indexes") {
							var div = cols[index].name;
							var obj = {name: div};
							divisions.push(obj);
						}
					}
					callback(null, divisions);
				}
			});
		}
	});
}

function loadDivisionTeamListFromDb(division_name, callback) {
	mongodb.connect(url, function(err, db) {
		var division_teams = [];
		
		if (err) {
			throw err;
		} else {
			var collection = db.collection(division_name);
			
			collection.find().toArray(function(err, docs) {
				if (err) {
					throw err;
				} else {
					for (var index = 0; index < docs.length; index++) {
						var obj = {
							teamname: docs[index].name,
							headcoach: docs[index].headcoach
						};
						division_teams.push(obj);
					}
					var obj = {
						short_name: division_name,
						teams: division_teams
					};
					callback(null, obj);
				}
			})
		}	
	});
}

module.exports.divisionListHandler = divisionListHandler;
module.exports.divisionTeamListHandler = divisionTeamListHandler;