const body = document.body;
const main = document.getElementById('main');

// For scroll positions
let sy = 0;
// For container positions
let dy = sy;

body.style.height = main.clientHeight + 'px';



main.style.top = 0;
main.style.left = 0;


// Bind a scroll function
// window.addEventListener('scroll', easeScroll);


function easeScroll() {
  sy = window.pageYOffset;
}


window.requestAnimationFrame(render);

function render(){
  //We calculate our container position by linear interpolation method
  dy = lerp(dy,sy,0.07);
  
  dy = Math.floor(dy * 100) / 100;
  
  
  main.style.transform = `translate3d(0px, -${dy}px, 0px)`;
 
  
  
  window.requestAnimationFrame(render);
}

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}