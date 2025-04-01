const { auth, db } = require("./firebaseConfig");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { collection, doc, writeBatch, getDocs } = require("firebase/firestore");
const questions = require("./data");

const email = "aenoapolt243@gmail.com";
const password = "AdminAwnopolt876";

async function migrateData() {
  try {
    // Аутентификация
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User authenticated");

    // Получаем коллекцию questions-hard
    const targetCollection = "questions-hard";
    const questionsCol = collection(db, targetCollection);
    const snapshot = await getDocs(questionsCol);
    
    // Определяем следующий ID
    let nextId = 1;
    snapshot.forEach(doc => {
      const match = doc.id.match(/question_(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num >= nextId) nextId = num + 1;
      }
    });

    // Создаём батч для записи
    const batch = writeBatch(db);
    
    // Добавляем вопросы с новыми ID
    questions.forEach((question, index) => {
      const questionId = `question_${nextId + index}`;
      const questionRef = doc(db, targetCollection, questionId);
      batch.set(questionRef, {
        ...question,
        id: questionId // Добавляем ID в данные вопроса
      });
      console.log(`Preparing question ${questionId}`);
    });

    // Записываем все вопросы одной транзакцией
    await batch.commit();
    console.log(`Successfully added ${questions.length} new questions to ${targetCollection}!`);
    
  } catch (error) {
    console.error("Migration error:", error.message);
  } finally {
    process.exit();
  }
}

migrateData();