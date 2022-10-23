<template>
  <div
    class="container-fluid"
    style="margin-right: 0; padding-top: 20px; padding-bottom: 20px"
  >
    <div class="card" style="width: 50%; height: 100%; margin-left: 11rem">
      <div class="row" style="padding-top: 20px">
        <div class="col-sm-4">
          <h1
            class="header-title"
            style="font: normal normal 600 28px/42px Poppins"
          >
            {{ this.weather.address }}
          </h1>

          <p class="header-title">{{ this.weather.timezone }}</p>
          <p class="header-title">
            {{ this.weather.latitude }}° N,{{ this.weather.longitude }}° E
          </p>
        </div>
        <div class="col-sm-4">
          <i
            :class="this.weather.currentConditions.icon"
            style="width: 75px; height: 75px; color: #04353c"
          ></i>
          <p class="header-description">
            {{ this.weather.currentConditions.temp }}°
          </p>
        </div>
        <div class="col-sm-4" style="text-align: left; padding-left: 40px">
          <div>
            <span class="header-info">Feels like </span>
            <span>{{ this.weather.currentConditions.feelslike }}</span>
          </div>
          <div>
            <span class="header-info">Humidity </span>
            <span>{{ this.weather.currentConditions.humidity }} %</span>
          </div>
          <div>
            <span class="header-info">Pressure </span>
            <span>{{ this.weather.currentConditions.pressure }} mbar</span>
          </div>
          <div>
            <span class="header-info">Wind </span>
            <span>{{ this.weather.currentConditions.windspeed }} m/s SE</span>
          </div>
          <div>
            <span class="header-info">UV index </span>
            <span>{{ this.weather.currentConditions.uvindex }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid" style="margin-right: 0">
    <div
      class="card"
      style="width: 80%; height: 100%; margin-left: 11rem; margin-right: 11rem"
    >
      <template v-for="day in this.threeDaysForecast.days" :key="day.id">
        <div class="row" style="padding-left: 20px">
          <p class="date-info">
            {{ moment(day.datetime).format("dddd, MMM DD.") }}
          </p>
        </div>
        <div class="row" style="padding-left: 20px">
          <div class="row" style="padding-left: 20px">
            <template v-for="hour in day.hours" :key="hour.id">
              <span
                style="
                  display: inline-block;
                  vertical-align: top;
                  width: 3.5rem;
                  text-align: left;
                  font-size: 18px;
                  letter-spacing: 0px;
                  color: #04353c;
                  opacity: 1;
                "
                >{{ moment(hour.datetime, "h:mm:ss").format("H") }} h</span
              >
            </template>
          </div>

          <div class="row" style="padding-left: 30px">
            <template v-for="hour in day.hours" :key="hour.id">
              <i
                style="
                  display: inline-block;
                  vertical-align: top;
                  width: 3.5rem;
                  white-space: pre;
                  height: 22px;
                "
                :class="hour.icon"
              ></i>
            </template>
          </div>
          <div class="row" style="padding-left: 20px; padding-bottom: 10px">
            <template v-for="hour in day.hours" :key="hour.id">
              <span
                style="
                  display: inline-block;
                  vertical-align: top;
                  width: 3.5rem;
                  white-space: pre;
                "
              >
                {{ hour.temp }}°</span
              >
            </template>
          </div>
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
      threeDaysForecast: [],
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

          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
            this.country +
            "/today?include=fcst%2Cobs%2Chistfcst%2Cstats%2Ccurrent&unitGroup=metric&key=UDH8H5X7LKJQHAHQ5EZ3FUVL8&contentType=json"
        )
        .then((response) => {
          this.weather = response.data;
        });
    },
    getTimelineForecastForNextThreeDays() {
      axios
        .get(
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
            this.country +
            "/next2days?key=UDH8H5X7LKJQHAHQ5EZ3FUVL8&unitGroup=metric"
        )
        .then((response) => {
          this.threeDaysForecast = response.data;
        });
    },
  },
};
</script>

<style>
.header-title {
  text-align: left;
  letter-spacing: 0px;
  color: #04353c;
  opacity: 1;
  padding-left: 20px;
}
.header-description {
  font: normal normal 600 48px/72px Poppins;
  letter-spacing: 0px;
  color: #04353c;
  opacity: 1;
}
.header-info {
  text-align: left;
  font-size: 18px;
  letter-spacing: 0px;
  color: #04353c;
  opacity: 1;
}
.date-info {
  text-align: left;
  font: normal normal 600 22px/33px Poppins;
  letter-spacing: 0px;
  color: #04353c;
  opacity: 1;
}
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
  fill: green;
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
