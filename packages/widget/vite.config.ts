import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  // Only use library mode for production builds
  build: command === 'build' ? {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'GrailWidget',
      formats: ['es', 'umd'],
      fileName: format => `grail-widget.${format === 'es' ? 'js' : 'umd.cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    copyPublicDir: true,
  } : {},
}));
