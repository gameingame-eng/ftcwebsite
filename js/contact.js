// js/contact.js (or similar)
import { db } from './init.js'; // Import the 'db' object from your init.js file
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const contactForm = document.getElementById('contactForm'); // Get the form by its new ID

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop the form from refreshing the page

    // Get values from your form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value; // Use 'email' ID
    const messageContent = document.getElementById('message').value;

    try {
      // Add the message to the 'inboundEmails' collection in Firestore
      const docRef = await addDoc(collection(db, "inboundEmails"), {
        name: name,
        senderEmail: email, // Store as senderEmail
        message: messageContent,
        timestamp: new Date(),
        status: "pending" // Initial status, will be handled by Cloud Function
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Your message has been sent successfully!");
      contactForm.reset(); // Clear the form after successful submission
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("There was an error sending your message. Please try again.");
    }
  });
}