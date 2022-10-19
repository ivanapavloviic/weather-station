<template>
  <div id="app">
    <div class="header"></div>
    <div class="content">
      <p class="headerTitle">Add cities</p>
      <p class="headerDescription">
        Add 5 cities whose temperature you want to track
      </p>

      <div class="searchbox">
        <label>
          <input
            type="text"
            id="search"
            v-model="searchTerm"
            placeholder="Add a city..."
            class="search"
          />
        </label>
        <button id="submit" @click="getCityBySearchTerm">Add</button>
      </div>
      <div class="results">
        <ul v-if="searchCountries.length">
          <!-- <li >
          Showing {{ searchCountries.length }} of {{ countries.length }} results
        </li> -->
          <li
            v-for="country in searchCountries"
            :key="country.name"
            @click="selectCountry(country.name)"
          >
            {{ country.name }}
          </li>
        </ul>
      </div>
      <p v-if="selectedCountry" class="text-lg pt-2 absolute">
        You have selected:
        <span class="font-semibold">{{ selectedCountry }}</span>
      </p>
    </div>

    <footer class="footer">Frontend Task | Mad Duck Code</footer>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
axios.defaults.headers["X-API-KEY"] =
  "JeCu1KIJKAdOb02MlMvicw==nHikrhYzOeZjSjeA";
export default {
  setup() {
    let searchTerm = ref("");
    let countries = ref("");

    function getCityBySearchTerm() {
      axios
        .get(
          "https://api.api-ninjas.com/v1/city?limit=10",
          { params: { name: searchTerm.value } },
          { limit: 10 }
        )
        .then((response) => {
          countries.value = response.data;
        });
      console.log(countries);
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
     
      if(selectedCountry.length<5)
     //TODO: redudancy in array
      selectedCountry.push(country);
      searchTerm.value = "";
      localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
      

    };
    let selectedCountry = [];
  
    if(JSON.parse(localStorage.getItem("selectedCountry")))    
    {
      selectedCountry = localStorage.getItem("selectedCountry")
    }
  

    return {
      countries,
      searchTerm,
      searchCountries,
      selectCountry,
      selectedCountry,
      getCityBySearchTerm,
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
    url("../src/assets/mask-group-1.png") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin: 0 !important;
}

.content {
  flex: 1 0 auto;
  /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
}
.header {
  margin-top: 40px;
  margin-left: 200px;
  width: 260px;
  height: 36px;
  background: transparent url("../src/assets/mask-group-2.png") 0% 0% no-repeat
    padding-box;
  opacity: 1;
}
p {
  padding: 0;
  margin: 0;
}
.headerTitle {
  margin-top: 80px;
  margin-left: 460px;
  text-align: left;
  font: normal normal 600 24px/35px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.headerDescription {
  margin-top: 20px;
  margin-left: 460px;
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
  left: 10px;
  top: -10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  background: url("../src/assets/icon-awesome-plus.svg") center / contain
    no-repeat;
  background-size: 16px 16px;
  background-color: #04353c;
  border-radius: 100px;
}

input {
  padding: 10px 60px;
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
  padding: 40px 0 0 0;

  text-align: center;
  position: relative;
  width: 62.5em;
  margin-left: 28.75em;
}
#submit {
  position: absolute;
  right: 1em;
  top: 67%;
  transform: translateY(-50%);
  background: #04353c 0% 0% no-repeat padding-box;
  border: 0;
  border-radius: 10px;
  width: 134px;
  height: 65px;

  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.searchbox input {
  width: 1000px;
  font-size: 16px;
  border: none;
  height: 80px;
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
