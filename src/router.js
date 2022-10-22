import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/WeatherStationHomepage.vue";
import CityWeather from "./components/CityWeather.vue";



const routes = [


  { path: "/", component: Home, name:'home', },
  { path: "/city-weather", component: CityWeather, name:'CityWeather',},  
  
  
];

export const routeConfig = createRouter({
  history: createWebHistory(),
  routes: routes,
});

