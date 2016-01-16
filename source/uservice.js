var jsonfile = require('jsonfile');
jsonfile.spaces = 4;
var _ = require('underscore');
var path = require('path');
var file = path.join(__dirname,'users.json'); //join the current directory with the file name

/*
addUser:
	Add user object using the following json format
		var user1 = {
                "firstName": "Andre",
                "lastName": "Green",
                "isAlpha": true,
                "email":"andre@cern.ch",
                "fbLink": "http://www.facebook.com/andre",
                "fbID": "1",
                "img": "http://www.facebook.com/andre.jpg",
                "coordinate":{
                    "latitude":"37.640090",
                    "longitude":"-121.000346"
                }
getByID(fbID):
	returns the users email given facebookID
getCoordinates(email):
	returns coordinate object given email in the following format
		coordinate:{latitude,longitude}
getAlpha():
	returns the email address of the current alpha
getName(email):
	returns fullname object given an email
		fullname:{firstname,lastname};
getMember(email):
	returns true if email exists, false if does not exist
*/



module.exports = {
	/*
	Adds users to json file
	need to incorporate callbacks
	*/
	users:{},
	addUser: function(userobject){
			console.log("Creating New User");
			this.users[userobject.email] = userobject;

				jsonfile.writeFile(file,this.users,function(err){
					if(err){
						console.log(err);
					}else
					console.log("User Data uploaded succesfully");
				});
	},
	/*
	looks for users based on FBID. Returns user email.
	*/
	getByID: function(id){
		jsonfile.readFile(file, function(err,obj){
			if(err){
				console.log(err);
			}else
			var foundUser = _.find(obj,{fbID: id});
			if(foundUser != undefined){
				console.log("The Following user was found")
				console.dir(foundUser.email);
				return foundUser.email;
			}else
				console.log("No matching user found");
		});
	},
	/*
	Find by email, return object of user data
	*/
	getUser: function(emailArg){
		jsonfile.readFile(file, function(err,data){
			if(err){
				console.log(err);
			}else
			var foundUser = _.find(data,{email: emailArg});
			if(foundUser != undefined){
				console.log("The Following user was found")
				console.dir(foundUser);
				return foundUser;
			}else
				console.log("No matching user found");
		});	
	},
	getCoordinates: function(emailArg){
		jsonfile.readFile(file, function(err,data){
			if(err){
				console.log(err);
			}else
			var foundUser = _.find(data,{email: emailArg});
			if(foundUser != undefined){
				console.dir(foundUser.firstName +" "+foundUser.lastName+" was found at "+foundUser.coordinate.latitude+" "+foundUser.coordinate.longitude);
				return foundUser.coordinate;
			}else
				console.log("No matching user found");
		});	
	},
	setCoordinates: function(userObject){
		
	},
	getAlpha: function(){
		jsonfile.readFile(file, function(err,data){
			if(err){
				console.log(err);
			}else
			var foundUser = _.find(data,{isAlpha: true});
			if(foundUser != undefined){
				console.dir(foundUser.email + " is the current alpha.");
				return foundUser.email;
			}else
				console.log("No matching user found");
		});	
	},
	getName: function(emailArg){
		jsonfile.readFile(file, function(err,data){
			if(err){
				console.log(err);
			}else
			var foundUser = _.find(data,{email: emailArg});
			if(foundUser != undefined){
				var firstName = foundUser.firstName;
				var lastName = foundUser.lastName;
				var fullName = {firstName, lastName};
				console.dir(fullName.firstName + " "+ fullName.lastName);
				return fullName;
			}else
				console.log("No matching user found");
		});	
	},
	isMember: function(emailArg){
		jsonfile.readFile(file, function(err,data){
			if(err){
				console.log(err);
			}else
			var foundUser = _.find(data,{email: emailArg});
			if(foundUser != undefined){
				console.dir(foundUser.firstName + " "+ foundUser.lastName+" is a member");
				return true;
			}else{
				console.dir(foundUser);
				console.log(emailArg+ " is not registered");
				return false;
			}
		});	
	}
};


