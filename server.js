//importação de dependências
import http from 'http'
import { url } from 'inspector'
import {v4} from 'uuid'

//setap do sevidor
const porta = 3000

//criando um array
const grades = []

// criando servidor
const servidor = http.createServer((req, res) =>{

    //funções do beck-end
    const {method,url}= req
    let body = '';

    req.on('data', chunk=>{
    body += chunk.toString()
})

    req.on('end',()=>{
    const id = url.split('/')[2]

    
//get
if (method ==='GET'&& url ==='/grades'){
    res.writeHead(200,{'content-Type':'application/json'})
    res.end(JSON.stringify(grades))
    }

//post
else if(method === 'POST' && url ==='/grades')  {
    const{studantName,course,grade}=JSON.parse(body)
    const newGrade = {id: v4(), studantName,course,grade}
    grades.push(newGrade)
    res.writeHead(201,{'content-Type':'application/json'})
    res.end(JSON.stringify(newGrade))
}

//put
else if(url.startsWith('/grades')&& method ==='PUT'){

}

//delete
else if(url.startsWith('/grades')&& method === 'DELETE'){

}
//erro
else{
    res.writeHead(404,{'content-Type':'application/json'})
    res.end(JSON.stringify({error:'Rota não encontrada'}))
}

})


})
//inicia o servidor

servidor.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})



