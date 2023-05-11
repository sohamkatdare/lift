import { resolve } from 'path'
import { defineConfig } from 'vite'

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
                gas_giant: resolve(__dirname, 'src/products/gas_giant/index.html'),
                login: resolve(__dirname, 'src/login/index.html'),
                signup: resolve(__dirname, 'src/signup/index.html'),
                launch: resolve(__dirname, 'src/launch/index.html'),
                launch_recovery: resolve(__dirname, 'src/launch/recovery/index.html'),
                launch_safety: resolve(__dirname, 'src/launch/safety/index.html'),
                launch_training: resolve(__dirname, 'src/launch/training/index.html'),
                launch_vehicles: resolve(__dirname, 'src/launch/vehicles/index.html'),
                references: resolve(__dirname, 'src/references/index.html'),
                404: resolve(__dirname, 'src/404/index.html'),
                403: resolve(__dirname, 'src/403/index.html'),
                booking: resolve(__dirname, 'src/booking/index.html'),
                booking_p1: resolve(__dirname, 'src/booking/p-1/index.html'),
                booking_p2: resolve(__dirname, 'src/booking/p-2/index.html'),
                booking_p3: resolve(__dirname, 'src/booking/p-3/index.html'),
            },
        },
    },
})