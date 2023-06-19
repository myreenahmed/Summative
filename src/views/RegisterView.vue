<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { auth, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDoc, doc } from "@firebase/firestore";

const store = useStore();
const router = useRouter();
const email = ref();
const password = ref();
const confirmPassword = ref();

const registerViaEmail = async () => {
  if (password.value != confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }
  alert("hi");
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );
  
  store.user = user;
  router.push("./purchase");
};

const registerViaGoogle = async () => {
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
  <div class="auth-container">
    <h1>Register with email</h1>
    <form @submit.prevent="registerViaEmail()">
      <input v-model="email" type="email" placeholder="Enter Email" />
      <input v-model="password" type="password" placeholder="Enter Password" />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <input class="register-button" type="submit" value="Register" @click="registerViaEmail()"/>
      <hr />
    </form>
    <button class="google-button" @click="registerViaGoogle()">
      Register with Google
    </button>
  </div>
</template>

<style scoped>
form {
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

input {
  border: 2px solid black;
  border-radius: 4px;
  margin: 10px;
  padding: 7px;
}

.register-button {
  border-radius: 5px;
  margin: 10px;
  padding: 3px;
  font-weight: bold;
}

hr {
  margin-bottom: 10px;
}

button {
  border-radius: 5px;
  margin: 10px;
  margin-top: 0px;
  padding: 3px;
  font-weight: bold;
}

img {
  width: 25px;
}

h1 {
  text-align: center;
  position: absolute;
  top: 20%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.google-button {
  position: absolute;
  top: 70%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100px;
}
</style>
