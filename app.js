
function titleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/, (L) => L.toUpperCase());
}


var mainWrapper = document.getElementById('mainWrapper');

var app = new Vue({
	el: "#root",
	data: {
		body: mainWrapper,
		message: "hello world",
		country: "",
		city: "",
		weather: "",
		latitude: "",
		longitude: "",
		temperature: "",
		tempScale: "C",
		backgroundImage: ""
	},

	mounted() {
		//Request to get the user's position - This works faster than using the user's browser navigator object
		axios.get("https://freegeoip.net/json/")
		    .then(function(response) {
		        this.app.country = response.data.country_name;
		        this.app.city = response.data.city;
		        this.app.latitude = response.data.latitude;
		        this.app.longitude = response.data.longitude;

						//Request to get the weather data
		        axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${this.app.latitude}&lon=${this.app.longitude}`)
		            .then(function(response) {
		                console.log(response);

		                this.app.weather = titleCase(response.data.weather[0].description);
		                this.app.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + response.data.weather[0].main+"')";
		                this.app.temperature = response.data.main.temp;
		         
		                console.log(this.app.backgroundImage);
		                this.app.body.style.backgroundImage = this.app.backgroundImage;

		            });


		    });

	},

	created() {
		this.body.style.backgroundImage = this.backgroundImage;

	},

	methods: {
		toggleTempScale() {
			if (this.tempScale == "C") {
				this.temperature = parseFloat(((this.temperature * 1.8) + 32).toFixed(2));
				this.tempScale = "F";
			} else {
				this.temperature = parseFloat(((this.temperature - 32) * (5/9)).toFixed(2));
				this.tempScale = "C";
			}
		},


	}

});