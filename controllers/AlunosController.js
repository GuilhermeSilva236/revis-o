const Alunos = require("../models/Alunos");

const AlunosController = {
    getAll: async (req, res) => {
        res.json(await Alunos.find());
    },
    get: async (req, res) => {
        try {
            res.json(await Alunos.findById(req.params.id));
        } catch (error) {
            res.status(404).json({ error: 'Registro não encontrado' });
        }
    },
    create: async (req, res) => {
        try {
            const { nome, turma, notas } = req.body;

            // Verificar se as notas estão dentro do intervalo correto
            const notasValidas = notas.every(nota => nota >= 0 && nota <= 10);
            if (!notasValidas) {
                return res.status(400).json({ error: 'As notas devem estar entre 0 e 10' });
            }

            // Verificar se a turma é válida
            const turmasValidas = ['A', 'B', 'C', 'D', 'E'];
            if (!turmasValidas.includes(turma)) {
                return res.status(400).json({ error: 'Turma inválida' });
            }

            // Calcular a média do aluno
            const media = notas.reduce((acc, curr) => acc + curr, 0) / notas.length;

            // Definir o status do aluno com base na média
            let status;
            if (media < 5) {
                status = 'Reprovado';
            } else if (media >= 5 && media < 7) {
                status = 'Recuperação';
            } else {
                status = 'Aprovado';
            }

            // Criar o aluno com a média calculada e o status determinado
            const aluno = await Alunos.create({ nome, turma, notas, media, status });

            res.status(201).json(aluno);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            res.json(await Alunos.findByIdAndUpdate(req.params.id, req.body));
        } catch (error) {
            res.status(404).json({ error: 'Registro não encontrado' });
        }
    },
    delete: async (req, res) => {
        try {
            res.json(await Alunos.findByIdAndDelete(req.params.id));
        } catch (error) {
            res.status(404).json({ error: 'Registro não encontrado' });
        }
    },
    getReprovados: async () => {
        try {
            // Encontre todos os alunos com média menor que 5
            const alunosReprovados = await Alunos.find({ media: { $lt: 5 } });
            return alunosReprovados;
        } catch (error) {
            throw new Error('Erro ao buscar alunos reprovados');
        }
    },
    getRecuperacao: async () => {
        try {
            // Encontre todos os alunos com média entre 5 e 6.9
            const alunosRecuperacao = await Alunos.find({ media: { $gte: 5, $lt: 7 } });
            return alunosRecuperacao;
        } catch (error) {
            throw new Error('Erro ao buscar alunos em recuperação');
        }
    },
    getAprovados: async () => {
        try {
            // Encontre todos os alunos com média maior ou igual a 7
            const alunosAprovados = await Alunos.find({ media: { $gte: 7 } });
            return alunosAprovados;
        } catch (error) {
            throw new Error('Erro ao buscar alunos aprovados');
        }
    },
};

module.exports = AlunosController;
