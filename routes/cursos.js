const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar_JWT");
const { esAdminRol } = require("../middlewares/validar_roles");
const { check } = require("express-validator");
const { esCursoValido } = require("../helpers/db_validators");
const { validarCampos } = require("../middlewares/validar_campos");

const router = Router();

const {
  crearCurso,
  actualizarCurso,
  borrarCurso,
  obtenerCurso,
  obtenerCursos,
} = require("../controllers/cursosCtrl");

//RUTA GET
router.get("/", obtenerCursos);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esCursoValido),
    validarCampos,
  ],
  obtenerCurso
);

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

//RUTA PUT
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esCursoValido),
    validarCampos,
  ],
  actualizarCurso
);

//RUTA DELETE

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esCursoValido),
    validarCampos,
  ],
  borrarCurso
);
module.exports = router;
