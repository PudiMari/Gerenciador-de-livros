const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true 
  },
  autor: {
    type: String,
    required: true
  },
  anoPublicacao: {
    type: Number
  },
  genero: {
    type: String
  },
  isbn: {
    type: String,
    unique: true
  },
  disponivel: {
    type: Boolean,
    default: true
  },
  dataRegistro: {
    type: Date,
    default: Date.now 
  }
});

module.exports = mongoose.model('Livro', livroSchema);