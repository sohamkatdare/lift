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
      <link href="/assets/tailwind.css" rel="stylesheet" media="print" onload="this.media='all'">     
      <link href="/assets/index.css" rel="stylesheet" media="print" onload="this.media='all'">     
      <link href="/assets/base2.css" rel="stylesheet" media="print" onload="this.media='all'">   
      
      <style>
        .btn1{
          padding: 15px;
          margin:10px 4px;
          color: #fff;
          background-color:rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          font-family: sans-serif;
          text-transform: uppercase;
          text-align: center;
          position: relative;
          text-decoration: none;
          display:inline-block;
          /* border-radius: 0.375rem; */
        }

        .btn1{
          border:3px solid rgba(0, 0, 0, 0); 
          -webkit-transition: all 0.4s cubic-bezier(.5, .24, 0, 1);
          transition: all 0.4s cubic-bezier(.5, .24, 0, 1);
        }

        .btn1::before {
          content: '';
          position: absolute;
          left: -0.5%;
          bottom:-1.5px;
          z-index:-1;
          width: 0%;
          height:3px;
          background: white;
          box-shadow: inset 0px 0px 0px white;
          display: block;
          -webkit-transition: all 0.4s cubic-bezier(.5, .24, 0, 1);
          transition: all 0.4s cubic-bezier(.5, .24, 0, 1)
        }

        .btn1:hover::before {
          width:101%;
        }

        .btn1::after {
          content: '';
          position: absolute;
          right: -0.5%;
          top:-1.5px;
          z-index:-1;
          width: 0%;
          height:3px;
          background: white;
          -webkit-transition: all 0.4s cubic-bezier(.5, .24, 0, 1);
          transition: all 0.4s cubic-bezier(.5, .24, 0, 1)
        }
        .btn1:hover::after {
          width:101%;
        }
        .btn1:hover{
          border-left:3px solid white;
          border-right:3px solid white;
          background-color: transparent;
        }
      </style>
      
      
      <header id="body-div">
        <div id="menu" class="h-screen w-screen top-0 left-0 overflow-hidden cursor-pointer pointer-events-none fixed z-[100]">
        <div class="h-14 backdrop-blur-sm drop-shadow-2xl shadow-2xl cursor-pointer w-44 rounded-b-lg"></div>
        <button class="-translate-y-6 -translate-x-4 items-center bg-transparent cursor-pointer border-none  flex flex-col gap-[5px] h-[50px] justify-center left-[30px] p-0 absolute top-[30px] w-[50px] z-[5]"  type="button" id="menu-toggle" style="pointer-events: all;">
          <span class="bg-white block h-[3px] w-[24px] transition-transform duration-200  cursor-pointer"></span>
          <span class="bg-white block h-[3px] w-[24px] transition-transform duration-200  cursor-pointer"></span>
          <span class="bg-white block h-[3px] w-[24px] transition-transform duration-200  cursor-pointer"></span> 
          <div id="menu-toggle-label" class="items-center flex absolute h-[50px] gap-[5px] -right-[20px] cursor-pointer top-0 whitespace-nowrap">
            <span class="word text-white cursor-pointer"><h1 class="text-3xl"><span><code>LIFT</code></h1></span>
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
          <a class="link items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/booking/">
            <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px]"></span>  
            <span class="hidden lg:block index text-[0.8em] transition-transform duration-200">09</span> 
            <span class="lg:hidden index text-[0.8em] transition-transform duration-200">05</span> 
            <span class="label text-white text-[2em] transition-transform duration-200">Booking</span>  
          </a>
          <a class="link items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/references/">
            <span class="anchor bg-white min-h-[4px] h-[0.4vmax] max-h-[12px] left-0 absolute top-[50%] transition-transform duration-200 min-w-[4px] w-[0.4vmax] max-w-[12px]"></span>  
            <span class="hidden lg:block index text-[0.8em] transition-transform duration-200">10</span> 
            <span class="lg:hidden index text-[0.8em] transition-transform duration-200">06</span> 
            <span class="label text-white text-[2em] transition-transform duration-200">References</span>  
          </a>  
          <a class="link btn1 p-2 items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/login/">
            <span class="label text-white text-[2em] transition-transform duration-200" id="login">Login</span>  
          </a>
          <a class="link btn1 p-2 items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/signup/">
            <span class="label text-white text-[2em] transition-transform duration-200" id="signup">Signup</span>  
          </a>
          
          <a class="link btn1 p-2 items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" href="/profile/"> 
            <span class="label text-white text-[2em] transition-transform duration-200" id="profile">Profile</span>  
          </a>
          <a class="link btn1 p-2 items-center cursor-pointer gap-[10px] opacity-0 relative no-underline transition-opacity duration-200 ease-in" style="text-decoration: none;" id="logout">
            <span class="label text-white text-[2em] transition-transform duration-200">Logout</span>  
          </a>
          
        </div>
      </div>
      <script>
        if (localStorage.getItem('user') != null) {
          // Hide login and signup
          document.getElementById('login').style.display = 'none';
          document.getElementById('signup').style.display = 'none';
          document.getElementById('logout').addEventListener('click', () => {
            if (localStorage.getItem('user') != null) {
              localStorage.removeItem('user');
            }
          });
        } else {
          // Hide profile and logout
          document.getElementById('profile').style.display = 'none';
          document.getElementById('logout').style.display = 'none';
        }
      </script>
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
    <footer class="footer w-screen p-10 bg-transparent text-base-content">
      <div>
        <img src="/logo-bloomier.png" alt="logo" class="w-60 h-30">
      </div> 
      <div>
        <a class="font-bold  mb-2 text-white text-xl link link-hover" href="/products/" >Products</a> 
        <a class="link link-hover" href="/products/earth_to_earth/" >Earth to Earth Express</a> 
        <a class="link link-hover" href="/products/gas_giant/" >Terrestrial Exploration</a> 
        <a class="link link-hover" href="/products/terrestrial/" >Gas Giant Exploration</a> 
        <a class="link link-hover" href="/booking/" >Book a trip today!</a> 
      </div> 
      <div>
        <a class="font-bold  mb-2 text-white text-xl link link-hover" href="/launch/">Launch</a> 
        <a class="link link-hover" href="/launch/vehicles/">Vehicles</a> 
        <a class="link link-hover" href="/launch/training/">Training</a> 
        <a class="link link-hover" href="/launch/safety/">Safety</a>
        <a class="link link-hover" href="/launch/recovery/">Recovery</a>
      </div>
      <div>
        <a class="font-bold  mb-2 text-white text-xl link link-hover" href="/profile/" >Account</a> 
        <a class="link link-hover" href="/login/">Login</a> 
        <a class="link link-hover" href="/signup/">Sign Up</a>
        <a class="link link-hover" href="/login/reset_password/">Reset Password</a>
        <a class="link decoration-transparent">Logout</a> 
      </div>
      <div>
        <a class="font-bold  mb-2 text-white text-xl link link-hover" href="/">Company</a> 
        <a class="link link-hover" href="/info/" >About us</a> 
        <a class="link link-hover" href="/references/" >References</a> 
      </div> 
    </footer>

  
    `;
  }
}

customElements.define('footer-component', Footer);