var firebaseConfig = {
  apiKey: "AIzaSyA4pvN11QlsE1wpqQPUMp-ETJKOpAChPwU",
  authDomain: "jbvdesigns-guestbook.firebaseapp.com",
  databaseURL: "https://jbvdesigns-guestbook-default-rtdb.firebaseio.com",
  projectId: "jbvdesigns-guestbook",
  storageBucket: "jbvdesigns-guestbook.appspot.com",
  messagingSenderId: "78278529136",
  appId: "1:78278529136:web:e1444b6cccf3b6143ca4b5"
};

// Initialize Firebase with the provided configuration object
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('guestbook');

document.getElementById("guestbookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById('guestName').value,
      subject = document.getElementById('guestSubject').value,
      message = document.getElementById('guestMessage').value;

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  if (subject === "") {
    alert("Please enter your subject title.");
    return;
  }

  if (message === "") {
    alert("Please enter a message.");
    return;
  }

  // Expected schema for guestbook entry:
  // {
  //   name: string,        // Name of the guest
  //   subject: string,     // Subject/title of the entry
  //   message: string,     // Message content
  //   timestamp: number    // Unix timestamp in milliseconds
  // }
  messagesRef.push({
    name: name,
    subject: subject,
    message: message,
    timestamp: Date.now()
  });

  this.reset();
});

messagesRef.on("value", function (snapshot) {
  let entries = [];

  snapshot.forEach(function (child) {
    entries.push(child.val());
  });

  entries.sort((a, b) => b.timestamp - a.timestamp);

  let output = entries.map(entry =>
    `<p class= subjectEntry>${entry.subject}</p> 
      <p class= nameEntry>by ${entry.name}</p>
      <p>${entry.message}</p>
      `).join("");

  document.getElementById("guestbookEntries").innerHTML = output;
});
