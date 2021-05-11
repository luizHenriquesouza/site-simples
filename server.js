const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url:"https://avatars0.githubusercontent.com/u/6610691?s=460&v=4",
        name:"Luiz Henrique Souza",
        role:"Desenvolvedor Front-End Junior",
        description:"Atuando como técnico de informática desde meados 2014 ( autônomo). No geral mais focado em reparo/manutenção hardware e software. Hoje estou focado em meus estudos HTML, CSS e JavaScript. Intusiasta em tecnologias, quero ingressar no mercado de desenvolvimento front-end web seja CLT ou PJ. Sou aluno da Rocketseat e estou cursando o Bootcamp Launchbase. Em minhas horas vagas, amo estar com a minha família, assistir futebol (sou péssimo jogador mas jogo), games, música, filmes, séries e também gosto de um bom bate-papo fora da caixa. Quer trocar uma idéia?",
        links: [
            { name: "Github", url: "https://github.com/luizHenriquesouza/"},
            { name: "LinkedIn", url: "https://www.linkedin.com/in/luizhenriquedevfront/"}
        ]
    }


    return res.render("about", {about})
})

server.get("/projetos", function(req, res){

  return res.render("projetos", {items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", {item: video})
})

server.listen(5000, function() {
    console.log("server is running")
})