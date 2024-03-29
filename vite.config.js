import { resolve } from 'path'
import { defineConfig } from 'vite'

const rewriteSlashToIndexHtml = () => {
  return {
    name: 'rewrite-slash-to-index-html',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      // rewrite / as index.html
      server.middlewares.use('/', (req, _, next) => {
        if (req.url === '/') {
          req.url = '/index.html';
        }
        next();
      });
    },
  };
};

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        info: resolve(__dirname, 'src/info/index.html'),
        products: resolve(__dirname, 'src/products/index.html'),
        terrestrial: resolve(__dirname, 'src/products/terrestrial/index.html'),
        earth_to_earth: resolve(__dirname, 'src/products/earth_to_earth/index.html'),
        gas_giant: resolve(__dirname, 'src/products/gas_giant/index.html'),
        login: resolve(__dirname, 'src/login/index.html'),
        reset_password: resolve(__dirname, 'src/login/reset_password/index.html'),
        signup: resolve(__dirname, 'src/signup/index.html'),
        launch: resolve(__dirname, 'src/launch/index.html'),
        launch_recovery: resolve(__dirname, 'src/launch/recovery/index.html'),
        launch_safety: resolve(__dirname, 'src/launch/safety/index.html'),
        launch_training: resolve(__dirname, 'src/launch/training/index.html'),
        launch_vehicles: resolve(__dirname, 'src/launch/vehicles/index.html'),
        references: resolve(__dirname, 'src/references/index.html'),
        404: resolve(__dirname, 'src/404.html'),
        403: resolve(__dirname, 'src/403.html'),
        booking: resolve(__dirname, 'src/booking/index.html'),
        booking_p1: resolve(__dirname, 'src/booking/p_1/index.html'),
        booking_p2: resolve(__dirname, 'src/booking/p_2/index.html'),
        booking_p3: resolve(__dirname, 'src/booking/p_3/index.html'),
        profile: resolve(__dirname, 'src/profile/index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          return 'assets/' + assetInfo.name;
        },
      },
    },
  },
  appType: 'mpa', // disable history fallback
  plugins: [
    rewriteSlashToIndexHtml(),
  ],
});