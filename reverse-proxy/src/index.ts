import http from 'http';
import httpProxy from 'http-proxy';
import cors from 'cors';

const proxy = httpProxy.createProxyServer();
proxy.on('error', function (error, req, res: http.ServerResponse) {
  console.log('error', error);
  (res as http.ServerResponse).statusCode = 500;
  res.end();
});
proxy.on('proxyRes', (proxyRes, req, res) => {
  if (req.headers['access-control-request-method']) {
    res.setHeader(
      'access-control-allow-methods',
      req.headers['access-control-request-method'],
    );
  }

  if (req.headers['access-control-request-headers']) {
    res.setHeader(
      'access-control-allow-headers',
      req.headers['access-control-request-headers'],
    );
  }

  if (req.headers.origin) {
    res.setHeader('access-control-allow-origin', req.headers.origin);
    res.setHeader('access-control-allow-credentials', 'true');
  }
});

http
  .createServer(function (req, res) {
    const path = req.url;

    if (path.includes('auth-service')) {
      proxy.web(req, res, {
        target: `http://localhost:5000`,
      });
    }

    if (path.includes('post-service')) {
      proxy.web(req, res, {
        target: `http://localhost:5001`,
      });
    }

    if (path.includes('file-service')) {
      proxy.web(req, res, {
        target: `http://localhost:5002`,
      });
    }

    if (path.includes('message-service')) {
      proxy.web(req, res, {
        target: `http://localhost:5003`,
      });
    }
    
    if (path.includes('friend-service')) {
      proxy.web(req, res, {
        target: `http://localhost:5004`,
      });
    }

    res.statusCode = 500;
    return res;
  })
  .listen(8080, () => console.log('listening at 8080'));
