<script setup>
import { useStore } from "../store";

const store = useStore();

const removeItem = (item) => {
  const index = store.cart.indexOf(item);
  store.removeFromCart(index);
};
</script>

<template>
  <div class="cart-box" v-for="item in store.cart">
    <div class="movie-container">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${item.poster}`"
        alt="Movie poster"
      />
      <h1>{{ item.title }}</h1>
      <button @click="removeItem(item)">Remove</button>
    </div>
  </div>
</template>


<style scoped>
img {
  width: 25%;
  margin: 0.5rem;
  border-radius: 7px;
  border-color: rgb(228, 31, 152);
}
.movie-container {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 3px solid rgb(228, 31, 152);
  margin: 1rem;
  border-radius: 7px;
}

h1 {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 60%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 150%;
  color: rgb(228, 31, 152);
}

button {
  margin: 4px;
  position: absolute;
  background-color: blueviolet;
  font-weight: bold;
  color: white;
  border-radius: 4px;
  padding: 10px;
  right: 0;
  bottom: 0;
}
</style>
