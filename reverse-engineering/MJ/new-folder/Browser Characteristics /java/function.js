// Store the captcha code
let captchaCode = '';

// Make random captcha
function generate() {
  // Clear input box
  document.getElementById("submit").value = "";
  document.getElementById("key").innerHTML = "";
  
  // Make random letters and numbers
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  captchaCode = '';
  
  // Get 6 random characters
  for (let i = 0; i < 6; i++) {
    captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Show the captcha
  document.getElementById("image").innerHTML = captchaCode;
}

// Check if captcha is correct
function printmsg() {
  const userInput = document.getElementById("submit").value;
  
  // If correct
  if (userInput === captchaCode) {
    document.getElementById("key").innerHTML = "Correct!";
    document.getElementById("key").style.color = "green";
  } 
  // If wrong
  else {
    document.getElementById("key").innerHTML = "Wrong! Try again";
    document.getElementById("key").style.color = "red";
    generate(); // Make new captcha
  }
}

// Print
const printButton = document.getElementById('printGallery');
printButton.addEventListener('click', function() {
    window.print();
});