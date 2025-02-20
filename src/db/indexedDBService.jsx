// src/services/indexedDBService.js

// Constants
const DB_NAME = "QuizDatabase";
const DB_VERSION = 1;
const STORE_NAME = "quizAttempts";

// Initialize the database
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(`IndexedDB error: ${event.target.error}`);
    };
  });
};

// Save a quiz attempt
export const saveAttempt = async (attemptData) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.add({
        timestamp: new Date().toISOString(),
        score: attemptData.score,
        totalQuestions: attemptData.totalQuestions,
        timeUsed: attemptData.timeUsed,
      });

      request.onsuccess = () => resolve(true);
      request.onerror = (event) =>
        reject(`Error saving attempt: ${event.target.error}`);

      transaction.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error("Failed to save attempt:", error);
    return false;
  }
};

// Load all quiz attempts
export const getAttemptHistory = async () => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) =>
        reject(`Error getting attempts: ${event.target.error}`);

      transaction.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error("Failed to get attempt history:", error);
    return [];
  }
};

// Clear all attempt history
export const clearAttemptHistory = async () => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = (event) =>
        reject(`Error clearing attempts: ${event.target.error}`);

      transaction.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error("Failed to clear attempt history:", error);
    return false;
  }
};
