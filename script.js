// Banco de dados com as perguntas do quiz
const perguntas = [
    {
        pergunta: "1) Qual das tecnologias abaixo ajuda diretamente a economizar água na agricultura?",
        alternativas: [
            { texto: "A) Tratores mais velozes", correto: false },
            { texto: "B) Sensores de umidade no solo", correto: true },
            { texto: "C) Uso de fertilizantes comuns", correto: false },
            { texto: "D) Desmatamento planejado", correto: false }
        ]
    },
    {
        pergunta: "2) O que significa o conceito de 'Agro forte e futuro sustentável'?",
        alternativas: [
            { texto: "A) Produzir em alta escala sem se importar com a natureza", correto: false },
            { texto: "B) Parar de produzir alimentos para proteger as florestas", correto: false },
            { texto: "C) Equilibrar a alta produção com o respeito e preservação do meio ambiente", correto: true },
            { texto: "D) Usar robôs para substituir as plantas", correto: false }
        ]
    },
    {
        pergunta: "3) Qual dessas práticas agrícolas ajuda a manter os nutrientes do solo sem desgastá-lo?",
        alternativas: [
            { texto: "A) Queimadas anuais", correto: false },
            { texto: "B) Rotação de culturas e plantio direto", correto: true },
            { texto: "C) Monocultura repetitiva", correto: false },
            { texto: "D) Irrigação excessiva e inundação", correto: false }
        ]
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;

// Função que monta a pergunta atual na tela
function carregarPergunta() {
    const areaQuiz = document.getElementById("area-quiz");
    const resultadoTexto = document.getElementById("resultado-quiz");
    
    // Limpa a mensagem de feedback da resposta anterior
    resultadoTexto.innerText = ""; 

    if (indicePerguntaAtual < perguntas.length) {
        const dadosPergunta = perguntas[indicePerguntaAtual];
        
        // Coloca o texto da pergunta
        areaQuiz.innerHTML = `
            <p id="pergunta">${dadosPergunta.pergunta}</p>
            <div class="alternativas" id="alternativas"></div>
        `;

        // Coloca os botões das alternativas
        const containerAlternativas = document.getElementById("alternativas");
        dadosPergunta.alternativas.forEach(opcao => {
            const botao = document.createElement("button");
            botao.innerText = opcao.texto;
            botao.classList.add("btn-opcao");
            
            // Quando clica, roda a função para verificar se acertou
            botao.addEventListener("click", () => verificarResposta(opcao.correto, botao));
            containerAlternativas.appendChild(botao);
        });
    } else {
        // Se acabaram as perguntas, mostra o resultado final
        mostrarResultadoFinal();
    }
}

// Função que checa a resposta e avisa na hora se está correta ou errada
function verificarResposta(eCorreto, botaoClicado) {
    const resultadoTexto = document.getElementById("resultado-quiz");
    
    // Desativa todos os botões para o usuário não clicar em mais de um
    const botoes = document.querySelectorAll(".btn-opcao");
    botoes.forEach(b => b.disabled = true);

    if (eCorreto) {
        pontuacao++;
        botaoClicado.style.backgroundColor = "#52b788"; // Fica verde
        botaoClicado.style.color = "#white";
        resultadoTexto.innerText = "🎉 Correto! Muito bem.";
        resultadoTexto.style.color = "#2d6a4f";
    } else {
        botaoClicado.style.backgroundColor = "#b7094c"; // Fica vermelho
        botaoClicado.style.color = "white";
        resultadoTexto.innerText = "❌ Incorreto! Fique mais atento.";
        resultadoTexto.style.color = "#b7094c";
    }

    // Espera 2 segundos para o aluno ver o resultado e passa para a próxima pergunta
    setTimeout(() => {
        indicePerguntaAtual++;
        carregarPergunta();
    }, 2000);
}

// Mostra a tela final com a pontuação alcançada
function mostrarResultadoFinal() {
    const areaQuiz = document.getElementById("area-quiz");
    areaQuiz.innerHTML = `
        <h4>🏆 Desafio Concluído!</h4>
        <p style="margin: 15px 0; font-size: 1.2rem;">Você acertou <strong>${pontuacao}</strong> de <strong>${perguntas.length}</strong> perguntas.</p>
        <button class="btn" onclick="reiniciarQuiz()">Tentar Novamente</button>
    `;
}

// Função para resetar o jogo caso queira jogar de novo
function reiniciarQuiz() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    carregarPergunta();
}

// Inicia o quiz assim que a página carrega
window.onload = carregarPergunta;