
//o codigo abaixo é uma maneira de executar o codigo javascript no html.
//porém existe uma maneira mais simplificada de executar.

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Número Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1} );
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

function verificarChute() {
        let chute = document.querySelector('input').value;

        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Você acertou!');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = (`Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`);
            exibirTextoNaTela('p', mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor!');      
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }        
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
        //includes é um metodo que verifica se o numeroEscolhido já foi sorteado.
        //se o numeroEscolhido já foi sorteado, ele chama a função gerarNumeroAleatorio novamente.
        //se não, ele toma outra ação.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        //Push adiciona o numeroEscolhido a listaDeNumerosSorteados, ao final da lista.
        //Para remover o último elemento, você pode usar o método pop().
        //Para remover o primeiro elemento, você pode usar o método shift().
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
        

}

//campo criado para limpar o campo de palpites, após o usuário acertar ou errar o numero secreto.
//o campo de palpites é o campo de input.
//para isso é criado uma nova função chamada limparCampo.
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

//Documentação sobre listas
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array
//sempre utilizar [] para criar uma lista.
//let lista = [1, 2, 3, 4, 5];
//comando length para saber o tamanho da lista.
//lista [lista.length - 1]; //para saber o ultimo elemento da lista.
//Push() adiciona item ao final da lista.