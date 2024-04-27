const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());


app.get('/resume', async (req, res) => {
    try {
      const curriculums = await prisma.curriculum.findMany({
        include: {
          experienciaProfissional: true,
          educacao: true,
        },
      });
      res.json(curriculums);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar currículos' });
    }
  });

app.post ('/resume', async (req, res) => {
    const { nome, email, telefone, endereco, objetivo, experienciaProfissional, educacao } = req.body;
    try {
      const newCurriculum = await prisma.curriculum.create({
        data: {
          nome,
          email,
          telefone,
          endereco,
          objetivo,
          experienciaProfissional: {
            create: experienciaProfissional
          },
          educacao: {
            create: educacao
          }
        }
      });
      res.json(newCurriculum);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar currículo' });
      }
    });
    
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });