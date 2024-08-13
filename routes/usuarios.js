const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar_JWT");
const { esAdminRol } = require("../middlewares/validar_roles");
const { validarCampos } = require("../middlewares/validar_campos");

const router = Router();
const {
  esMailValido,
  esRolValido,
  esIdValido,
  esCursoValido,
} = require("../helpers/db_validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuariosCtrl");

//Ruta GET
router.get("/", [validarJWT, esAdminRol], usuariosGet);

//Ruta GET - USUARIO
router.get("/:id", [validarJWT], usuariosGet);

//Ruta POST - register
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "no es un correo valido!").isEmail(),
    check("correo").custom(esMailValido),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

//Ruta PUT - update
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido!").isMongoId(),
    check("id").custom(esCursoValido),
    validarCampos,
  ],
  usuariosPut
);

//Ruta DELETE
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido!").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
