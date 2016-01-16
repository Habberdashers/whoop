var jsonfile = require('jsonfile');
jsonfile.Spaces = 4;
var _ = require('underscore');
var path = require('path');
var file = path.join(__dirname,'users.json'); //join the current directory with the file name
var locate = require('./locate');

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
    addUser: function(userobject, callback){
        console.log("Creating New User");
        this.users[userobject.email] = userobject;
        jsonfile.writeFile(file,this.users,function(err){
            if(err){
                console.log(err);
                callback(err);
                return;
            }

			console.log("User Data uploaded succesfully");
			callback(null);
		});
	},
	/*
	looks for users based on FBID. Returns user email.
	*/
	getByID: function(id,callback){
		jsonfile.readFile(file, function(err,obj){
			if(err){
				console.log(err);
				callback(err);
			}else
			var foundUser = _.find(obj,{fbID: id});
			if(foundUser != undefined){
				console.log("The Following user was found")
				console.dir(foundUser.email);
				callback(foundUser);
			}else
				console.log("No matching user found");
				callBack(null);
		});
	},
	/*
	Find by email, return object of user data
	*/
	getUser: function(emailArg){
		console.log("Attaining UserProfile...");
		var foundUser = _.find(this.users.undefined,{email:emailArg});
		if(!foundUser){
			console.log("User Not found");
			return;
		}
		return foundUser;
	},
	getCoordinates: function(emailArg){
		console.log("Attaining Coordinates...");
		var foundUser = _.find(this.users.undefined,{email:emailArg});
		if(foundUser == undefined){
			console.log("User Not found");
			return;
		}
		var coordinates = foundUser.coordinate;
		console.log("coordinates found: ");
		console.dir(coordinates);
		return coordinates;
    },
    /*
     looks for users based on FBID. Returns user email.
     */
    getByID: function(id,callback){
        jsonfile.readFile(file, function(err,obj){
            if(err){
                console.log(err);
                callback(err);
                return;
            }


            var foundUser = _.find(obj,{fbID: id});
            if(foundUser){
                console.log("The Following user was found");
                console.dir(foundUser.email);
                callback(foundUser);
            } else {
                console.log("No matching user found");
                callBack(null);
            }
        });
    },
    /*
     Find by email, return object of user data
     */
    getUser: function(emailArg, callback){
        jsonfile.readFile(file, function(err,data) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }

            var foundUser = _.find(data, {email: emailArg});
            if (!foundUser) {
                console.log("No matching user found");
                callback(null);

            } else {
                console.log("The Following user was found");
                console.dir(foundUser);
                callback(foundUser);
            }
        });
    },
    getCoordinates: function(emailArg){
        console.log("Attaining Coordinates...");
        var foundUser = _.find(this.users,{email:emailArg});
        if(!foundUser) {
            console.log("User Not found");
            return;
        }

        var coordinates = foundUser.coordinate;
        console.log("coordinates found: ", coordinates);
        console.dir(coordinates);
        return coordinates;
    },
    getAlpha: function(callback){
        var foundUser = _.find(this.users.undefined,{isAlpha:true});
        console.log("Looking for Alpha");
        if(!foundUser){
            console.log("No alpha");
            return;
        }
        //console.dir(foundUser);
        return foundUser;
    },
    getName: function(emailArg){
        console.log('Getting name...');
        var foundUser = __.find(this.users, {email: emailArg}); //retrieve user information
        return {
            firstName: foundUser.firstName,
            lastName: foundUser.lastName
        };
    },
    isMember: function(emailArg){
        console.log("searching for member");
        var foundUser = _.find(this.users, {email:emailArg});
        if(foundUser != null){
            console.log("User is member");
            return true;
        } else
            console.log("user not found");
        return false;
        /*
         jsonfile.readFile(file, function(err,data){
         if(err){
         console.log(err);
         callback(err);
         }else
         var foundUser = _.find(data,{email: emailArg});
         if(foundUser != undefined){
         console.dir(foundUser.firstName + " "+ foundUser.lastName+" is a member");
         callback(true);
         }else{
         console.dir(foundUser);
         console.log(emailArg+ " is not registered");
         callback(false);
         }
         });
         */
    },
    getAllUsers: function(){
        return this.users;
    },

    //get distances between Users and
    getDistance: function(userProfile){
        //get  coordinates
        var coordinates = userProfile.coordinate; //get user coordinate
        var alphaProfile = getAlpha; //get alpha
        var alphaCoordinates = alphaProfile.coordinate; //get alpha coordinates
        //calculated distance
        var distance = locate.distanceCalc(coordinates,alphaCoordinates);
        if(distance < 10){ //agreed upon distance to Alpha
            return true;
        }else{
            return false;
        }
	},
    
	getName: function(emailArg){
		console.log('Getting name...');
		var foundUser = _.find(this.users.undefined, {email: emailArg}); //retrieve user information
		var firstName = foundUser.firstName; //retrieve first name from emailArg object
		var lastName = foundUser.lastName; //retrieve last name from emailArg object
		var fullName = {firstName, lastName}; //full name object containing firstname and last name
		return fullName; //return fullName
	},
	isMember: function(emailArg){
		console.log("searching for member");
		var foundUser = _.find(this.users.undefined,{email:emailArg});
		if(foundUser != null){
			console.log("User is member");
			return true;
		} else 
			console.log("user not found");
		return false;
		/*
		jsonfile.readFile(file, function(err,data){
			if(err){
				console.log(err);
				callback(err);
			}else
			var foundUser = _.find(data,{email: emailArg});
			if(foundUser != undefined){
				console.dir(foundUser.firstName + " "+ foundUser.lastName+" is a member");
				callback(true);
			}else{
				console.dir(foundUser);
				console.log(emailArg+ " is not registered");
				callback(false);
			}
		});	
		*/
	},
	getAllUsers: function(){
		return this.users;
	},

	//get distances between Users and
	getDistance: function(userProfile){
		//get  coordinates
		console.dir(userProfile);
		var coordinates = userProfile.coordinate; //get user coordinate
		var alphaProfile = this.getAlpha(); //get alpha
		var alphaCoordinates = alphaProfile.coordinate; //get alpha coordinates
		console.log(coordinates);
		console.log(alphaCoordinates);
		//calculated distance
		var distance = locate.distanceCalc(coordinates,alphaCoordinates);
		console.dir(distance);
		return distance < 20;
	}
};


