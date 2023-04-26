// Constantes iniciais responsáveis por pegar tudo do HTML
const letrasGeradas = document.querySelectorAll('.tecla')
const botaoDeInicio = document.querySelector('button')
const resultadoNegativo = document.querySelector('.resultado_negativo')
const resultadoPositivo = document.querySelector('.resultado_positivo')
const containerDesafio = document.querySelector('.container_desafio')
const barraProgresso = document.querySelector('.barra_atual')
const tentativasTela = document.querySelector('.tentativas')

// Efeitos sonoros e volumes.
const teclaErrada = new Audio('./sons/som_de_erro.mp3')
const teclaPressionada = new Audio('./sons/som_do_botao.mp3')
teclaErrada.volume = 0.8
teclaPressionada.volume = 0.5

// Eventos de click e apertar tecla
window.addEventListener('keydown', eventoApertarTecla)
botaoDeInicio.addEventListener('click', iniciarPararJogo)


// Tempo e sequência do desafio e do usuário
const tempoDesafio = 6 // Está em segundos.
const letras = ['Q', 'W', 'E', 'A', 'S', 'D']
const atualSequencia = []
const inputUsuario = []
let tentativas = 1;
let tentativasLimite = 5;

// Variáveis relacionadas ao começo do jogo e o momento dele
let estaIniciado = false;
let atualPosicaoDigitando = 0;
let tempoAtual = 0;
let barraAtual = 100;

// Eu imagino que seja para limpar o intervalo
let limpaIntervalo = null;

// Função responsável pela barra de progresso
function tempoBarraProgresso() {
    limpaIntervalo = setInterval(() => {
        if (barraAtual < 0) {
            tentativas = 1
            estaIniciado = false
            botaoDeInicio.classList = 'botao_de_inicio';
            botaoDeInicio.textContent = 'Começar';
            barraAtual = 100
            atualSequencia.length = 0
            inputUsuario.length = 0
            letrasGeradas.forEach(key => key.classList.remove('tecla_digitada'))
            letrasGeradas.forEach((key, index) => {
                key.textContent = ''
            })
            reiniciarJogo()
        }
        
        // Mudar a cor da barra quando fica entre 30% e 60%
        if (barraAtual > 30 && barraAtual < 60) {
            barraProgresso.style.backgroundColor = '#F58002'
        }

        // Mudar a cor da barra quando fica abaixo de 30%
        if (barraAtual <= 30) {
            barraProgresso.style.backgroundColor = '#FF3E24'
        }

        // Fazer a barra descer
        barraAtual = barraAtual - 1;
        
        // Diminuir visualmente o tamanho da barra
        barraProgresso.style.width = `${barraAtual}%`
    }, 53)
}

// Função para definir um número aleatório
function pegarLetraAleatorio(arr) {
    const minimo = 0
    const maximo = arr.length -1;
    const numeroAleatorio = Math.floor(Math.random() * (maximo - minimo + 1) + minimo)

    return arr[numeroAleatorio]
}

// Função para pegar a sequência
function pegarSequencia() {
    return sequenciaArray = new Array(10).fill().map(() => pegarLetraAleatorio(letras))
}

// Função para iniciar e parar o jogo
function iniciarPararJogo() {
    estaIniciado = !estaIniciado
    botaoDeInicio.classList = (estaIniciado) ? 'botao_de_parar' : 'botao_de_inicio'
    botaoDeInicio.textContent = (estaIniciado) ? 'Parar' :  'Começar'

    if (estaIniciado) {
        resultadoNegativo.style.display = 'none'
        resultadoPositivo.style.display = 'none'
        containerDesafio.style.display = 'grid'
        atualSequencia.push(...pegarSequencia())
        reiniciarJogo()
        tempoBarraProgresso()
        letrasGeradas[0].classList.add('tecla_atual')

        // Completar as letras aleatórias
        letrasGeradas.forEach((key, index) => {
            key.textContent = atualSequencia[index]
        })
    } else {
        atualSequencia.length = 0 // Esvaziar a sequência atual
        inputUsuario.length = 0 // Esvaziar o input do usuário
        reiniciarJogo()
        
        letrasGeradas.forEach(key => key.classList.remove('tecla_digitada'))

        // Tirar as letras que estão mostrando
        letrasGeradas.forEach((key, index) => {
            key.textContent = ''
        })
        }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    barraProgresso.style.backgroundColor = '#a3ef52'
    barraAtual = 100
    barraProgresso.style.width = '100%'
    atualPosicaoDigitando = 0
    clearInterval(limpaIntervalo)
    letrasGeradas.forEach(e => e.classList.remove('tecla_atual'))
}


// Função responsável por apertar a tecla
function eventoApertarTecla(event) {
    const inputLetra = event.key.toUpperCase()

    if (estaIniciado && letras.includes(inputLetra) && inputUsuario.length < 10) {
        inputUsuario.push(inputLetra)

        letrasGeradas.forEach((e, i) => {
            if (i - 1 === atualPosicaoDigitando) {
                e.classList.add('tecla_atual')
            } else {
                e.classList.remove('tecla_atual')
            }
        })

        if (inputUsuario.every((e, i) => e === atualSequencia[i])) {
            teclaPressionada.currentTime = 0;
            teclaPressionada.play()
            letrasGeradas[atualPosicaoDigitando].classList.add('tecla_digitada')
            atualPosicaoDigitando++
            if(inputUsuario.length === 10 && tentativas < tentativasLimite) {
                clearInterval(limpaIntervalo)
                //resultadoPositivo.style.display = 'flex'
                //containerDesafio.style.display = 'none'
                estaIniciado = true
                reiniciarJogo()
                tempoBarraProgresso()
                letrasGeradas.forEach(key => key.classList.remove('tecla_digitada'))
                letrasGeradas.forEach(key => key.classList.remove('tecla_atual'))
                letrasGeradas[0].classList.add('tecla_atual')
                inputUsuario.length = 0
                atualSequencia.length = 0
                atualSequencia.push(...pegarSequencia())
                letrasGeradas.forEach((key, index) => {
                    key.textContent = atualSequencia[index]
                })
                tentativas++
                tentativasTela.textContent = `${tentativas}/5`
            } else if (inputUsuario.length === 10 && tentativas == tentativasLimite) {
                resultadoPositivo.style.display = 'flex'
                containerDesafio.style.display = 'none'
                letrasGeradas.forEach((key, index) => {
                    key.textContent = ''
                })
                letrasGeradas.forEach(key => key.classList.remove('tecla_digitada'))
                reiniciarJogo()
                tentativas = 1;
                botaoDeInicio.classList = 'botao_de_inicio'
                botaoDeInicio.textContent = 'Começar'
            }  
        } else {
            teclaErrada.currentTime = 0;
            teclaErrada.play()
            atualPosicaoDigitando = 0
            letrasGeradas.forEach(key => key.classList.remove('tecla_digitada'))
            letrasGeradas.forEach(key => key.classList.remove('tecla_atual'))
            letrasGeradas[0].classList.add('tecla_atual')
            inputUsuario.length = 0
            atualSequencia.length = 0
            
            atualSequencia.push(...pegarSequencia()) // Pegar uma nova sequência
            letrasGeradas.forEach((key, index) => {
                key.textContent = atualSequencia[index]
            })
            }
    } else {
        if (estaIniciado) {
            teclaErrada.currentTime = 0;
            teclaErrada.play()
            atualPosicaoDigitando = 0
            letrasGeradas.forEach(key => key.classList.remove('tecla_digitada'))
            reiniciarJogo()
            inputUsuario.length = 0
            atualSequencia.length = 0
            currentSequence.length = 0
            userInput.length = 0
            atualSequencia.push(...pegarSequencia()) // Pegar uma nova sequência
            letrasGeradas.forEach((key, index) => {
                key.textContent = atualSequencia[index]
            })
        }
    }
}