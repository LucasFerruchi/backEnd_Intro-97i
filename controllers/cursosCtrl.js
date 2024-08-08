const { response, request } = require("express");
const Curso = require("../models/curso");

//CONTROLADOR POST
const crearCurso = async (req = request, res = response) => {
  const { precio, categoria, img, descripcion } = req.body;
  const nombre = req.body.nombre.toUpperCase();

  const cursoDB = await Curso.findOne({ nombre });

  if (cursoDB) {
    res.status(400).json({
      msg: `El curso ${cursoDB.nombre} ya existes`,
    });
  }

  const data = {
    nombre,
    categoria,
    precio,
    img,
    descripcion,
    img,
    usuario: req.usuario._id,
  };

  const curso = new Curso(data);

  await curso.save();

  if (curso) {
    res.status(201).json({
      curso,
      msg: "Elcurso fue creada con exito!",
    });
  }
};

module.exports = {
  crearCurso,
};
