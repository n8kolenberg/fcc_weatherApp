
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
		humidity: "",
		backgroundImage: "",
		minTemp: "",
		maxTemp: "",
		partOfDay: "day",
		weatherCode: "",
		weatherIcon: "",
	},

	mounted() {
		//Request to get the user's position - This works faster than using the user's browser navigator object
		axios.get("https://freegeoip.net/json/")
		    .then(function(response) {
		    	console.log("location data: ");
		    	console.log(response);
		        this.app.country = response.data.country_name;
		        this.app.city = response.data.city;
		        this.app.latitude = response.data.latitude;
		        this.app.longitude = response.data.longitude;
		        this.app.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + response.data.city+"')";
		        this.app.body.style.backgroundImage = this.app.backgroundImage;


				//Request to get the weather data
		        axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${this.app.latitude}&lon=${this.app.longitude}&units=metric&APPID=70c6cab3644a8c0121ec7f04c30ffc9c`)
		            .then(function(response) {
		                // console.log("Weather data: ");
		                // console.log(response);

		                this.app.weather = titleCase(response.data.list[0].weather[0].description);
		                this.app.temperature = response.data.list[0].main.temp;
		                this.app.minTemp = response.data.list[0].main.temp;
		                this.app.maxTemp = response.data.list[0].main.temp;
		                this.app.humidity = response.data.list[0].main.humidity;
		                //I use the weatherCode to link to the weather icons
		                this.app.weatherCode = response.data.list[0].weather[0].id;

		                //Now we'll check the time of day to utilize the day/night weather icons
						let date = new Date();
						if(date > 19) {
							this.partOfDay = "night";
						}
       
				        //Weather icon CSS class build up to add to HTML
				  		this.app.weatherIcon = `wIns wi wi-owm-${this.app.partOfDay}-${this.app.weatherCode}`;

		            });
        

		    });

	},

	created() {
		//This is to ensure the background gets the Unsplash image based on user's location
		this.body.style.backgroundImage = this.backgroundImage;
		
	},

	methods: {
		toggleTempScale() {
			if (this.tempScale == "C") {
				this.temperature = parseFloat(((this.temperature * 1.8) + 32).toFixed(2));
				this.minTemp = parseFloat(((this.minTemp * 1.8) + 32).toFixed(2));
				this.maxTemp = parseFloat(((this.maxTemp * 1.8) + 32).toFixed(2));
				this.tempScale = "F";
			} else {
				this.temperature = parseFloat(((this.temperature - 32) * (5/9)).toFixed(2));
				this.minTemp = parseFloat(((this.minTemp - 32) * (5/9)).toFixed(2));
				this.maxTemp = parseFloat(((this.maxTemp - 32) * (5/9)).toFixed(2));
				this.tempScale = "C";
			}
		},


	}

});