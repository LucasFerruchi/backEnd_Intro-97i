const { response, request } = require("express");
const Categoria = require("../models/categorias");
const categorias = require("../models/categorias");

//controlador GET
const obtenerCategorias = async (req = request, res = response) => {
  const { desde = 0, limite = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(desde)
      .limit(limite)
      //! METODO POPULATE
      .populate("usuario", "correo"),
  ]);

  res.json({
    total,
    categorias,
  });
};

//controlador GET/id
const obtenerCategoriaID = async (req = request, res = response) => {
  //recibo del FRONT
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate(
    "usuario",
    "nombre correo"
  );

  res.json({
    categoria,
  });
};

//controlador POST
const crearCategoria = async (req = request, res = response) => {
  //recibo datos del front
  const nombre = req.body.nombre.toUpperCase();

  //validar en DB
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe!`,
    });
  }

  //data
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  //Crear nueva instancia
  const categoria = new Categoria(data);

  //enviar a la DB
  await categoria.save();

  //respuesta al front
  if (categoria) {
    res.status(201).json({
      categoria,
      msg: "La categoria fue creada con exito!",
    });
  }
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaID,
  crearCategoria,
};
