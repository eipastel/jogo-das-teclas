// Constantes iniciais responsáveis por pegar tudo do HTML
const letrasGeradas = document.querySelectorAll('.tecla')
const botaoDeInicio = document.querySelector('button')
const resultadoNegativo = document.querySelector('.resultado_negativo')
const resultadoPositivo = document.querySelector('.resultado_positivo')
const containerDesafio = document.querySelector('.container_desafio')
const barraProgresso = document.querySelector('.barra_progresso')

// Efeitos sonoros e volumes.
const teclaErrada = new Audio('./sons/som_de_erro.mp3')
const teclaPressionada = new Audio('./sons/som_do_botao.mp3')
teclaErrada.volume = 0.8
teclaPressionada.volume = 0.5

// Tempo e sequência do desafio e do usuário
const tempoDesafio = 6 // Está em segundos.
const letras = ['Q', 'W', 'E', 'A', 'S', 'D']
const atualSequencia = []
const inputUsuario = []

// Variáveis relacionadas ao começo do jogo e o momento dele
let estaIniciado = false;
let atualPosicaoDigitando = 0;
let tempoAtual = 0;
let barrraAtual = 100;

// Eu imagino que seja para limpar o intervalo
let limpaIntervalo = null;

function tempoBarraProgresso() {
    limpaIntervalo = setInterval(() => {
        if (barrraAtual < 0) {
            clearInterval(timerId)
            resultadoNegativo.style.display = 'flex';
            containerDesafio.style.display = 'none';
            estaIniciado = false;
            botaoDeInicio.classList = 'botao_iniciar';
            botaoDeInicio.textContent = 'Começar';

            atualSequencia = 0 // Esvaziar a array que dita sequência
            inputUsuario = 0 // Esvaziar array que dita qual a tecla atual que o usuario está digitando
            reiniciarJogo()
            letrasGeradas.forEach(key => key.classList.remove('tecla_digitada'))

            // Limpa as teclas que estão mostrando
            letrasGeradas.forEach((key, index) => {
                key.textContent = ''
            }
        }
        

        if (barrraAtual > 30 && barrraAtual < 60) {
            barraProgresso.style.backgroundColor = '#F58002'
        }

        if (barrraAtual <= 30) {
            barraProgresso.style.backgroundColor = '#FF3E24'
        }

        barrraAtual = barrraAtual - 1;
        barraProgresso.style.width = `${barrraAtual}%`
    }, 53)
}

// Função para definir um número aleatório
function pegarLetraAleatorio(arr) {
    const minimo = 0
    const maximo = arr.length -1;
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min)

    return arr[numeroAleatorio]
}

function pegarSequencia() {
    return sequenciaArray = new Array(10).fill().map(() => pegarLetraAleatorio(letras))
}

function iniciarPararJogo() {
    estaIniciado = !estaIniciado
    buttonStart.classList = (estaIniciado) ? 'botao_de_parar' : 'botao_de_iniciar'
    botaoDeInicio.textContent = (isStart) ? 'Parar' :  'Começar'

    if (estaIniciado) {
        resultadoNegativo.style.display = 'none'
        resultadoPositivo.style.display = 'none'
        containerDesafio.style.display = 'grid'
        atualSequencia.push(...pegarSequencia())
        reiniciarJogo()
        tempoBarraProgresso()
        letrasGeradas[0].classList.add('tecla-atual')
    }
}