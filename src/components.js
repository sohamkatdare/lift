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
      <link href="/assets/style.css" rel="stylesheet" media="print" onload="this.media='all'">     
      
      
      <header id="body-div" class="w-full h-full">
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
            <circle class="menu-arc fill-none stroke-white/50 stroke-1" cx="50%" cy="50%" r="30%"></circle>
            <circle class="menu-arc fill-none stroke-white/50 stroke-1" cx="50%" cy="50%" r="40%"></circle>
            <circle class="menu-arc fill-none stroke-white/50 stroke-1" cx="50%" cy="50%" r="48%"></circle>
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
    </header>
    `;
  }
}

customElements.define('navbar-component', NavbarComponent);


class Footer extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer items-center p-4 bg-neutral-900 text-white">
        <div class="items-center grid-flow-col">
          <img src="/logo.png" alt="logo" class="w-10 h-10">
          <p>Copyright © 2022 - All rights reserved</p>
        </div>
        <div class="grid-flow-col gap-4 md:place-self-center">
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" class="fill-current">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z">
              </path>
            </svg>
          </a>
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" class="fill-current">
              <path
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z">
              </path>
            </svg></a>
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" class="fill-current">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z">
              </path>
            </svg></a>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);