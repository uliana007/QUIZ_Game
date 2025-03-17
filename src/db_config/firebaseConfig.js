const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyASa5sCcILFd5BW-Nrf-BrFVkJHy5lQmNE",
  authDomain: "quiz-mini-app.firebaseapp.com",
  projectId: "quiz-mini-app",
  storageBucket: "quiz-mini-app.firebasestorage.app",
  messagingSenderId: "644182495118",
  appId: "1:644182495118:web:8436113b03b00ec852dedf",
  measurementId: "G-M2FXDHE7EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loadQuestions = async () => {
  const questionsCol = collection(db, "questions");
  const questionSnapshot = await getDocs(questionsCol);
  const questionList = questionSnapshot.docs.map((doc) => doc.data());
  return questionList;
};

module.exports = { auth, db, loadQuestions };