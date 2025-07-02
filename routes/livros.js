const express = require('express');
const router = express.Router();
const Livro = require('../models/livro'); 
const mongoose = require('mongoose');

// GET /livros - Listar todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find(); 
    res.json(livros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /livros/:id - Obter um livro específico
router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'ID de livro inválido.' });
  }

  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.json(livro);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /livros - Criar um novo livro
router.post('/', async (req, res) => {
  const livro = new Livro({
    titulo: req.body.titulo,
    autor: req.body.autor,
    anoPublicacao: req.body.anoPublicacao,
    genero: req.body.genero,
    isbn: req.body.isbn,
    disponivel: req.body.disponivel
  });

  try {
    const novoLivro = await livro.save();
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /livros/:id - Atualizar um livro
router.put('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'ID de livro inválido.' });
  }

  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    if (req.body.titulo != null) livro.titulo = req.body.titulo;
    if (req.body.autor != null) livro.autor = req.body.autor;
    if (req.body.anoPublicacao != null) livro.anoPublicacao = req.body.anoPublicacao;
    if (req.body.genero != null) livro.genero = req.body.genero;
    if (req.body.isbn != null) livro.isbn = req.body.isbn;
    if (req.body.disponivel != null) livro.disponivel = req.body.disponivel;

    const livroAtualizado = await livro.save();
    res.json(livroAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /livros/:id - Deletar um livro
router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'ID de livro inválido.' });
  }

  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    await Livro.deleteOne({ _id: req.params.id });
    res.json({ message: 'Livro deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;