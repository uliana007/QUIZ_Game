const { auth, db } = require("./firebaseConfig");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { collection, doc, writeBatch } = require("firebase/firestore");
const questions = require("./data");

const email = "aenoapolt243@gmail.com";
const password = "AdminAwnopolt876";

async function migrateData() {
  try {
    // Authenticate the user
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User authenticated");

    // Start the batch
    const batch = writeBatch(db);

    // Add each question to the batch
    questions.forEach((question) => {
      const questionRef = doc(collection(db, "questions"));
      batch.set(questionRef, question);
    });

    // Commit the batch
    await batch.commit();
    console.log("All questions added successfully");
  } catch (error) {
    console.error("Error adding questions: ", error);
  }
}

migrateData();