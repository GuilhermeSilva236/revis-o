const express = require('express');
const AlunosController = require('../controllers/AlunosController');
const router = express.Router();

router.get('/', function(req, res){
    res.json({});
});

// Alunos
router.get('/Alunos', (req, res) => AlunosController.getAll(req, res));
router.post('/Alunos', (req, res) => AlunosController.create(req, res));
router.get('/Alunos/:id', (req, res) => AlunosController.get(req, res));
router.put('/Alunos/:id', (req, res) => AlunosController.update(req, res));
router.delete('/Alunos/:id', (req, res) => AlunosController.delete(req, res));

// Rotas para alunos aprovados, reprovados e em recuperação
router.get('/Alunos/aprovados', async (req, res) => {
    try {
        const alunosAprovados = await AlunosController.getAprovados();
        res.json(alunosAprovados);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos aprovados' });
    }
});

router.get('/Alunos/reprovados', async (req, res) => {
    try {
        const alunosReprovados = await AlunosController.getReprovados();
        res.json(alunosReprovados);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos reprovados' });
    }
});

router.get('/Alunos/recuperacao', async (req, res) => {
    try {
        const alunosRecuperacao = await AlunosController.getRecuperacao();
        res.json(alunosRecuperacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos em recuperação' });
    }
});

module.exports = router;
