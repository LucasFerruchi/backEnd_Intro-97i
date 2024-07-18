const express = require("express");
//CORS
const cors = require("cors");
//DB
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();

    //Puerto
    this.port = process.env.PORT;

    //Path
    this.usuariosPath = "/api/usuarios";

    //DB
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  //Base de datos
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    //Mostrar carpeta publica
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Online", this.port);
    });
  }
}

module.exports = Server;
