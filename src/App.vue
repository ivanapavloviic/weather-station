<template>
  <div id="app">
    <div class="header"></div>
    <div class="content">
    <HelloWorld />
    <p class="headerTitle">Add cities</p>
    <p class="headerDescription">Add 5 cities whose temperature you want to track</p>
  </div>
    <footer class="footer">Frontend Task | Mad Duck Code</footer>

  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
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

html,body{
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /* UI Properties */
  background: linear-gradient(rgba(4, 53, 60, 0.5), rgba(4, 53, 60, 0.5)),
    url("../src/assets/mask-group-1.png") 0% 0% no-repeat padding-box;
  opacity: 1;
  margin:0!important;
  
}

.content {
  flex: 1 0 auto;
  /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
 
}
.header{
  margin-top: 40px;
margin-left: 200px;
width: 260px;
height: 36px;
background: transparent url('../src/assets/mask-group-2.png') 0% 0% no-repeat padding-box;
opacity: 1;
}
p{
  padding:0;
  margin:0;
}
.headerTitle{
  margin-top: 80px;
margin-left: 460px;
  text-align: left;
font: normal normal 600 24px/35px Poppins;
letter-spacing: 0px;
color: #FFFFFF;
opacity: 1;
}
.headerDescription{
  margin-top: 20px;
margin-left: 460px;
/* UI Properties */
text-align: left;
font: normal normal 300 24px/35px Poppins;
letter-spacing: 0px;
color: #FFFFFF;
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
background: #04353C 0% 0% no-repeat padding-box;
opacity: 1;
font: normal normal 300 16px/25px Poppins;
letter-spacing: 0px;
color: #FFFFFF;
opacity: 1;
}
</style>
