const express = require("express");
const bodyParser = require("body-parser");

//objeto con el mensaje de error para producto no encontrado
const NO_PRODUCT_FOUND = {
  error: "producto no encontrado",
};

//objecto con el mensaje de error para listado no encontrado
const NO_PRODUCTS_FOUND = {
  error: "no hay productos cargados",
};

//array vacío de productos
const productos = [];

const PORT = 3333;
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//metodo get para traer lista de productos
app.get("/api/productos", (req, res) => {
  productos.length > 0 ? res.send(productos) : res.send(NO_PRODUCTS_FOUND); //si el largo del array es 0 devuelvo el objeto con el mensaje de error
});
//metodo get para traer un producto específico
app.get("/api/productos/:id", (req, res) => {
  const producto = productos.filter(function (elem) {
    return elem.id === Number(req.params.id);
  });
  producto.length > 0 ? res.send(producto) : res.send(NO_PRODUCT_FOUND); // si el largo del array es 0 devuelvo el objeto con el mensaje de error
});

//post para postear un nuevo producto
app.post("/api/productos", (req, res) => {
  const elem = req.body;
  //agrego una validación sencilla que me avise si alguno de los 3 campos no está definido
  if (!elem.title && !elem.price && !elem.thumbnail) {
    throw `-- PRODUCT FORMAT EXPECTED -- ${JSON.stringify(req.body)}]`;
  }
  elem.id = productos.length;
  console.log(elem);
  productos.push(elem);
  res.send(elem);
});

const server = app.listen(PORT, () => {
  console.log(`Listening in port: ${PORT}`);
});

server.on("error", (err) => {
  console.log(`Server error: ${err}`);
});
