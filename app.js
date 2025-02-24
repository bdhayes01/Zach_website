// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAe4LmT1fSh-elfgif-h984879QiHn5QyQ",
    authDomain: "zach-s-website-6a428.firebaseapp.com",
    projectId: "zach-s-website-6a428",
    storageBucket: "zach-s-website-6a428.firebasestorage.app",
    messagingSenderId: "946913720031",
    appId: "1:946913720031:web:1ddcaa8d98e73f3f621b6a",
    measurementId: "G-QR4PNWXLW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to submit number
window.submitNumber = async function() {
    const numberInput = document.getElementById('numberInput').value;
    const message = document.getElementById('message');

    if (numberInput >= 1 && numberInput <= 10) {
        try {
            await addDoc(collection(db, "numbers"), {
                value: parseInt(numberInput),
                timestamp: new Date()
            });
            message.innerText = "Number submitted successfully!";
            message.style.color = "green";
        } catch (error) {
            console.error("Error adding document: ", error);
            message.innerText = "Failed to submit number.";
            message.style.color = "red";
        }
    } else {
        message.innerText = "Please enter a number between 1 and 10.";
        message.style.color = "red";
    }
};
