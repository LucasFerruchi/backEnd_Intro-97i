const Usuario = require("../models/usuario");
const Rol = require("../models/rol");
const Categoria = require("../models/categorias");
const Curso = require("../models/curso");

const esMailValido = async (correo) => {
  const exiteCorreo = await Usuario.findOne({ correo });

  if (exiteCorreo) {
    throw new Error(`El correo ${correo} ya existe en la base de datos!`);
  }
};

const esRolValido = async (rol) => {
  const exiteRol = await Rol.findOne({ rol });

  if (!exiteRol) {
    throw new Error(`El rol ${rol} no existe!`);
  }
};

const esIdValido = async (id) => {
  const exiteUsuario = await Usuario.findById(id);

  if (!exiteUsuario) {
    throw new Error(`El ${id} no se encuentra en la base de datos!`);
  }
};

const esCategoriaValido = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`La categoria no existe en la DB, revise el ID!`);
  }
};

const esCursoValido = async (id) => {
  const existeCurso = await Curso.findById(id);

  if (!existeCurso) {
    throw new Error(`El Id ${id} no corresponde a un curso existente!`);
  }
};

module.exports = {
  esMailValido,
  esRolValido,
  esIdValido,
  esCategoriaValido,
  esCursoValido,
};
