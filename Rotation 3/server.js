const express = require('express');
const path = require('path');
const connection = require('./db');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('html')); // Servir HTML direto da pasta

// LOGIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE nome = ? AND senha = ?';
  
    connection.query(sql, [username, password], (err, results) => {
      if (err) return res.status(500).send('Erro no servidor');
      if (results.length > 0) {
        const user = results[0];
        res.json({ success: true, message: 'Login OK', user });
      } else {
        res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
      }
    });
  });
  
  // UPDATE USER
  app.put('/update-user', (req, res) => {
    const { nome, email, senha, id } = req.body;
    const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
  
    connection.query(sql, [nome, email, senha, id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Erro ao atualizar' });
      res.json({ success: true, message: 'Dados atualizados!' });
    });
  });
  

// CADASTRO
app.post('/sign-in', (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  
    connection.query(sql, [nome, email, senha], (err, results) => {
      if (err) {
        console.error(err); // Isso ajuda a depurar no terminal
        return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário' });
      }
      res.json({ success: true, message: 'Usuário criado!' });
    });
  });
  

// ATUALIZAR PERFIL
app.put('/update-user', (req, res) => {
  const { nome, email, senha, id } = req.body;
  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';

  connection.query(sql, [nome, email, senha, id], (err, results) => {
    if (err) return res.status(500).send('Erro ao atualizar');
    res.json({ success: true, message: 'Dados atualizados!' });
  });
});

app.delete('/delete-user/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
  
    connection.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Erro ao deletar conta' });
      res.json({ success: true, message: 'Conta excluída com sucesso.' });
    });
  });
  
app.listen(PORT, () => console.log(`Servidor rodando: http://localhost:${PORT}`));


app.use(express.static(path.join(__dirname, 'html')));
app.use('/Css', express.static(path.join(__dirname, 'Css')));
app.use('/Galery', express.static(path.join(__dirname, 'Galery')));
app.use('/Js', express.static(path.join(__dirname, 'Js')));
