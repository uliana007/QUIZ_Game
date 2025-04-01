const { auth, db } = require("./firebaseConfig");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { collection, doc, writeBatch, getDocs } = require("firebase/firestore");
const questions = require("./data");

const email = "aenoapolt243@gmail.com";
const password = "AdminAwnopolt876";

async function migrateData() {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User authenticated");

    // 1. Получаем текущие вопросы из Firestore
    const questionsCol = collection(db, "questions");
    const snapshot = await getDocs(questionsCol);
    const existingQuestions = snapshot.docs.map(doc => doc.id);

    // 2. Определяем последний номер ID
    let lastNumber = 0;
    existingQuestions.forEach(id => {
      const match = id.match(/question_(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > lastNumber) lastNumber = num;
      }
    });

    // 3. Создаём батч и добавляем вопросы с продолжением нумерации
    const batch = writeBatch(db);
    questions.forEach((question, index) => {
      const questionId = `question_${lastNumber + index + 1}`; // Продолжаем нумерацию
      const questionRef = doc(db, "questions", questionId);
      batch.set(questionRef, question);
      console.log(`Added question with ID: ${questionId}`);
    });

    await batch.commit();
    console.log(`Successfully added ${questions.length} new questions!`);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    process.exit();
  }
}

migrateData();