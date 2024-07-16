const express = require("express");

class Server {
  constructor() {
    this.app = express();

    //Path
    this.usuariosPath = "/api/usuarios";

    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  middlewares() {
    //! CORS??????

    //Mostrar carpeta publica
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(3000, () => {
      console.log("Server Online");
    });
  }
}

module.exports = Server;
