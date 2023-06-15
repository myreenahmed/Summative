<script setup>
import Modal from "../components/Modal.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
const genre = ref(28);
const search = ref("");
const movieData = ref(null);
const page = ref(1);
const currentLink = ref("");
const totalPages = ref(0);
const modalView = ref(false);
const selectedID = ref(0);

const showModal = (movieID) => {
  modalView.value = !modalView.value;
  selectedID.value = movieID;
};

const getData = async (url, options, page) => {
  movieData.value = (
    await axios.get(url, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        region: "US",
        language: "en",
        include_adult: false,
        page,
        ...options,
      },
    })
  ).data;
  totalPages.value = movieData.value.total_pages;
  currentLink.value = url;
};
</script>

<template>
  <div class="controls">
    <header>
      <button class="cart-button" @click="router.push('/cart')">Cart</button>
      <input v-model="search" type="text" placeholder="Search" />
      <button
        @click="
          getData('https://api.themoviedb.org/3/search/movie', {
            query: search,
          }),
            (page = 1)
        "
      >
        <i class="fa fa-search"></i>
      </button>
      <select v-model="genre">
        <option value="28">Action</option>
        <option value="10751">Family</option>
        <option value="878">Science Fiction</option>
        <option value="12">Adventure</option>
        <option value="14">Fantasy</option>
        <option value="10770">TV Movie</option>
        <option value="16">Animation</option>
        <option value="36">History</option>
        <option value="53">Thriller</option>
        <option value="35">Comedy</option>
        <option value="27">Horror</option>
        <option value="10752">War</option>
        <option value="80">Crime</option>
        <option value="10402">Music</option>
        <option value="37">Western</option>
        <option value="99">Documentary</option>
        <option value="9648">Mystery</option>
        <option value="18">Drama</option>
        <option value="10749">Romance</option>
      </select>
      <button
        @click="
          getData('https://api.themoviedb.org/3/discover/movie', {
            with_genres: genre,
          }),
            (page = 1)
        "
      >
        <i class="fas fa-filter"></i>
      </button>
    </header>
    <div v-if="movieData" class="tiles">
      <div
        v-for="movie in movieData.results"
        :key="movie.id"
        class="movie-container"
      >
        <img
          class="movie-poster"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt="movie poster"
          @click="showModal(movie.id)"
        />
      </div>
    </div>
    <div class="pagination">
      <button
        type="button"
        @click="
          page === 1 ? 1 : page--,
            getData(
              currentLink,
              {
                query: search,
                with_genres: genre,
              },
              page
            )
        "
      >
        <i class="fas fa-angle-left"></i>
      </button>
      <p>{{ `Page ${page} of ${totalPages}` }}</p>
      <button
        type="button"
        @click="
          page === totalPages ? totalPages : page++,
            getData(
              currentLink,
              {
                query: search,
                with_genres: genre,
              },
              page
            )
        "
      >
        <i class="fas fa-angle-right"></i>
      </button>
    </div>
  </div>
  <Modal v-if="modalView" :id="selectedID" @showModal="showModal()" />
</template>

<style scoped>
img {
  width: 85%;
  border-radius: 7px;
  margin: 0.5rem;
  margin-top: 10px;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-top: 55px;
}

header {
  display: flex;
  position: fixed;
  align-items: center;
  padding-left: 7px;
  padding-right: 7px;
  border-bottom: 4px solid;
  background-color: white;
  top: 0px;
  width: 100%;
}

.pagination {
  display: flex;
  justify-content: center;
}

input {
  padding: 7px;
  border-radius: 6px;
}

header button {
  margin: 10px;
  padding: 7px;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: bold;
  background-color: orange;
  color: white;
  border-radius: 4px;
}

header select {
  padding: 5px;
  border-radius: 4px;
}

.pagination button {
  margin-bottom: 8px;
  padding: 7px;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: bold;
  background-color: orange;
  color: white;
  border-radius: 4px;
}

.pagination p {
  padding: 6px;
}
</style>
