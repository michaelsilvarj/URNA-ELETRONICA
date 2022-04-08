//Encurtador de comandos
let qs = (el) => document.querySelector;



let seuVotoPara =  document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso =  document.querySelector('.d-2');
let lateral =  document.querySelector('.d-1-right');
let numeros =  document.querySelector('.d-1-3');


//Variaveis de controle de ambiente
let etapaAtual = 0;


function comecarEtapa(){

    let etapa = etapas[etapaAtual];

    let numeroHTML = '';

    for(let i=0; i<etapas.numeros; i++){}

    seuVotoPara.style.display = 'none';
    cargo.innerHtml = etapa.titulo;
    descricao.innerHTML=  '';
    aviso.innerHTML.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;

}

function clicou (n){
    alert(`Clicou em ${n}`);
}
function branco(){
    alert('Clicou em BRANCO !');
}
function corrige(){
   // bipTeclas();
    alert('Clicou em CORRIGE !');
    
}

function confirma(){
    
    
    //alert('Clicou em CONFIRMA !');
    bipConfirmar();
}

comecarEtapa();


// Funções para ativação do audio para confirmar voto e para o clique na digitação das teclas
function bipTeclas(){
    const soundBip = new Audio();
    soundBip.src="./sound/click.mp3";
    soundBip.play();
    console.log('Bipou');
}
function bipConfirmar(){
    const soundConfirma = new Audio();
    soundConfirma.src="./sound/confirma.mp3";
    soundConfirma.play();
    console.log('confirmou');
}
