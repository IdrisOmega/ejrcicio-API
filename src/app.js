const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let clientes = [
  { "imagen": "Eder.jpg", "nombre": "Eder", "descripcion": "Famoso racista veterano con Sida", "id": 1 },
  { "imagen": "descarga.jpg", "nombre": "Javier", "descripcion": "Presidente de Argentina PAPA", "id": 2 },
  { "imagen": "Adriano.jpg", "nombre": "Adriano", "descripcion": "Con la inteligencia de L y la masa de un palo", "id": 3 },
  { "imagen": "Rober.jpg", "nombre": "Rober", "descripcion": "Gran profe que me dara un 10 por crak", "id": 4 },
  { "imagen": "Idris.jpg", "nombre": "Idris", "descripcion": "Es un papucho", "id": 5 },
  { "imagen": "Santiago.jpg", "nombre": "Santiago", "descripcion": "Don John Santiago Wii", "id": 6 },
  { "imagen": "Ivan.jpg", "nombre": "Ivan", "descripcion": "Ex convicto asaltacunas", "id": 7 },
  { "imagen": "Birham.jpg", "nombre": "Birham", "descripcion": "Sucesor del salvador de la humanidad", "id": 8 }
];


app.get('/clientes', (req, res) => {
  res.json(clientes);
});


app.post('/clientes', (req, res) => {
  const { imagen, nombre, descripcion } = req.body;
  const id = clientes.length ? clientes[clientes.length - 1].id + 1 : 1;
  const nuevoCliente = { imagen, nombre, descripcion, id };
  clientes.push(nuevoCliente);
  res.status(201).json(nuevoCliente);
});

app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  clientes = clientes.filter(cliente => cliente.id !== parseInt(id));
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
