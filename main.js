const numeroTexto = document.querySelector('.parametro-senha__texto');
const campoResultado = document.querySelector('#campo-senha');
const botoesControle = document.querySelectorAll('.parametro-senha__botao');
const checkboxes = document.querySelectorAll('.checkbox');
const barraIndicadora = document.querySelector('.forca');
const btnGerar = document.querySelector('#btn-gerar');

let tamanhoNomeAlvo = 6;
if (numeroTexto) numeroTexto.textContent = tamanhoNomeAlvo;


const nomesMachos = ["Bob", "Max", "Thor", "Luke", "Chico", "Fred", "Pudim", "Amendoim", "Biscoito", "Zeus", "Odin", "Hulk", "Simba", "Apolo"];
const nomesFemeas = ["Luna", "Mel", "Nina", "Mia", "Pipoca", "Cacau", "Paçoca", "Nutella", "Athena", "Preta", "Amora", "Frida"];
const silabasProcedurais = ["ba", "be", "bi", "bo", "bu", "pa", "pe", "pi", "po", "pu", "ma", "me", "mi", "mo", "mu", "la", "le", "li", "lo", "lu"];


if (botoesControle.length >= 2) {
    botoesControle[0].onclick = diminuirTamanho;
    botoesControle[1].onclick = aumentarTamanho;
}

if (btnGerar) {
    btnGerar.onclick = gerarFichaPet;
}


function diminuirTamanho() {
    if (tamanhoNomeAlvo > 3) {
        tamanhoNomeAlvo--;
    }
    if (numeroTexto) numeroTexto.textContent = tamanhoNomeAlvo;
    gerarFichaPet();
}

function aumentarTamanho() {
    if (tamanhoNomeAlvo < 12) {
        tamanhoNomeAlvo++;
    }
    if (numeroTexto) numeroTexto.textContent = tamanhoNomeAlvo;
    gerarFichaPet();
}


for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onclick = gerarFichaPet;
}


function obterOpcaoSelecionada(indices, padrao) {
    for (let i = 0; i < indices.length; i++) {
        let idx = indices[i];
        if (checkboxes[idx] && checkboxes[idx].checked) {
            return checkboxes[idx].nextElementSibling.textContent;
        }
    }
    return padrao;
}


function gerarFichaPet() {
    if (!campoResultado || checkboxes.length === 0) return;
    
    
    const tipoAnimal = obterOpcaoSelecionada([0, 1], "Cachorro");
    const porteAnimal = obterOpcaoSelecionada([2, 3, 4], "Pequeno (P)");
    const corPelagem = obterOpcaoSelecionada([5, 6, 7], "Caramelo");
    const generoAnimal = obterOpcaoSelecionada([8, 9], "Macho");


    let letraPorte = "P";
    if (porteAnimal.includes('(')) {
        letraPorte = porteAnimal.split('(')[1].replace(')', '');
    }

   
    let listaNomesParaSortear = generoAnimal === "Macho" ? nomesMachos : nomesFemeas;
    let nomeSorteado = listaNomesParaSortear[Math.floor(Math.random() * listaNomesParaSortear.length)];

    let nomeFinal = nomeSorteado;
    if (nomeFinal.length > tamanhoNomeAlvo) {
        nomeFinal = nomeFinal.substring(0, tamanhoNomeAlvo);
    } else {
        while (nomeFinal.length < tamanhoNomeAlvo) {
            const silabaExtra = silabasProcedurais[Math.floor(Math.random() * silabasProcedurais.length)];
            nomeFinal += silabaExtra;
        }
        nomeFinal = nomeFinal.substring(0, tamanhoNomeAlvo);
    }

   
    nomeFinal = nomeFinal.charAt(0).toUpperCase() + nomeFinal.slice(1).toLowerCase();

    const fichaCompleta = `${nomeFinal} (${tipoAnimal}, ${letraPorte}, ${corPelagem}, ${generoAnimal})`;

    campoResultado.value = fichaCompleta;

    classificarFicha();
}


function classificarFicha() {
    if (!barraIndicadora) return;
    
    let totalMarcados = 0;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) totalMarcados++;
    }

    barraIndicadora.className = "forca";

    if (totalMarcados <= 2) {
        barraIndicadora.classList.add('fraca');
    } else if (totalMarcados <= 4) {
        barraIndicadora.classList.add('media');
    } else {
        barraIndicadora.classList.add('forte');
    }
}

window.onload = gerarFichaPet;
