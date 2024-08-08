const { Router } = require("express");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaID,
  borrarCategoria,
  actualizarCategoria,
} = require("../controllers/categoriasCtrl");
const { check } = require("express-validator");
const { esAdminRol } = require("../middlewares/validar_roles");
const { validarJWT } = require("../middlewares/validar_JWT");
const { validarCampos } = require("../middlewares/validar_campos");
const { esCategoriaValido } = require("../helpers/db_validators");

const router = Router();

router.get("/", [validarJWT, esAdminRol, validarCampos], obtenerCategorias);

router.get("/:id", [validarJWT], obtenerCategoriaID);

router.post(
  "/",
  [
    validarJWT,
    esAdminRol,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("id").custom(esCategoriaValido),
    validarCampos,
  ],
  crearCategoria
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esCategoriaValido),
    validarCampos,
  ],
  actualizarCategoria
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esCategoriaValido),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
