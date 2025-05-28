import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser with proper MIME types
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (path.endsWith('.woff2')) {
        res.setHeader('Content-Type', 'font/woff2');
      } else if (path.endsWith('.woff')) {
        res.setHeader('Content-Type', 'font/woff');
      } else if (path.endsWith('.ttf')) {
        res.setHeader('Content-Type', 'font/ttf');
      } else if (path.endsWith('.eot')) {
        res.setHeader('Content-Type', 'application/vnd.ms-fontobject');
      }
    }
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => {
        res.send(html);
      })
      .catch((err) => {
        console.error('Error rendering page:', err);
        // If there's an error, try to serve the static index.html
        res.sendFile(join(browserDistFolder, 'index.html'), (err) => {
          if (err) {
            console.error('Error serving static index.html:', err);
            next(err);
          }
        });
      });
  });

  // Error handling middleware
  server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).send('Internal Server Error');
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
