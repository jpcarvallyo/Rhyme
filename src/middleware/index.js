function myMiddleware(req, res, next) {
  // Add middleware for authorization
  console.log("Testing the middleware");
  next();
}

module.exports = myMiddleware;
