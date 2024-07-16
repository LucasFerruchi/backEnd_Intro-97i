const { Router } = require("express");

const router = Router();

//Ruta GET
router.get("/", (req, res) => {
  res.json({
    mensaje: "recibo el mensaje",
  });
});

//Ruta POST
router.post("/", (req, res) => {
  res.json({
    mensaje: "envio el mensaje",
  });
});

//Ruta PUT
router.put("/:id", (req, res) => {
  res.json({
    mensaje: "modifico datos",
  });
});

//Ruta DELETE
router.delete("/:id", (req, res) => {
  res.json({
    mensaje: "elimino datos",
  });
});

module.exports = router;
