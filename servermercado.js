// Importar las dependencias necesarias
const express = require("express");
const exphbs = require("express-handlebars");

// Crear una instancia de Express
const app = express();

//pagina de inicio bienvenida
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Configurar el motor de plantillas Handlebars
app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  exphbs.engine({
    // Directorio de layouts
    layoutsDir: __dirname + "/views",
    // Directorio de partials
    partialsDir: __dirname + "/views/componentes/",
  })
);

//Método para seleccionar carpeta pública y módulos.
app.use(express.static(__dirname + "/assets/img"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));


//  Crear una ruta raíz que reciba un parámetro “productos”.
app.get("/:image", function (req, res) {
  // Utilizar destructuring para extraer la propiedad imagen de los parámetros de la consulta con el objeto request.
  const { image } = req.params;
  //crear una constante alimentos 
  const alimentos = {
    "banana.png": "Banana",
    "cebollas.png": "Cebollas",
    "lechuga.png": "Lechuga",
    "papas.png": "Papas",
    "pimenton.png": "Pimiento",
    "tomate.png": "Tomate",
  };
  // Ocupar el método render para renderizar en inicio la vista de las imagenes y alimentos
  res.render("Inicio", {
    layout: "Inicio",
    images: [
      "banana.png",
      "cebollas.png",
      "pimenton.png",
      "papas.png",
      "lechuga.png",
      "tomate.png",
    ],
    image: image,
    alimentos: alimentos,
  });
});

app.get("/", function(req, res) {
  const productos = [
    { nombreProducto: "Banana" },
    { nombreProducto: "Cebollas" },
    { nombreProducto: "Pimenton" },
    { nombreProducto: "Papas" },
    { nombreProducto: "Lechuga" },
    { nombreProducto: "Tomate" },
  ];

  res.render("inicio", {
    productos: productos
  });
});


// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

//Middleware de error.
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('!Se ha producido un error!');
});