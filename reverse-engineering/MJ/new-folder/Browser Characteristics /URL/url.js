const urlInput = document.getElementById('url');
const button = document.querySelector('button');
const feedback = document.getElementById('feedback');
const mistakeList = document.getElementById('mistake-list');
let clickCount = 0;
let typingCount = 0;
let mistakes = 0;
let buttonEnabled = false;

function addMistake(mistakeText) {
  mistakes++;
  
  const mistakeDiv = document.createElement('div');
  mistakeDiv.textContent = mistakeText;
  mistakeList.appendChild(mistakeDiv);
  
  if (mistakes >= 5) {
    buttonEnabled = true;
    showFeedback('✓ You may now proceed to the next page', 'warning');
    button.style.backgroundColor = '#28a745';
    mistakeList.innerHTML = '<div style="color: #2e7d32; font-weight: bold;">All errors resolved. You can now continue.</div>';
  }
}

function showFeedback(message, type = 'error') {
  feedback.textContent = message;
  feedback.className = `feedback-message ${type}`;
  setTimeout(() => {
    feedback.className = 'feedback-message hidden';
  }, 3000);
}

// Button moves away slightly when you try to click it (first few times)
button.addEventListener('mouseenter', () => {
  if (clickCount < 3 && !buttonEnabled) {
    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
    button.style.transition = 'transform 0.3s';
  }
});

button.addEventListener('mouseleave', () => {
  if (!buttonEnabled) {
    button.style.transform = 'translate(0, 0)';
  }
});

button.addEventListener('click', (e) => {
  if (!buttonEnabled) {
    e.preventDefault();
    
    if (clickCount === 0) {
      showFeedback('⚠️ Button seems unstable. Try clicking again.', 'warning');
      addMistake('You failed to click the button properly due to an unstable connection.');
    } else if (clickCount === 1) {
      showFeedback('⚠️ Connection issue detected. Please retry.', 'warning');
      addMistake('Your click attempt timed out because of a connection error.');
    } else if (clickCount === 2) {
      showFeedback('⚠️ Almost there... one more try.', 'warning');
      addMistake('The button was unresponsive to your click. Please try again.');
      button.style.transform = 'translate(0, 0)';
    } else {
      // After 3 clicks, check URL validation
      if (!urlInput.value) {
        showFeedback('❌ Error: URL field cannot be empty', 'error');
        addMistake('You left the URL field empty, which is not allowed.');
      } else if (!urlInput.value.startsWith('http')) {
        showFeedback('❌ Error: URL must start with http:// or https://', 'error');
        addMistake('You entered an invalid URL format. URLs must start with http:// or https://');
      } else if (mistakes < 5) {
        showFeedback('⚠️ Please correct all errors before proceeding', 'warning');
      }
    }
    
    clickCount++;
  } else {
    // Button is enabled, allow navigation
    showFeedback('✓ Success! Redirecting...', 'warning');
    // You can add actual navigation here
    // window.location.href = 'next-page.html';
  }
});

// Random autocorrect that changes one letter occasionally
urlInput.addEventListener('input', (e) => {
  typingCount++;
  
  if (typingCount % 15 === 0 && urlInput.value.length > 5 && mistakes < 5) {
    const value = urlInput.value;
    const randomIndex = Math.floor(Math.random() * value.length);
    const newValue = value.substring(0, randomIndex) + 
                     value.charAt(randomIndex).toUpperCase() + 
                     value.substring(randomIndex + 1);
    urlInput.value = newValue;
    showFeedback('⚠️ Autocorrect: Character formatting adjusted', 'warning');
    addMistake('Your text was autocorrected because you made a formatting error.');
  }
});

// Cursor occasionally jumps to beginning
urlInput.addEventListener('keypress', (e) => {
  if (Math.random() < 0.08 && mistakes < 5) { // 8% chance for more mistakes
    setTimeout(() => {
      urlInput.setSelectionRange(0, 0);
      showFeedback('⚠️ Input error: Cursor position reset', 'warning');
      addMistake('You caused an input error that reset your cursor position to the beginning.');
    }, 100);
  }
});

// Placeholder text changes slightly when focused
const placeholders = [
  'Enter URL',
  'Enter URL...',
  'Type URL here',
  'Enter URL please',
  'URL goes here'
];

urlInput.addEventListener('focus', () => {
  urlInput.placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];
});

// Hint button functionality
const hintButton = document.getElementById('hint-button');
let hintPopup = null;

hintButton.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Remove existing popup if any
  if (hintPopup) {
    hintPopup.remove();
  }
  
  // Create popup
  hintPopup = document.createElement('div');
  hintPopup.className = 'hint-popup show';
  hintPopup.textContent = 'Click 5 times to proceed';
  
  // Add to the item-content div
  document.querySelector('.item-content').appendChild(hintPopup);
  
  // Remove popup after 3 seconds
  setTimeout(() => {
    if (hintPopup) {
      hintPopup.remove();
      hintPopup = null;
    }
  }, 3000);
});