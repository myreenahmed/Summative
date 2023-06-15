<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { auth, firestore } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const router = useRouter();
const store = useStore();
const email = ref();
const password = ref();
const provider = new GoogleAuthProvider();
let incorrect = ref();

const loginViaEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    store.user = user;
    router.push("/purchase");
  } catch (error) {
    console.log(error);
    incorrect.value = `Incorrect e-mail or password`;
  }
};

const loginViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  store.user = user;
  router.push("/purchase");
  const firestoreCart = await getDoc(doc(firestore, "carts", user.email));
  if (firestoreCart.exists()) {
    const { cart } = firestoreCart.data();
    store.cart = cart;
  }
};
</script>

<template>
  <div>
    <h1>Sign In</h1>
    <form class="login-box" @submit.prevent="loginViaEmail()">
      <input
        class="login-info"
        type="email"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="login-info"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <input class="login-button" type="submit" value="Login" />
      <p id="error-message">{{ incorrect }}</p>
      <hr />
    </form>
    <div class="sign-in-buttons">
      <button
        class="email-button"
        type="button"
        @click="router.push('./register')"
      >
        Sign Up
      </button>
      <button class="google-button" @click="loginViaGoogle">
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-box {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.login-info {
  border: 2px solid black;
  border-radius: 4px;
  margin: 10px;
  padding: 7px;
}

.login-button {
  border-radius: 5px;
  margin: 10px;
  padding: 3px;
  font-weight: bold;
}

h1 {
  margin: 0;
  position: absolute;
  top: 35%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #fce5e5;
}
</style>
