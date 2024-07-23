const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

//Controlador GET
const usuariosGet = (req = request, res = response) => {
  const { limit, Key } = req.query;

  res.json({
    mensaje: "recibo el mensaje",
    limit,
    //! Key,
  });
};

//Controlador POST
const usuariosPost = async (req = request, res = response) => {
  const datos = req.body;
  const { nombre, correo, password, rol } = datos;

  const usuario = new Usuario({ nombre, correo, password, rol });

  const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(password, salt);
  // usuario.password = hash;
  usuario.password = bcrypt.hashSync(password, salt);

  //Guardar en DB
  await usuario.save();

  res.json({
    usuario,
    mensaje: "usuario registrado!",
  });
};

//Controlador PUT
const usuariosPut = (req = request, res = response) => {
  res.json({
    mensaje: "modifico datos",
  });
};

//Controlador DELETE
const usuariosDelete = (req = request, res = response) => {
  res.json({
    mensaje: "elimino datos",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
