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
      <link href="./style.css" rel="stylesheet" media="print" onload="this.media='all'">
      <link href="../style.css" rel="stylesheet" media="print" onload="this.media='all'">
      <link href="../../style.css" rel="stylesheet" media="print" onload="this.media='all'">
      
      
      
      <style>
      
#body-div.menu-toggled > #menu {
  pointer-events: all; 
  cursor: pointer;
}

#body-div.menu-toggled > #menu > #menu-toggle > span:first-of-type {
  cursor: pointer;
  background-color: black;
  transform: translate3d(0px, 8px, 0px) rotate(45deg);
}

#body-div.menu-toggled > #menu > #menu-toggle > span:nth-of-type(2) {
  opacity: 0;
  transform: translate3d(-5px, 0px, 0px);
}

#body-div.menu-toggled > #menu > #menu-toggle > span:nth-of-type(3) {
  cursor: pointer;
  background-color: black;
  transform: translate3d(0px, -8px, 0px) rotate(-45deg);
}

#body-div.menu-toggled > #menu > #menu-toggle > #menu-toggle-label > .word {
  cursor: pointer;
  opacity: 0;
  transform: translate3d(-30%, 0px, 0px) skew(20deg) scaleX(1.2);  
  transition: opacity 250ms cubic-bezier(.71, .19, .87, .33), 
    transform 250ms cubic-bezier(.71, .19, .87, .33);
}

#body-div.menu-toggled > #menu > #menu-toggle > #menu-toggle-label > .word:nth-of-type(2) {
  transition-delay: 100ms;
}

#body-div.menu-toggled > #menu > #menu-gradient {
  cursor: pointer;
  height: 200vmax;
  opacity: 1;
  transform: translate3d(-50%, -50%, 0px);
  transition: height 600ms cubic-bezier(.58, .2, .62, .93), 
    width 600ms cubic-bezier(.58, .2, .62, .93), 
    transform 600ms cubic-bezier(.58, .2, .62, .93), 
    opacity 400ms;
  width: 200vmax;
}

#body-div.menu-toggled > #menu > #menu-gradient-blur {
  opacity: 1; 
  cursor: pointer;
}

#body-div.menu-toggled > #menu > #menu-arcs-wrapper {
  opacity: 1;
  transform: scale(1);
  transition: transform 600ms cubic-bezier(.16, .68, .25, .83), 
    opacity 600ms cubic-bezier(.87, .12, .92, .39); 
}

#body-div.menu-toggled > #menu > #menu-links > .link {  
  opacity: 1;
  transform: none;
  transition: opacity 600ms ease-in;  
}

#body-div.menu-toggled > #menu > #menu-links > .link:nth-of-type(2) {
  transition-delay: 100ms;
}

#body-div.menu-toggled > #menu > #menu-links > .link:nth-of-type(3) {
  transition-delay: 150ms;
}

#body-div.menu-toggled > #menu > #menu-links > .link:nth-of-type(4) {
  transition-delay: 250ms;
}
#body-div.menu-toggled > #menu > #menu-links > .link:nth-of-type(5) {
  transition-delay: 300ms;
}

#body-div.menu-toggled > #menu > #menu-links > .link:nth-of-type(6) {
  transition-delay: 350ms;
}

#body-div.menu-toggled > #menu > #menu-links > .link:nth-of-type(7) {
  transition-delay: 400ms;
}

#body-div.menu-toggled > #menu > #menu-links > .link:nth-of-type(8) {
  transition-delay: 450ms;
}

#body-div.menu-toggled > #menu > #menu-links > .link:nth-of-type(9) {
  transition-delay: 500ms;
}




#menu > #menu-toggle:hover > span:nth-of-type(2),
#menu > #menu-toggle:hover > span:nth-of-type(3){
  transform: translate3d(0px, 0px, 0px);
}


#menu > #menu-toggle > span:nth-of-type(2) {
  transform: translate3d(6px, 0px, 0px);
}

#menu > #menu-toggle > span:nth-of-type(3) {
  transform: translate3d(-2px, 0px, 0px);
}

#menu > #menu-toggle > span:nth-of-type(5) {
  transform: translate3d(-2px, 0px, 0px);
}

#menu > #menu-toggle > span:nth-of-type(6) {
  transform: translate3d(-2px, 0px, 0px);
}

#menu > #menu-toggle > span:nth-of-type(7) {
  transform: translate3d(-2px, 0px, 0px);
}

#menu > #menu-toggle > span:nth-of-type(8) {
  transform: translate3d(-2px, 0px, 0px);
}

#menu > #menu-toggle > span:nth-of-type(9) {
  transform: translate3d(-2px, 0px, 0px);
}

#menu > #menu-toggle > #menu-toggle-label {
  transform: translate3d(100%, 0px, 0px);
}

#menu > #menu-toggle > #menu-toggle-label > .word {
  font-family: D-DIN, cursive;
  font-size: 1.5em;
  transition: opacity 250ms, transform 250ms;
}

#menu > #menu-gradient {
  background: radial-gradient(
    var(--background-light) 12%,
    var(--gradient-color-1) 13%,
    var(--gradient-color-2) 15%,
    var(--gradient-color-3) 60%,
    var(--gradient-color-4) 90%
  );

  transform: translate3d(-50%, -50%, 0px) scale(4);
  transition: height 600ms cubic-bezier(.75, .1, .89, .36),
    width 600ms cubic-bezier(.75, .1, .89, .36),
    transform 600ms cubic-bezier(.75, .1, .89, .36),
    opacity 700ms cubic-bezier(.9, .02, .97, .28);

}

#menu > #menu-gradient-blur {
  transition: opacity 600ms cubic-bezier(.87, .12, .92, .39);
}

#menu > #menu-arcs-wrapper {
  transform: scale(1.15) translate3d(20%, 20%, 0px);
  transition: transform 600ms cubic-bezier(.87, .12, .92, .39), 
    opacity 600ms cubic-bezier(.87, .12, .92, .39);  
}

#menu > #menu-arcs-wrapper > #menu-arcs {
  animation: arc-rotation 100s linear infinite;
}

#menu > #menu-arcs-wrapper > #menu-arcs > .menu-arc {
  stroke-dasharray: 2,10;
}

link:hover > .label {
  transform: translate3d(6%, 0px, 0px);
}

#menu > #menu-links > .link:hover > .index {
  transform: translate3d(20%, 0px, 0px);
}

#menu > #menu-links > .link:hover > .anchor:before {
  opacity: 0.15;
  transform: translate3d(-50%, -50%, 0px) scale(1.5);
}

#menu > #menu-links > .link:hover > .anchor:after {
  border-color: red;
  transform: translate3d(-50%, -50%, 0px) scale(1.1);
}



#menu > #menu-links > .link > .anchor:before,
#menu > #menu-links > .link > .anchor:after {
  content: "";
  height: 300%;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0px);
  transition: transform 250ms, border-color 250ms;
  width: 300%;
}

#menu > #menu-links > .link > .anchor:before {
  border: 1px solid red;  
  opacity: 0;
}

#menu > #menu-links > .link > .anchor:after {
  border: 1px solid rgba(255, 255, 255, 0.5);
}



@media (min-width: 1000px) and (max-width: 2699px) {  
  #body-div.menu-toggled > #menu > #menu-links > .link {
    transition: transform 400ms cubic-bezier(.16, .68, .25, .83), 
      opacity 500ms cubic-bezier(.87, .12, .92, .39);  
  }
  
  #menu > #menu-gradient {
    transform: translate3d(-50%, -50%, 0px) scale(8);
  }
  
  #menu > #menu-links > .link {
    position: absolute;
    transform: translate3d(300%, 800%, 0px) scale(1.25);
    transition: transform 500ms cubic-bezier(.62, .16, .86, .45), 
      opacity 400ms cubic-bezier(.16, .68, .25, .83);
  }
  
  #menu > #menu-links > .link > .anchor {
    top: 0%;
    transform: translate3d(-350%, -100%, 0px) rotate(45deg);
  }
  
  #menu > #menu-links > .link:first-of-type {
    left: 29.8vmax;
    top: 22vmax;
  }
}

@media (min-width: 1000px) and (max-width: 2099px) {
  #menu > #menu-links > .link:nth-of-type(2) {
    left: 46.4vmax;
    top: 16vmax;
  }

  #menu > #menu-links > .link:nth-of-type(3) {
    left: 28vmax;
    top: 40vmax;
  }

  #menu > #menu-links > .link:nth-of-type(4) {
    left: 68.5vmax;
    top: 10vmax;
  }

  #menu > #menu-links > .link:nth-of-type(5) {
    left: 64.4vmax;
    top: 25.2vmax;
  }

  #menu > #menu-links > .link:nth-of-type(6) {
    left: 55.5vmax;
    top: 41.2vmax;
  }

  #menu > #menu-links > .link:nth-of-type(7) {
    left: 85vmax;
    top: 6.1vmax;
  }

  #menu > #menu-links > .link:nth-of-type(8) {
    left: 82.3vmax;
    top: 22vmax;
  }

  #menu > #menu-links > .link:nth-of-type(9) {
    left: 75vmax;
    top: 40.2vmax;
  }
}

@media (min-width: 2100px) and (max-width: 2699px) {
  #menu > #menu-links > .link:nth-of-type(2) {
    left: 28vmax;
    top: 40vmax;
  }

  #menu > #menu-links > .link:nth-of-type(3) {
    left: 68.9vmax;
    top: 6vmax;
  }

  #menu > #menu-links > .link:nth-of-type(4) {
    left: 63.2vmax;
    top: 28vmax;
  }
  #menu > #menu-links > .link:nth-of-type(5) {
    left: 61.6vmax;
    top: 31.4vmax;
  }

  #menu > #menu-links > .link:nth-of-type(6) {
    left: 60vmax;
    top: 34.5vmax;
  }

  #menu > #menu-links > .link:nth-of-type(7) {
    left: 58vmax;
    top: 37.5vmax;
  }
  #menu > #menu-links > .link:nth-of-type(8) {
    left: 83.2vmax;
    top: 18.6vmax;
  }

  #menu > #menu-links > .link:nth-of-type(9) {
    left: 91vmax;
    top: 44vmax;
  }


}
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
