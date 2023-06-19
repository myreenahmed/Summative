<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="footer-container">
    <p class="information">
      Join our Exclusive Membership! Joining our movie site membership is an
      incredible opportunity for film enthusiasts and avid movie lovers. By
      becoming a member, you gain exclusive access to an extensive collection of
      movies spanning various genres, eras, and languages. Our site offers a
      seamless streaming experience, with high-quality playback and a
      user-friendly interface. As a member, you'll enjoy early access to new
      releases, director's cuts, and exclusive content not available to
      non-members. Dive into the world of cinematic wonders, engage in community
      discussions, and discover hidden gems with fellow movie buffs. With our
      membership, your passion for movies will be elevated to new heights,
      making every viewing experience unforgettable. Don't miss out on the
      chance to enhance your film journey, so join us today!
    </p>
    <button type="button" @click="router.push('/register')">Sign Up</button>
  </div>
</template>

<style scoped>
.footer-container {
  padding-top: 20px;
  padding-bottom: 0px;
  background-color: #9b2e71;
  color: white;
  clear: both;
}

.footer-container11 {
  background-color: #9b2e71;
  color: white;
  padding-top: 80px;
}

.information {
  padding-left: 20px;
  padding-bottom: 10px;
}

button {
  padding: 10px;
  background-color: rgb(228, 31, 152);
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 3px 3px grey;
}
</style>
