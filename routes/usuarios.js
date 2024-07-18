const { Router } = require("express");
const router = Router();

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuariosCtrl");

//Ruta GET
router.get("/", usuariosGet);

//Ruta POST - register
router.post("/", usuariosPost);

//Ruta PUT - update
router.put("/:id", usuariosPut);

//Ruta DELETE
router.delete("/:id", usuariosDelete);

module.exports = router;
