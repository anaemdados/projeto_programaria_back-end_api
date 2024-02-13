const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancoDeDados() {
    try {
        console.log('A conexão com o Banco de Dados iniciou')

    await mongoose.connect(process.env.MONGO_URL)

    console.log('Conexão com o Banco de Dados realizada com sucesso!')

    } catch(erro) {
        console.log(erro)
    }

}

module.exports = conectaBancoDeDados