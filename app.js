// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
    getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import {
    getAuth, signInAnonymously, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
const auth = getAuth(app);

// Automatically sign in anonymously
signInAnonymously(auth)
    .then(() => {
        console.log("Signed in anonymously");
    })
    .catch((error) => {
        console.error("Error signing in:", error);
    });

// Handle authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User ID:", user.uid);
        fetchNumbers(); // Fetch submitted numbers on login
    } else {
        console.log("User is signed out");
    }
});

import { setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        signInAnonymously(auth);
    })
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });


// Function to submit a number
window.submitNumber = async function() {
    const numberInput = document.getElementById('numberInput').value;
    const message = document.getElementById('message');

    if (numberInput >= 1 && numberInput <= 10) {
        try {
            await addDoc(collection(db, "numbers"), {
                value: parseInt(numberInput),
                userId: auth.currentUser.uid, // Save the user's ID
                timestamp: serverTimestamp() // Save the current timestamp
            });
            message.innerText = "Number submitted successfully!";
            message.style.color = "green";

            fetchNumbers(); // Refresh the list after submission
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

// Function to fetch and display submitted numbers
window.fetchNumbers = async function() {
    const numberList = document.getElementById('numberList');
    numberList.innerHTML = '';

    if (auth.currentUser) {
        const q = query(collection(db, "numbers"), where("userId", "==", auth.currentUser.uid));

        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                numberList.innerHTML = '<li>No numbers submitted yet.</li>';
            } else {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const timestamp = data.timestamp?.toDate(); // Convert Firestore timestamp
                    const formattedDate = timestamp
                        ? timestamp.toLocaleString()
                        : "Date not available";

                    const listItem = document.createElement('li');
                    listItem.textContent = `Number: ${data.value} (Submitted on: ${formattedDate})`;
                    numberList.appendChild(listItem);
                });
            }
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    } else {
        numberList.innerHTML = '<li>Please log in to see your numbers.</li>';
    }
};
