// document.addEventListener('DOMContentLoaded', () => {
//   function countdown(seconds) {
//     let counter = seconds;
      
//     const interval = setInterval(() => {
//       console.log(counter);
//       counter--;
//       getComputedStyle(document.getElementById('countdown')).setProperty('--value', counter);
        
//       if (counter < 0 ) {
//         clearInterval(interval);
//         console.log('Ding!');
//       }
//     }, 1000);
//   }
//   let counter  = 10;
//   const counterVar = getComputedStyle(document.getElementById('countdown')).getPropertyValue('--value')
//   console.log(counterVar)
//   countdown(counter)
// });

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
