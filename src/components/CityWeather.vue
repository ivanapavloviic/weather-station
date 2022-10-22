<template>
  <div>{{weather}}</div>
</template>

<script>
import axios from 'axios';
export default {
    name: "CityWeather",
    data(){
        return{
            country: this.$route.query.country,
            weather:[]
        }
    },
    created(){
     this.getCurrentTemperatureForChosenCity();
    },
    methods:{
        getCurrentTemperatureForChosenCity() {
        axios
          .get(
            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=metric&locationMode=single&key=UDH8H5X7LKJQHAHQ5EZ3FUVL8&locations="+this.country 
           
          )
          .then((response) => {
            this.weather = response.data;
           
          });
      
      }
    }
};
</script>

<style></style>
