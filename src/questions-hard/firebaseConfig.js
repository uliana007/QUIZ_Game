const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const { getAnalytics } = require("firebase/analytics");

const firebaseConfig = {
  apiKey: "AIzaSyASa5sCcILFd5BW-Nrf-BrFVkJHy5lQmNE",
  authDomain: "quiz-mini-app.firebaseapp.com",
  projectId: "quiz-mini-app",
  storageBucket: "quiz-mini-app.appspot.com",
  messagingSenderId: "644182495118",
  appId: "1:644182495118:web:8436113b03b00ec852dedf",
  measurementId: "G-M2FXDHE7EC"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app); // Инициализация Analytics

// Функция загрузки сложных вопросов
const loadQuestions = async () => {
  const questionsCol = collection(db, "questions-hard");
  const questionSnapshot = await getDocs(questionsCol);
  const questionList = questionSnapshot.docs.map((doc) => doc.data());
  return questionList;
};

// Экспорт необходимых модулей
module.exports = { auth, db, analytics, loadQuestions };