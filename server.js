const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple in-memory cache for HTML pages (LRU-like with max size)
const cache = new Map();
const MAX_CACHE_ITEMS = 20;
function getFromCache(key) {
  return cache.get(key);
}
function setToCache(key, value) {
  if (cache.has(key)) {
    cache.delete(key);
  }
  cache.set(key, value);
  if (cache.size > MAX_CACHE_ITEMS) {
    // Evict the oldest inserted
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
}

app.use(compression());

// Serve static assets with long-term caching
app.use(express.static(path.resolve(__dirname), {
  etag: true,
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (/\.(svg|png|jpg|jpeg|gif|css|js)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    }
  }
}));

app.get('/', (req, res) => {
  const index = path.resolve(__dirname, 'src', 'pages', 'index.html');
  if (fs.existsSync(index)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.sendFile(index);
  }
  return res.redirect('/roadmap');
});

app.get('/roadmap', (req, res) => {
  const roadmap = path.resolve(__dirname, 'src', 'pages', 'roadmap.html');
  if (fs.existsSync(roadmap)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.sendFile(roadmap);
  }
  return res.redirect('/');
});

app.get('/infografico/:id', (req, res) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    return res.status(400).send('ID inválido');
  }
  let file = path.resolve(__dirname, 'src', 'pages', `${id}.page.html`);
  if (!fs.existsSync(file)) {
    file = path.resolve(__dirname, `${id}.page.html`);
  }

  try {
    let html = getFromCache(file);
    if (!html) {
      if (!fs.existsSync(file)) {
        return res.status(404).send('Infográfico não encontrado');
      }
      html = fs.readFileSync(file, 'utf-8');
      setToCache(file, html);
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=300'); // cache de página por 5 min
    return res.send(html);
  } catch (err) {
    console.error('Erro ao servir página:', err);
    return res.status(500).send('Erro interno do servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
