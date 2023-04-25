function myMiddleware(req, res, next) {
  // TODO: middleware for authorization
  console.log("Testing the middleware");
  next();
}

module.exports = myMiddleware;
