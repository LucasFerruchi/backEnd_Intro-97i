const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar_JWT");
const { esAdminRol } = require("../middlewares/validar_roles");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");

const router = Router();

const { crearCurso } = require("../controllers/cursosCtrl");

//RUTA POST
router.post(
  "/",
  [
    validarJWT,
    esAdminRol,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCurso
);

module.exports = router;
