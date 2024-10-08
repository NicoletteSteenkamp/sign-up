import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  
  base: '/', // Set this according to your deployment path

  server: {
    port: 5173,  
    open: true, 
  },

  build: {
    outDir: 'dist',  
    sourcemap: true,  
  },

  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg'], 
});
