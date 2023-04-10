class Navbar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <nav class="navbar fixed bg-slate-800/[0.125] drop-shadow-lg backdrop-blur-sm z-50 text-white">
          <div class="navbar-start">
            <button type="button" id="menu-toggle">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>  
            </button>
          </div>
          <div class="navbar-center">
            <a class="btn btn-ghost normal-case text-3xl" href="/"><code>LIFT</code></a>
          </div>
          <div class="navbar-end">
          
          </div>
        </nav>
        <nav class="navbar fixed bg-neutral-800/[0.125] drop-shadow-lg backdrop-blur-sm z-50 text-white">
          <div class="navbar-start">
            <button type="button" id="menu-toggle">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>  
            </button>
            
          </div>
          <div class="navbar-center">
            <a class="btn btn-ghost normal-case text-3xl" href="/"><code>LIFT</code> </a>
          </div>
          <div class="navbar-end">
          </div>
        </nav>
        
      <script>
        (function() {
          let lastScrollTop = 0;
          const navbar = document.querySelector('.navbar.fixed');
        
          window.addEventListener('scroll', function() {
            const currentScrollTop = window.pageYOffset;
        
            if (currentScrollTop > lastScrollTop) {
              // User is scrolling down, hide the navbar
              navbar.classList.add('hide-navbar');
            } else {
              // User is scrolling up, show the navbar
              navbar.classList.remove('hide-navbar');
            }
            lastScrollTop = currentScrollTop;
          });
        })();
      </script>
    `;
  }
}

customElements.define('navbar-component', Navbar);



class NavbarLaunch extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar fixed bg-base-200/[0.125] drop-shadow-lg backdrop-blur-sm z-50 text-white">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href="/">Home</a></li>
              <li><a href="../../info/">About</a></li>
              <li tabindex="0">
                <a href="../../launch/" class="justify-between">
                  Launch
                  <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                </a>
                <ul class="p-2 shadow bg-base-100 rounded-box">
                  <li><a href="../../launch/vehicles/">Vehicles</a></li>
                  <li><a href="../../launch/training/">Training</a></li>
                  <li><a href="../../launch/safety/">Safety</a></li>
                  <li><a href="../../launch/recovery/">Recovery</a></li>
                </ul>
              </li>
              <li><a href="../../products/">Products</a></li>
              <li><a href="../../references/">References</a></li>
            </ul>
          </div>
          <ul class="menu menu-horizontal px-1 hidden lg:flex">
            <li><a href="/">Home</a></li>
            <li><a href="../../info/">About</a></li>
            <li tabindex="0">
              <a href="../../launch/">
                Launch
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </a>
              <ul class="p-2 shadow bg-base-100 rounded-box">
                <li><a href="../../launch/vehicles/">Vehicles</a></li>
                <li><a href="../../launch/training/">Training</a></li>
                <li><a href="../../launch/safety/">Safety</a></li>
                <li><a href="../../launch/recovery/">Recovery</a></li>
              </ul>
            </li>
            <li><a href="../../products/">Products</a></li>
            <li><a href="../../references/">References</a></li>
          </ul>
          
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-3xl" href="/"><code>LIFT</code></a>
        </div>
        <div class="navbar-end">
        <button type="button" id="menu-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>        </div>
      </nav>
      <nav class="navbar fixed bg-base-200/[0.125] drop-shadow-lg backdrop-blur-sm z-50 text-white">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href="/">Home</a></li>
              <li><a href="../../info/">About</a></li>
              <li tabindex="0">
                <a href="../../launch/" class="justify-between">
                  Launch
                  <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                </a>
                <ul class="p-2 shadow bg-base-100 rounded-box">
                  <li><a href="../../launch/vehicles/">Vehicles</a></li>
                  <li><a href="../../launch/training/">Training</a></li>
                  <li><a href="../../launch/safety/">Safety</a></li>
                  <li><a href="../../launch/recovery/">Recovery</a></li>
                </ul>
              </li>
              <li><a href="../../products/">Products</a></li>
              <li><a href="../../references/">References</a></li>
            </ul>
          </div>
          <ul class="menu menu-horizontal px-1 hidden lg:flex">
            <li><a href="/">Home</a></li>
            <li><a href="../../info/">About</a></li>
            <li tabindex="0">
              <a href="../../launch/">
                Launch
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </a>
              <ul class="p-2 shadow bg-base-100 rounded-box">
                <li><a href="../../launch/vehicles/">Vehicles</a></li>
                <li><a href="../../launch/training/">Training</a></li>
                <li><a href="../../launch/safety/">Safety</a></li>
                <li><a href="../../launch/recovery/">Recovery</a></li>
              </ul>
            </li>
            <li><a href="../../products/">Products</a></li>
            <li><a href="../../references/">References</a></li>
          </ul>
          
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-3xl" href="/"><code>LIFT</code> </a>
        </div>
        <div class="navbar-end">
          <button type="button" id="menu-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>          </button>
        </div>
      </nav>
      <script>
        (function() {
          let lastScrollTop = 0;
          const navbar = document.querySelector('.navbar.fixed');
        
          window.addEventListener('scroll', function() {
            const currentScrollTop = window.pageYOffset;
        
            if (currentScrollTop > lastScrollTop) {
              // User is scrolling down, hide the navbar
              navbar.classList.add('hide-navbar');
            } else {
              // User is scrolling up, show the navbar
              navbar.classList.remove('hide-navbar');
            }
            lastScrollTop = currentScrollTop;
          });
        })();
      </script>
    `;
  }
}

customElements.define('navbar-launch-component', NavbarLaunch);
