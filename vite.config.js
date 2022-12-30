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
            },
        },
    },
})