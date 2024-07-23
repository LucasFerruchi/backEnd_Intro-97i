const { response, request } = require("express");

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
const usuariosPost = (req = request, res = response) => {
  const datos = req.body;
  // const { nombre, correo, password, rol } = datos;

  res.json({
    datos,
    mensaje: "envio el mensaje",
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
