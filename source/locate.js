module.exports = {

	//distance from each other
	distanceCalc: function(userLocation, pt){

		//distance between the two points 
		var earthRadius = 6371009.0; //in meters
		var lat1 = userLocation.latitude; //user location latitude
		//////////////////////////////////////////////////////////////
		lat1 = lat1 * (Math.PI/180); //convert lat1 to radians
		var lat2 = pt.latitude;// event location latitude
		lat2 = lat2 * (Math.PI/180); //convert lat2 to radians
		//////////////////////////////////////////////////////////////
		var long1 = userLocation.longitude; //user location longitude
		long1 = long1 * (Math.PI/180); //convert long1 to radians
		var long2 = pt.longitude; //event location longitude
		long2 = long2 * (Math.PI/180); //convert long2 to radians
		//change in latitude
		var d_latitude = lat1-lat2; //total change in latitude
		//change in longitude
		var d_longitude = long1-long2;//total change in longitude
		//constant
		var k = Math.pow(Math.sin(.5*d_latitude),2) + Math.cos(lat1)*Math.cos(lat2)*Math.pow(Math.sin(.5*d_longitude),2); 
		//distance
		var d = 2.0 *earthRadius*Math.asin(Math.sqrt(k));
		return d; //returned in METERS 
	}
}