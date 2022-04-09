let seuVotoPara =  document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso =  document.querySelector('.d-2');
let lateral =  document.querySelector('.d-1-right');
let numeros =  document.querySelector('.d-1-3');

//Variaveis de controle de ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = false;

function comecarEtapa(){

    let etapa = etapas[etapaAtual];

    let numeroHTML = '';

    numero = '';
    votoBranco = false;

    for(let i=0; i<etapa.numeros; i++){

        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }       
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHtml = etapa.titulo;
    descricao.innerHTML=  '';
    aviso.innerHTML.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface(){

    let etapa = etapas[etapaAtual];
    let canditado = etapa.candidatos.filter((item)=>{
        //compara se o numero digitado é igual ao do canditado
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    //Verifica a existencia de canditado
    if(canditado.length > 0){
        canditado = canditado[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML=  `Nome: ${canditado.nome} <br> Partido: ${canditado.partido}`;
        aviso.innerHTML.display = 'block';
        
        // Exibição de fotos
        let fotosHTML= '';
        
        fotosHTML= '';
        for(let i in canditado.fotos){

            if(canditado.fotos[i].small){
                fotosHTML+= `<div class="d-1-image small"> <img src="img/${canditado.fotos[i].src}" alt=""> ${canditado.fotos[i].legenda} </div> `;
            } else{
                fotosHTML+= `<div class="d-1-image"> <img src="img/${canditado.fotos[i].src}" alt=""> ${canditado.fotos[i].legenda} </div> `;
            }

            
        }
        lateral.innerHTML = fotosHTML;

        //Exibe voto nulo
    } else {
        seuVotoPara.style.display = 'block';
        aviso.innerHTML.display = 'block';
        descricao.innerHTML= ' <div class="aviso--grande pisca">VOTO NULO</div>  ';
    }
    //console.log("canditado",canditado);
}

function clicou (n){

    let elnumero = document.querySelector('.numero.pisca');

    // verificando se a div está vazia para preenchela
    if (elnumero != null) {
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;
        elnumero.classList.remove('pisca');

        if ( elnumero.nextElementSibling != null) {
            elnumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
      //  bipTeclas();    
    }
}

function branco(){
    
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.innerHTML.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = '';
        descricao.innerHTML= ' <div class="aviso--grande pisca">VOTO EM BRANCO</div>  ';


}

function corrige(){
   // bipTeclas();
    comecarEtapa();
    
}

function confirma(){
    
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log('Voto  CONFIRMADO');
    } else if(votoBranco === true){
        votoConfirmado = true;
        console.log('Voto BRANCO confirmado');
    }
    
    if (votoConfirmado){
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }else{
            console.log('FIM !');
        }

    }
    
   // bipConfirmar();
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
