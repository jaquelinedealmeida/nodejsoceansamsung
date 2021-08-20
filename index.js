const express = require("express");
const app = express();

//Sinalizaremos para o express que todo body da requisição
//estará estruturado
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hello World");
});

// CRUD -> Create, Read (All & Single/byId), Update, Delete

// "CRUD em memória"

// Lista de textos (strings)
const lista = [
  {
    
    id:1,
    nome: "Rick Sanchez",
  }, 

  {
    id: 2,
    nome: "Morty Smith",

  },
    
  ];
//              0               1

// [GET] /personagens
// Read All
app.get("/personagens", function (req, res) {
    res.send(lista);
});

function findById(id) {
  return lista.find(elemento => elemento.id === id);
}

//GET("/personagens/:id")
app.get("/personagens/:id", function(req, res) {
  const id = +req.params.id;
  // + o mais sinaliza que a string vira número
  
  const item = findById(id);

  if (!item) {
    res.status(404).send("Personagem não encontrado");
  
    return;  
  }

  res.send(item);
});

//[POST] /personagens
//Create
app.post("/personagens", function (req, res) {
  //Obtém o corpo da requisicao e coloca na variável item
  const item = req.body;

  if(!item) {
    res.status(400).send(
      "Chave 'nome' não foi encontrado no corpo da requisição"
    );

    return;
  }

  item.id = lista.push(item);

  res.send("Item adcionado com sucesso");
  //
});

//PUT/Personagens
//Update
app.put("/personagens/:id", function(req, res){
  
// Objetivo: Atualizar uma personagem
// Passos:
// Pegar o ID dessa personagem
// Atualizar essa nova informação na lista de personagem
// Exibir que deu certo
 
const id = +req.params.id;

const itemEncontrado = findById(id);

if (!itemEncontrado) {
  res.status(404).send("Personagem não encontrado");
  
  return;
}

const novoItem = req.body;

if(!novoItem || !novoItem.nome) {
  res.status(400).send(
    "Chave 'nome' não foi encontrada no corpo da requisição."
  );

  return;
}

const index = lista.indexOf(itemEncontrado);

novoItem.id = id;

lista[index] = novoItem;

res.send("Personagem atualizado com sucesso");

});

//DELETE / personagens/:id
//delete

app.delete("/personagens/:id", function (req, res) {
 const id = +req.params.id;

 const itemEncontrado = findById(id);

 if(!itemEncontrado) {
   res.status(404).send("Personagem não encontrado");
    
   return;
  }

  const index = lista.indexOf(itemEncontrado);

  lista.splice(index,1)


 res.send("Personagem removida com sucesso");
});

app.listen(3000);