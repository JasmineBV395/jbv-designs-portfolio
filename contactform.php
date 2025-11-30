<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Recipient email address
    $to = "jasmineboquervelasco@gmail.com"; // Replace with your actual email address

    // Email headers
    $headers = "From: " . $name . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

    // Email content
    $email_content = "
        <html>
        <head>
            <title>Contact Form Submission</title>
        </head>
        <body>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <p><strong>Message:</strong><br>{$message}</p>
        </body>
        </html>
    ";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Thank you for your message! We will get back to you shortly.";
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // Redirect if accessed directly without form submission
    header("Location: contact.html");
    exit();
}