<template>
       
     <router-link  to="/">  <div class="header"></div></router-link>

  <div class="container-fluid"  style="margin-right:0">
    <div class="card" style="width:50%;height:50%">
    <div class="row">
      <div class="col-sm-4">
       
          <p>{{ this.weather.address }}</p>
          <div class="card-body">
            <h5 class="card-title">{{}}</h5>
            <!-- <p class="card-text">
                 With supporting text below as a natural lead-in to additional
                 content.
               </p> -->
            <p>{{ this.weather.timezone }}</p>
            <p>{{ this.weather.latitude }}</p>

            <p>{{ this.weather.longitude }}</p>
          </div>
     
      </div>
      <div class="col-sm-4">
        <i :class="this.weather.currentConditions.icon"></i>
        <p>{{ this.weather.currentConditions.temp }}</p>
      </div>
      <div class="col-sm-4">
        Feels like
        <p>{{ this.weather.currentConditions.feelslike }}</p>
        Humidity
        <p>{{ this.weather.currentConditions.humidity }}</p>
        Pressure
        <p>{{ this.weather.currentConditions.pressure }}</p>
        Wind
        <p>{{ this.weather.currentConditions.windspeed }}</p>
        UV index
        <p>{{ this.weather.currentConditions.uvindex }}</p>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid" style="margin-right:0">
  <div class="card" style="width:100%;height:100%">
    <template v-for="day in this.threeDaysForecast.days" :key="day.id">
    <div  class="row">  <p>{{day.datetime}}</p></div>
    <div class="row">
        <template  v-for="hour in day.hours" :key="hour.id">
          <span style="display:inline-block;vertical-align:top; width:4.1%;" >{{moment(hour.datetime,"h:mm:ss").format('H')}} h</span>
   
        </template>
        <template   v-for="hour in day.hours" :key="hour.id">
          <span style="display:inline-block;vertical-align:top; width:4.1%;" > {{hour.temp}}</span>
           
        </template>

        <template   v-for="hour in day.hours" :key="hour.id">
          <i style="display:inline-block;vertical-align:top; width:4.1%;" :class="hour.icon"></i>
           
        </template>
      </div>
      </template>
      


 
 
  </div>

</div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "CityWeather",
  data() {
    return {
      country: this.$route.query.country,
      weather: [],
      threeDaysForecast:[]
    };
  },
  created() {
    this.moment = moment;
    this.getCurrentTemperatureForChosenCity();
    this.getTimelineForecastForNextThreeDays();
  },
  methods: {
    getCurrentTemperatureForChosenCity() {
      axios
        .get(
        //   "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/forecast?aggregateHours=1&contentType=json&unitGroup=metric&locationMode=single&key=UDH8H5X7LKJQHAHQ5EZ3FUVL8&locations=" +
        //     this.country

            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+this.country+"/today?include=fcst%2Cobs%2Chistfcst%2Cstats%2Ccurrent&unitGroup=metric&key=UDH8H5X7LKJQHAHQ5EZ3FUVL8&contentType=json"
        )
        .then((response) => {
          this.weather = response.data;
        });
    },
    getTimelineForecastForNextThreeDays(){
      axios
        .get(
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+this.country+"/next2days?key=UDH8H5X7LKJQHAHQ5EZ3FUVL8&unitGroup=metric"
        )
        .then((response) => {
          this.threeDaysForecast = response.data;
        });
    }
  },
};
</script>

<style>
/* weather icons */
.clear-day {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/clear-day.svg") 0 0 / contain
    no-repeat;
}

.clear-day::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.clear-night {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/clear-night.svg") 0 0 / contain
    no-repeat;
}

.clear-night::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.cloudy {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/cloudy.svg") 0 0 / contain no-repeat;
}

.cloudy::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.fog {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/fog.svg") 0 0 / contain no-repeat;
}

.fog::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.hail {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/hail.svg") 0 0 / contain no-repeat;
}

.hail::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.partly-cloudy-day {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/partly-cloudy-day.svg") 0 0 / contain
    no-repeat;
}

.partly-cloudy-day::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.partly-cloudy-night {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/partly-cloudy-night.svg") 0 0 /
    contain no-repeat;
}

.partly-cloudy-night::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.rain-snow-showers-day {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/rain-snow-showers-day.svg") 0 0 /
    contain no-repeat;
}

.rain-snow-showers-day ::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.rain-snow-showers-night {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/rain-snow-showers-night.svg") 0 0 /
    contain no-repeat;
}

.rain-snow-showers-night::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.rain-snow {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/rain-snow.svg") 0 0 / contain
    no-repeat;
}

.rain-snow::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.rain {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/rain.svg") 0 0 / contain no-repeat;
}

.rain::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.showers-day {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/showers-day.svg") 0 0 / contain
    no-repeat;
}

.showers-day::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.showers-night {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/showers-night.svg") 0 0 / contain
    no-repeat;
}

.showers-night::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.sleet {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/sleet.svg") 0 0 / contain no-repeat;
}

.sleet::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.snow-showers-day {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/snow-showers-day.svg") 0 0 / contain
    no-repeat;
}

.snow-showers-day::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.snow-showers-night {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/snow-showers-night.svg") 0 0 / contain
    no-repeat;
}

.snow-showers-night::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.snow {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/snow.svg") 0 0 / contain no-repeat;
}

.snow::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.thunder-rain {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/thunder-rain.svg") 0 0 / contain
    no-repeat;
}

.thunder-rain::before {
  content: "";
  display: block;
  padding-top: 100%;
}
.thunder-showers-day {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/thunder-showers-day.svg") 0 0 /
    contain no-repeat;
}

.thunder-showers-day::before {
  content: "";
  display: block;
  padding-top: 100%;
}
.thunder-showers-night {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/thunder-showers-night.svg") 0 0 /
    contain no-repeat;
}

.thunder-showers-night::before {
  content: "";
  display: block;
  padding-top: 100%;
}
.thunder-rain {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/thunder-rain.svg") 0 0 / contain
    no-repeat;
}

.thunder-rain::before {
  content: "";
  display: block;
  padding-top: 100%;
}
.wind {
  display: inline-block;
  width: 1rem;
  background: url("../assets/weatherIcons/wind.svg") 0 0 / contain no-repeat;
}

.wind::before {
  content: "";
  display: block;
  padding-top: 100%;
}
</style>
