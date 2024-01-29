const express = require('express')
const router = express.Router()

const app = express()
const porta = 3333

function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta)
    
}

function mostraMulher(request, response){
    response.json({
        nome: 'Simara Conceição',
        imagem: 'https://github.com/simaraconceicao.png',
        minibio: 'Desenvolvedora e Instrutora'
    })
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)