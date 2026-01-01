const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin SDK to interact with Firestore from the function
admin.initializeApp();
const db = admin.firestore();

// You will need to set up these environment variables in Firebase Functions
// For example:
// firebase functions:config:set mail.user="your_email_username"
// mail.pass="your_email_password" mail.host="smtp.sendgrid.net"
// mail.port="587" mail.secure="false"
// Replace with your actual email service credentials
// (e.g., SendGrid API Key or username/password)
const mailTransport = nodemailer.createTransport({
  host: functions.config().mail.host,
  port: parseInt(functions.config().mail.port),
  // Ensure secure is a boolean, as nodemailer expects it
  secure: functions.config().mail.secure === "true",
  auth: {
    user: functions.config().mail.user,
    pass: functions.config().mail.pass,
  },
});

// Watch for new documents in 'inboundEmails' collection
exports.sendContactEmail = functions.firestore
    .document("inboundEmails/{emailDocId}")
    // Trigger when a new document is created
    .onCreate(async (snap, context) => {
      const mailData = snap.data();

      const recipientEmail = "teamcitrix31007@gmail.com";
      const senderName = mailData.name || "Anonymous";
      const senderEmail = mailData.senderEmail || "no-reply@yourwebsite.com";
      const messageContent = mailData.message || "No message provided.";

      const msg = {
        to: recipientEmail,
        // Use a verified sender if required by your email service
        from: `Contact Form <${functions.config().mail.user}>`,
        subject: `New Contact Message from ${senderName}`,
        html: `
          <p>You received a new message from your website contact form:</p>
          <p><strong>Name:</strong> ${senderName}</p>
          <p><strong>Email:</strong> ${senderEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${messageContent.replace(/\n/g, "<br>")}</p>
          <hr>
          <p>Sent via Team Citrix website.</p>
        `,
      };

      try {
        await mailTransport.sendMail(msg);
        console.log("Email sent successfully!");

        // Update the Firestore document to reflect that the email was sent
        await db.collection("inboundEmails")
            .doc(context.params.emailDocId)
            .update({
              status: "sent",
              sentAt: admin.firestore.FieldValue.serverTimestamp(),
            });
      } catch (error) {
        console.error("Error sending email:", error);

        // Update the Firestore document to reflect an error occurred
        await db.collection("inboundEmails")
            .doc(context.params.emailDocId)
            .update({
              status: "error",
              errorMessage: error.message,
              errorAt: admin.firestore.FieldValue.serverTimestamp(),
            });
      }
    });
