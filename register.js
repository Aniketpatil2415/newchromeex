// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// ✅ Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGNl1qDTgmeloZRaMlNIqADYF99JAsveg",
  authDomain: "notes-app-42c4f.firebaseapp.com",
  databaseURL: "https://notes-app-42c4f-default-rtdb.firebaseio.com",
  projectId: "notes-app-42c4f",
  storageBucket: "notes-app-42c4f.appspot.com",
  messagingSenderId: "423058349540",
  appId: "1:423058349540:web:942108589731326aa03bf1"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ✅ Register Button Click Handler
document.getElementById("registerBtn").addEventListener("click", () => {
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");
  const welcomeMsg = document.getElementById("welcomeMsg");

  // ✅ Basic validation
  if (!name || !email || !phone || !password) {
    errorMsg.textContent = "Please fill all fields.";
    return;
  }

  // ✅ Create user in Firebase Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // ✅ Save additional info in Realtime Database
      set(ref(database, "users/" + user.uid), {
        name: name,
        email: email,
        phone: phone
      });

      // ✅ Show welcome message with name
      welcomeMsg.textContent = `👋 Welcome ${name}`;
      errorMsg.textContent = "";

      // ✅ Optional: Clear fields
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("password").value = "";

      alert("Account created successfully!");

      // ✅ Redirect to login page after successful registration
      window.location.href = "login.html";  // Change to your login page name
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
    });
});

// ✅ Login Button Click Handler
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  // ✅ Basic validation
  if (!email || !password) {
    errorMsg.textContent = "Please fill all fields.";
    return;
  }

  // ✅ Login User with Firebase Auth
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // ✅ Successfully logged in
      errorMsg.textContent = "";
      alert("Login successful!");

      // ✅ Redirect to home page or dashboard after successful login
      window.location.href = "extension_screen.html";  // Change to your dashboard or main page
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
    });
});
