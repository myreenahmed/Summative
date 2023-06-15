<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="header-container">
    <h1>Myreen's Movies</h1>
    <button @click="router.push('/login')">Login</button>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  padding-left: 7px;
  padding-right: 7px;
  border-bottom: 4px solid;
  background-color: #fce5e5;
  border-color: black;
  top: 0px;
  width: 99%;
}

button {
  padding: 10px;
  background-color: rgb(228, 31, 152);
  color: white;
  font-weight: bold;
  border-radius: 4px;
}
</style>
