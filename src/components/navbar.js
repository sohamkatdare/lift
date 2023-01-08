class Navbar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <header class="navbar fixed bg-base-200/[0.125] backdrop-blur-sm z-50">
        <div class="navbar-start w-[47.5%]">
          <div class="flex-1">
            <ul class="menu menu-horizontal px-1">
              <li><a href="../">Home</a></li>
              <li><a href="../info/">About</a></li>
              <li tabindex="0">
                <a href="../launch/">
                  Launch
                  <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                </a>
                <ul class="p-2 bg-white-100/50 backdrop-blur-md">
                  <li><a href="../launch/vehicles/">Vehicles</a></li>
                  <li><a href="../launch/training/">Training</a></li>
                  <li><a href="../launch/safety/">Safety</a></li>
                  <li><a href="../launch/recovery/">Recovery</a></li>
                </ul>
              </li>
              <li><a href="../products/">Products</a></li>
              <li><a href="../references/">References</a></li>
            </ul>
          </div>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-4xl tracking-wide" href="../" style="font-family: Nova;"><code>LIFT</code></a>
        </div>
      </header>
      <header class="navbar fixed bg-base-200/[0.125] backdrop-blur-sm z-50">
        <div class="navbar-start w-[47.5%]">
          <div class="flex-1">
            <ul class="menu menu-horizontal px-1">
              <li><a href="/">Home</a></li>
              <li><a href="/info/">About</a></li>
              <li tabindex="0">
                <a href="/launch/">
                  Launch
                  <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                </a>
                <ul class="p-2 bg-white-100/50 backdrop-blur-md">
                  <li><a href="../launch/vehicles/">Vehicles</a></li>
                  <li><a href="../launch/training/">Training</a></li>
                  <li><a href="../launch/safety/">Safety</a></li>
                  <li><a href="../launch/recovery/">Recovery</a></li>
                </ul>
              </li>
              <li><a href="../products/">Products</a></li>
              <li><a href="../references/">References</a></li>
            </ul>
          </div>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-4xl tracking-wide" href="../" style="font-family: Nova;"><code>LIFT</code></a>
        </div>
      </header>
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
      <header class="navbar fixed bg-base-200/[0.125] backdrop-blur-sm z-50">
        <div class="navbar-start w-[47.5%]">
          <div class="flex-1">
            <ul class="menu menu-horizontal px-1">
              <li><a href="/">Home</a></li>
              <li><a href="../../info/">About</a></li>
              <li tabindex="0">
                <a href="../">
                  Launch
                  <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                </a>
                <ul class="p-2 bg-white-100/50 backdrop-blur-md">
                  <li><a href="../../launch/vehicles/">Vehicles</a></li>
                  <li><a href="../../launch/training/">Training</a></li>
                  <li><a href="../../launch/safety/">Safety</a></li>
                  <li><a href="../../launch/recovery/">Recovery</a></li>
                </ul>
              </li>
              <li><a href="../products/">Products</a></li>
              <li><a href="../references/">References</a></li>
            </ul>
          </div>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-4xl tracking-wide" href="" style="font-family: Nova;"><code>LIFT</code></a>
        </div>
      </header>
      <header class="navbar fixed bg-base-200/[0.125] backdrop-blur-sm z-50">
        <div class="navbar-start w-[47.5%]">
          <div class="flex-1">
            <ul class="menu menu-horizontal px-1">
              <li><a href="/">Home</a></li>
              <li><a href="../../info/">About</a></li>
              <li tabindex="0">
                <a href="../">
                  Launch
                  <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                </a>
                <ul class="p-2 bg-white-100/50 backdrop-blur-md">
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
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-4xl tracking-wide" href="/" style="font-family: Nova;"><code>LIFT</code></a>
        </div>
      </header>
    `;
  }
}

customElements.define('navbar-launch-component', NavbarLaunch);
