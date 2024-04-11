const mongoose = require('mongoose')

async function main(){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.SENHA}@cluster0.npecx3c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Banco OK');
        
    } catch (error) {
        console.log('Erro:'+ error);
        
    }
    
}
module.exports = main