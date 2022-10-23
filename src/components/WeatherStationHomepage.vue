<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <p class="headerTitle">Add cities</p>
        <p class="headerDescription">
          Add 5 cities whose temperature you want to track
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="searchbox">
          <div class="input-group mb-3">
            <label style="width: 100%">
              <input
                type="text"
                class="form-control search"
                id="search"
                v-model="searchTerm"
                placeholder="Add a city..."
            /></label>
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="submit"
                @click="getCityBySearchTerm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="results">
      <ul v-if="searchCountries.length">
        <!-- <li >
            Showing {{ searchCountries.length }} of {{ countries.length }} results
          </li> -->
        <li
          v-for="country in searchCountries"
          :key="country.name"
          @click="
            selectCountry(country);
            getCurrentTemperatureForChosenCity(country);
          "
        >
          {{ country.name }}
        </li>
      </ul>
    </div>
    <!-- <p v-if="selectedCountry" class="text-lg pt-2 absolute">
          You have selected:
          <span class="font-semibold">{{ selectedCountry }}</span>
        </p> -->

    <div v-if="selectedCountry" class="row justify-content-center">
      
      <div
        class="card"
        v-for="(item, index) in selectedCountry"
        :key="index"
        style="
          width: 12rem;
          height: 16rem;
          padding: 2rem;
          margin-top: 8rem;
          margin-left: 2rem;
        "
      >
        <p
          style="
            text-align: center;
            font: normal normal 600 22px/35px Poppins;
            letter-spacing: 0px;
            color: #04353c;
            opacity: 1;
            white-space: pre;
          "
        >
          {{ item.name }}
        </p>
        <p
          class="card-title"
          style="
            text-align: center;
            font: normal normal normal 16px/25px Poppins;
            letter-spacing: 0px;
            color: #707070;
            opacity: 1;
            margin-bottom: 0 !important;
            white-space: pre;
          "
        >
          {{ item.country }}
        </p>
        <div class="card-body" style="padding: 0 !important">
          <p
            style="
              text-align: center;
              font: normal normal 600 43px/72px Poppins;
              letter-spacing: 0px;
              color: #04353c;
              opacity: 1;
              white-space: pre;
            "
          >
            {{ item.weather.temp }}°C
          </p>
          <router-link
            :to="{
              name: 'CityWeather',
              query: { country: item.name },
            }"
            class="routerLink"
            >View city</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
//ovaj je za ninja
// axios.defaults.headers["X-API-KEY"] =
//   "JeCu1KIJKAdOb02MlMvicw==nHikrhYzOeZjSjeA";
//ovaj mi treba za weather UDH8H5X7LKJQHAHQ5EZ3FUVL8
export default {
  setup() {
    let searchTerm = ref("");
    let countries = ref("");

    function getCityBySearchTerm() {
      axios
        .get(
          "https://api.api-ninjas.com/v1/city?name=" +
            searchTerm.value +
            "&limit=10",
          {
            headers: {
              "X-Api-Key": "JeCu1KIJKAdOb02MlMvicw==nHikrhYzOeZjSjeA",
            },
          },
          { params: { limit: 10 } }
        )
        .then((response) => {
          countries.value = response.data;
        });
    }

    function getCurrentTemperatureForChosenCity(country) {
      axios
        .get(
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=metric&locationMode=single&key=UDH8H5X7LKJQHAHQ5EZ3FUVL8&locations=" +
            country.name +
            "%2c" +
            country.country
        )
        .then((response) => {
          country.weather = response.data.location.currentConditions;
          localStorage.setItem(
            "selectedCountry",
            JSON.stringify(selectedCountry)
          );
        });
    }

    const searchCountries = computed(() => {
      if (searchTerm.value === "") {
        return [];
      }

      let matches = 0;

      return countries.value.filter((country) => {
        if (
          country.name.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
          matches < 5
        ) {
          matches++;

          return country;
        }
      });
    });

    const selectCountry = (country) => {
      console.log(country);
      if (selectedCountry.length < 5 )
        //TODO: redudancy in array
        if(!selectedCountry.includes(country)){
                selectedCountry.push(country);}
                
      console.log(country);

      searchTerm.value = "";
      getCurrentTemperatureForChosenCity(country);
      localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));

      console.log(JSON.stringify(selectedCountry));
    };

    let selectedCountry = [];
    if (JSON.parse(localStorage.getItem("selectedCountry"))) {
      selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"));
      console.log(selectedCountry);
    }

    return {
      countries,
      searchTerm,
      searchCountries,
      selectCountry,
      selectedCountry,
      getCityBySearchTerm,
      getCurrentTemperatureForChosenCity,
    };
  },
};
</script>

<style>
#app {
  font-family: Popins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}

html,
body {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /* UI Properties */
  background: linear-gradient(rgba(4, 53, 60, 0.5), rgba(4, 53, 60, 0.5)),
    url("../assets/mask-group-1.png") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin: 0 !important;
}

.content {
  flex: 1 0 auto;
  /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
}
.header {
  margin-top: 2rem;
  margin-left: 10rem;
  width: 25rem;
  height: 4rem;
  background: transparent url("../assets/mask-group-2.png") 0% 0% no-repeat
    padding-box;
  opacity: 1;
}
p {
  padding: 0;
  margin: 0;
}
.headerTitle {
  margin-top: 20rem;
  text-align: left;
  font: normal normal 600 24px/35px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.headerDescription {
  margin-top: 5rem;
  /* UI Properties */
  text-align: left;
  font: normal normal 300 24px/35px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.footer {
  flex-shrink: 0;
  /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
  padding: 20px;
  width: 100%;
}

* {
  box-sizing: border-box;
}
footer {
  height: 60px;

  background: #04353c 0% 0% no-repeat padding-box;
  opacity: 1;
  font: normal normal 300 16px/25px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
label {
  position: relative;
}

label:before {
  content: "";
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  bottom: 0;
  width: 2rem;
  height: 2rem;
  background: url("../assets/icon-awesome-plus.svg") center / contain no-repeat;
  background-size: 16px 16px;
  background-color: #04353c;
  border-radius: 100px;
}

input {
  padding: 1rem 4rem !important;
}
input:focus {
  outline: none;
}

.search {
  text-align: left;
  font: normal normal normal 20px/30px Poppins;
  letter-spacing: 0px;
  color: #04353c;
  opacity: 1;
  width: 100%;
  padding-right: 80px;
  border: 0;
}
.searchbox {
  text-align: center;
}
#submit {
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  background: #04353c 0% 0% no-repeat padding-box;
  border: 0;
  border-radius: 10px;
  width: 6rem;
  height: 3rem;

  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.routerLink {
  text-decoration: none;
  background: #04353c 0% 0% no-repeat padding-box;
  border: 0;
  border-radius: 10px;
  width: 10rem;
  height: 3rem;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  padding: 0.75rem 1rem;
}
.routerLink:hover {
  color: white;
}
.searchbox input {
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
}

.results {
  display: flex;
  justify-content: center;
}
.results ul {
  width: 60%;
  padding: 6px;
}
.results li {
  padding: 5px;
  border-bottom: 1px dotted #04353c;
  display: flex;
  align-items: center;
}
.results li:hover {
  background-color: rgba(221, 221, 221, 0.5);
  cursor: pointer;
}
.results img {
  width: 30px;
  border-radius: 50%;
}
.results li span {
  display: inline-block;
  margin-left: 20px;
}
</style>
