const express = require('express')  //aqui estou iniciando o express
const router = express.Router()  //aqui estou configurando a primeira parte da rota
const cors =require('cors') //aqui estou liberando o cors para o front-end
const conectaBancoDeDados = require('./bancoDeDados') //aqui estou ligando ao arquivo Banco de Dados
conectaBancoDeDados() // aqui estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //aqui estou iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333 // aqui estou criando a porta


//PORTA
function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta)
    
}

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)

    } catch(erro) {
        console,log(erro)
    }
}

//POST
async function criaMulher(request,response) {
    const novaMulher = new Mulher( {
        nome: request.body.nome,
        imagem: request.body.imagem,
        citacao: request.body.citacao,
        minibio: request.body.minibio,
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch(erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }  
        
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)

    } catch(erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    try { 
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({messagem: 'Mulher deletada com sucesso!'})
    } catch(erro){
        console.log(erro)
    }
}
    

app.use(router.get('/mulheres', mostraMulheres)) //configuração da rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configurei rota post /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) // configurei a rota patch corrigeMulher /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) // configurei a rota delete /mulheres/:id
app.listen(porta, mostraPorta)//servidor ouvindo a porta