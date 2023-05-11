// import { addToggleMenuListener } from './resources.js';

class NavbarComponent extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    this.render();
    // Wait for a while before attaching the event listener
    setTimeout(() => {
      this.addEventListeners();
    }, 0);
  }
  

  addEventListeners() {
    const button = this.shadowRoot.getElementById("menu-toggle");
    button.onclick = () => {
      this.shadowRoot.getElementById('body-div').classList.toggle("menu-toggled");
    }
  }
  

  render() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <link href="/assets/index.css" rel="stylesheet" media="print" onload="this.media='all'">     
      <link href="/assets/index2.css" rel="stylesheet" media="print" onload="this.media='all'">     
      <link href="/assets/resources.css" rel="stylesheet" media="print" onload="this.media='all'">     
      
      
      <style>
      

      </style>
      <div id="body-div">
      <div id="menu" class="h-screen w-screen top-0 left-0 overflow-hidden cursor-pointer pointer-events-none fixed z-[100]">
      <div class="h-14 backdrop-blur-sm drop-shadow-2xl shadow-2xl cursor-pointer w-44 rounded-b-lg"></div>
      <button class="-translate-y-6 -translate-x-4 items-center bg-transparent cursor-pointer border-none  flex flex-col gap-[5px] h-[50px] justify-center left-[30px] p-0 absolute top-[30px] w-[50px] z-[5]"  type="button" id="menu-toggle" style="pointer-events: all;">
        <span class="bg-white block h-[3px] w-[24px] transition-transform duration-200  cursor-pointer"></span>
        <span class="bg-white block h-[3px] w-[24px] transition-transform duration-200  cursor-pointer"></span>
        <span class="bg-white block h-[3px] w-[24px] transition-transform duration-200  cursor-pointer"></span> 
        <div id="menu-toggle-label" class="items-center flex absolute h-[50px] gap-[5px] -right-[20px] cursor-pointer top-0 whitespace-nowrap">
          <span class="word text-white cursor-pointer"><h1 class="text-3xl"><code>LIFT</code></h1></span>
        </div>
      </button>
      <div id="menu-gradient" class="h-[300vmax] left-0 opacity-0 absolute top-0 w-[300vmax] z-[1]"></div>
      <div id="menu-gradient-blur" class="backdrop-blur-[1vmax] inset-0 absolute z-[2] opacity-0"></div>
      <div id="menu-arcs-wrapper" class="min-h-[600px] h-[200vmax] max-h-[6000px] left-0 opacity-0 absolute top-0 min-w-[600px] w-[200vmax] max-w-[6000px] z-[3]">
        <svg id="menu-arcs" class="h-full w-full top-0 left-0 absolute will-change-transform">
          <circle class="menu-arc fill-none stroke-white/50 stroke-1" cx="50%" cy="50%" r="18%"></circle>
          <circle class="menu-arc fill-none stroke-white/50 stroke-1" cx="50%" cy="50%" r="24%"></circle>
          <circle class="menu-arc fill-none stroke-white/50 stroke-1" cx="50%" cy="50%" r="34%"></circle>
          <circle class="menu-arc fill-none stroke-white/50 stroke-1" cx="50%" cy="50%" r="42%"></circle>
          <circle class="menu-arc fill-none stroke-white/50 stroke-1" cx="50%" cy="50%" r="50%"></circle>
        </svg>
      </div>
      <div id="menu-links" class="items-center flex flex-col gap-[30px] inset-0 justify-center absolute z-[4]">
        <a class="link items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/">
          <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px] "></span>
          <span class="index text-[0.8em] transition-transform duration-200">01</span> 
          <span class="label text-white text-[2em] transition-transform duration-200">Home</span>  
        </a>
        <a class="link items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/info/">
          <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px] "></span>  
          <span class="index text-[0.8em] transition-transform duration-200">02</span>  
          <span class="label text-white text-[2em] transition-transform duration-200">Info</span>  
        </a>
        <a class="link items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/launch/">
          <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px] "></span>  
          <span class="index text-[0.8em] transition-transform duration-200">03</span>  
          <span class="label text-white text-[2em] transition-transform duration-200">Launch</span>  
        </a>
        <a class="link items-center cursor-pointer hidden lg:block gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/launch/vehicles/">
          <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px] "></span>
          <span class="index text-[0.8em] transition-transform duration-200">04</span>  
          <span class="label text-white text-[2em] transition-transform duration-200">Vehicles</span>  
        </a>
        <a class="link items-center cursor-pointer hidden lg:block gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/launch/training/">
          <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px] "></span>  
          <span class="index text-[0.8em] transition-transform duration-200">05</span>  
          <span class="label text-white text-[2em] transition-transform duration-200">Training</span>  
        </a>
        <a class="link items-center cursor-pointer hidden lg:block gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/launch/safety/">
          <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px] "></span>  
          <span class="index text-[0.8em] transition-transform duration-200">06</span>  
          <span class="label text-white text-[2em] transition-transform duration-200">Safety</span>  
        </a>
        <a class="link items-center cursor-pointer hidden lg:block gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/launch/recovery/">
          <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px] "></span>  
          <span class="index text-[0.8em] transition-transform duration-200">07</span>  
          <span class="label text-white text-[2em] transition-transform duration-200">Recovery</span>  
        </a>
        <a class="link items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/products/">
          <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px] "></span>  
          <span class="hidden lg:block index text-[0.8em] transition-transform duration-200">08</span> 
          <span class="lg:hidden index text-[0.8em] transition-transform duration-200">04  </span>  
          <span class="label text-white text-[2em] transition-transform duration-200">Products</span>  
        </a>
        <a class="link items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/references/">
          <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px]"></span>  
          <span class="hidden lg:block index text-[0.8em] transition-transform duration-200">09</span> 
          <span class="lg:hidden index text-[0.8em] transition-transform duration-200">05</span> 
          <span class="label text-white text-[2em] transition-transform duration-200">References</span>  
        </a>

      </div>
    </div>
    </div>
    `;
  }
}

customElements.define('navbar-component', NavbarComponent);
