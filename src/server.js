const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');


const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(jsonServer.bodyParser)

const routesPath = path.join(__dirname, 'routes');

server.use(jsonServer.rewriter({
  "/api/*": "/$1",
  ...(fs.readdirSync(routesPath).reduce((all, routeName) => {
    const rKey = `/${routeName}*`;
    return  {...all, [rKey]: `/${routeName}/items/$1`}
  }, {}))
}))

// Função utilitária para carregar middlewares e JSONs de cada rota
const loadRoute = (routePath, routeName) => {
  const dbPath = path.join(routePath, 'db.json');
  const middlewarePath = path.join(routePath, 'middleware.js');
  const renderPath = path.join(routePath, 'render.js');
  
  if (fs.existsSync(middlewarePath)) {
    const middleware = require(middlewarePath);
    server.use(`/${routeName}`, middleware);
  }

  if (fs.existsSync(dbPath)) {
    const router = jsonServer.router(dbPath);
    server.use(`/${routeName}`, router);
  
    if (fs.existsSync(renderPath)) {
      router.render = require(renderPath);
    }
  }

 

};

// Adiciona middlewares padrões
server.use(middlewares);

// Carrega todas as rotas modularizadas em /routes

fs.readdirSync(routesPath).forEach((routeName) => {
  const routePath = path.join(routesPath, routeName);
  loadRoute(routePath, routeName);
});



// Inicia o servidor na porta 3000
server.listen(3333, () => {
  console.log('JSON Server is running with modular routes');
});
