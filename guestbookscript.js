var firebaseConfig = {
  apiKey: "AIzaSyA4pvN11QlsE1wpqQPUMp-ETJKOpAChPwU",
  authDomain: "jbvdesigns-guestbook.firebaseapp.com",
  databaseURL: "https://jbvdesigns-guestbook-default-rtdb.firebaseio.com",
  projectId: "jbvdesigns-guestbook",
  storageBucket: "jbvdesigns-guestbook.appspot.com",
  messagingSenderId: "78278529136",
  appId: "1:78278529136:web:e1444b6cccf3b6143ca4b5"
};

firebase.initializeApp(firebaseConfig);
var messagesRef = firebase.database().ref('guestbook');

document.getElementById("guestbookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById('guestName').value.trim(),
    subject = document.getElementById('guestSubject').value.trim(),
    message = document.getElementById('guestMessage').value.trim();

  messagesRef.push({
    name: name,
    subject: subject,
    message: message
  });

  this.reset();
});

messagesRef.on("value", function (snapshot) {
  let entries = [];

  snapshot.forEach(function (child) {
    entries.push(child.val());
  });

  let output = entries.map(entry =>
    `<p class = "subjectEntry">${entry.subject}</p> 
      <p class = "nameEntry">by ${entry.name}</p>
      <p class = "messageEntry">${entry.message}</p>
      `).join("");

  document.getElementById("guestbookEntries").innerHTML = output;
});
