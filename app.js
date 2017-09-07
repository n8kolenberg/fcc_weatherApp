//we need to get the user's location based on their browser's navigator object
// navigator.geolocation.getCurrentPosition((position)=> {console.log(position.coords.latitude)});




// Then we need to get the weather data from the freecodeCamp api at https://fcc-weather-api.glitch.me/ or any other api


// api.openweathermap.org/data/2.5/weather?lat=35&lon=139
// https://fcc-weather-api.glitch.me/

//Once the response is returned, parse through it and get the weather which will allow us to make further modifications
//through if statements



//Ensure that the user can choose Fahrenheit or Celsius for degrees

function titleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/, (L) => L.toUpperCase());
}

var app = new Vue({
	el: "#root",
	data: {
		message: "hello world",
		country: "",
		city: "",
		weather: "",
		latitude: "",
		longitude: "",
		temperature: ""
	},

	mounted() {
		axios.get("https://freegeoip.net/json/")
		    .then(function(response) {
		        console.log(response.data);
		        // this.app.message = "Now I've changed";
		     // var country_code = response.data.country_code;
		        this.app.country = response.data.country_name;
		        this.app.city = response.data.city;
		        this.app.latitude = response.data.latitude;
		        this.app.longitude = response.data.longitude;

		        console.log("Country Name: " + this.app.country);
		        console.log("Latitude: " + this.app.latitude);
		        console.log("Longitude: " + this.app.longitude);

		        axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${this.app.latitude}&lon=${this.app.longitude}`)
		            .then(function(response) {
		                console.log(response);
		                this.app.weather = titleCase(response.data.weather[0].description);
		                this.app.temperature = response.data.main.temp;
		            });
		    });
	},

	methods: {
		toFahrenheit() {
			// this.temperature * 1.8 + 32;
			console.log(this.app.data.temperature);
		},


	}

});