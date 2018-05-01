// var url = "https://api.solunar.org/solunar/42.66,-84.07,20180128,-4";
var moonphase = document.querySelector('#moonphase');
var moonrise = document.querySelector('#moonrise');
var moonset = document.querySelector('#moonset');
var moontransit = document.querySelector('#moontransit');
var sunrise = document.querySelector('#sunrise');
var sunset = document.querySelector('#sunset');
var suntransit = document.querySelector('#suntransit');

var lat1 = document.querySelector('#lat');
var lng1 = document.querySelector('#lng');
var url1 = document.querySelector('#url');

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
	dd = '0' + dd;
}
if (mm < 10) {
	mm = '0' + mm;
}
var today = yyyy + mm + dd;
// console.log("date:", today);
// var geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDTlQUgZ_30MJJ4EDLKj_-Y8g_GmHu2zmQ"
// var geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=48836&key=AIzaSyDTlQUgZ_30MJJ4EDLKj_-Y8g_GmHu2zmQ"

$('#geo-btn').click(function() {
	var zipcode = $('#zip-code').val();
	var geoUrl =
		'https://maps.googleapis.com/maps/api/geocode/json?address=' +
		zipcode +
		'&key=AIzaSyDTlQUgZ_30MJJ4EDLKj_-Y8g_GmHu2zmQ';
	// console.log(zipcode);
	$.getJSON(geoUrl)
		.done(function(response) {
			console.log(response);
			var lat = response.results[0].geometry.location.lat;
			var lng = response.results[0].geometry.location.lng;
			var url =
				'https://api.solunar.org/solunar/' +
				lat +
				',' +
				lng +
				',' +
				today +
				',-4';

			$.getJSON(url)
				.done(function(res) {
					// console.log(res);
					$('#solunar-results').show();
					lat1.innerText = lat;
					lng1.innerText = lng;
					url1.innerText = url;
					moonphase.innerText = res.moonPhase;
					moonrise.innerText = res.moonRise;
					moonset.innerText = res.moonSet;
					moontransit.innerText = res.moonTransit;
					sunrise.innerText = res.sunRise;
					sunset.innerText = res.sunSet;
					suntransit.innerText = res.sunTransit;
					major1start.innerText = res.major1Start;
					major1stop.innerText = res.major1Stop;
					major2start.innerText = res.major2Start;
					major2stop.innerText = res.major2Stop;
					minor1start.innerText = res.minor1Start;
					minor1stop.innerText = res.minor1Stop;
					minor2start.innerText = res.minor2Start;
					minor2stop.innerText = res.minor2Stop;
				})
				.fail(function() {
					alert('request failed');
				});
		})
		.fail(function() {
			alert('request failed');
		});
});

//function to convert decimal time to hh:mm
function minTommss(decimalTime) {
	var sign = decimalTime < 0 ? '-' : '';
	var hour = Math.floor(Math.abs(decimalTime));
	var min = Math.floor((Math.abs(decimalTime) * 60) % 60);
	return (
		sign + (hour < 10 ? '0' : '') + hour + ':' + (min < 10 ? '0' : '') + min
	);
}
