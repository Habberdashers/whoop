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
 "picLink": "http://www.facebook.com/andre.jpg",
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

// Distance where new user will be added
var CUT_OFF_DISTANCE = 20.0;

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
	Find by email, return object of user data
	*/
	getUser: function(emailArg){
		console.log("Attaining UserProfile...");
		return _.find(this.users, {email:emailArg});
	},

	getCoordinates: function(emailArg){
		console.log("Attaining Coordinates...");
		var foundUser = this.getUser(emailArg);
		if(!foundUser){
			console.log("User Not found");
			return null;
		}

		var coordinates = foundUser.coordinate;
		console.log("coordinates found: ");
		console.dir(coordinates);
		return coordinates;
    },

    getAlpha: function(callback) {
        var foundUser = _.find(this.users, {isAlpha:true});
        console.log("Looking for Alpha");
        if(!foundUser){
            console.log("No alpha");
            callback(new Error("No Alpha"),null);
            return;
        }
        //console.dir(foundUser);
        callback(null, foundUser);
    },

    getUsersSync: function() {
        return jsonfile.readFileSync(file);
    },

    getAlphaSync: function() {
        var users = this.getUsersSync();
        return _.find(users, {isAlpha:true});
    },
    /*
     looks for users based on FBID. Returns user email.
     */
    getByID: function(id, callback) {
        jsonfile.readFile(file, function(err,obj) {
            if(err) {
                console.log(err);
                callback(err);
                return;
            }


            var foundUser = _.find(obj,{fbID: id});
            if(foundUser) {
                console.log("The Following user was found");
                console.dir(foundUser.email);
                callback(foundUser);
            } else {
                console.log("No matching user found");
                callback(null);
            }
        });
    },

    isMember: function(emailArg) {
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
    
	getName: function(emailArg){
		console.log('Getting name...');
		var foundUser = _.find(this.users, {email: emailArg}); //retrieve user information
		return {
            firstName: foundUser.firstName,
            lastName: foundUser.lastName
        };
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
		return distance < CUT_OFF_DISTANCE;
	}
};


