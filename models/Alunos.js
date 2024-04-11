const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    turma: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D', 'E']
    },
    notas: {
        type: [Number],
        validate: {
            validator: function(v) {
                return v.length === 4 && v.every(nota => nota >= 0 && nota <= 10);
            },
            message: 'Deve ser fornecido um array de 4 notas válidas (entre 0 e 10)'
        }
    },
    media: {
        type: Number,
        validate: {
            validator: function() {
                return this.notas.reduce((acc, nota) => acc + nota, 0) / this.notas.length;
            },
            message: 'A média calculada não corresponde às notas fornecidas'
        }
    }
}, { timestamps: true });

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
