import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      vue(),
      {
        name: 'api-contact-dev-server',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/contact' || req.url === '/api/contact/') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                req.body = body;
                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                };
                try {
                  // Dynamically import api/contact.js
                  const module = await server.ssrLoadModule('/api/contact.js');
                  const handler = module.default;
                  await handler(req, res);
                } catch (err) {
                  console.error('Dev API Error:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, message: err.message }));
                }
              });
            } else {
              next();
            }
          });
        },
      },
    ],
    base: process.env.VERCEL ? '/' : './',
    build: {
      outDir: 'dist',
    },
  };
});