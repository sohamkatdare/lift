document.addEventListener('DOMContentLoaded', () => {
  let counter = 10;
  const counterElement = document.getElementById('counter');

  // Create a style element to hold the CSS custom property
  const styleElement = document.createElement('style');

  function count() {
    // Set the CSS custom property on the style element
    styleElement.textContent = `.countdown span { --value: ${counter}; }`;

    // Append the style element to the document head
    document.head.appendChild(styleElement);
    
    if (counter > 0) {
      counter--;
      setTimeout(count, 1000);
    } 
  }

  // Start the countdown
  count();
});
