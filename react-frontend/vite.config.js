import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const djangoStaticDir = '../moc-backend/static/react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output the build files to the Django static directory
    outDir: djangoStaticDir,
    // Set the base path for the application
    base: '/static/react/',
    assetsDir: 'assets',
  },
});
