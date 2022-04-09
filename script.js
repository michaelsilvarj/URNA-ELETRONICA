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
let votos = [];
let gravar = votos;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
         //compara se o numero digitado é igual ao do canditado
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
     //Verifica a existencia de canditado
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        // Exibição de fotos
        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].src}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="img/${candidato.fotos[i].src}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
        //Exibe voto nulo
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
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
    }
    bipTeclas(); 
}

function branco(){
    
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block'; 
        numeros.innerHTML = '';
        lateral.innerHTML = '';
        descricao.innerHTML= ' <div class="aviso--grande pisca">VOTO EM BRANCO</div>  ';
        bipTeclas();
}

function corrige(){
    bipTeclas();
    comecarEtapa();    
}

function confirma(){
    
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero,
        });
    } else if(votoBranco === true){
        votoConfirmado = true;
       votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        });
    }
    
    if (votoConfirmado){
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML= '<div class="aviso--gigante pisca">FIM !</div>';
            //console.log(votos);
            armazena();
        }

    }
    bipConfirmar();
    
}

comecarEtapa();

// Funções para ativação do audio para confirmar voto e para o clique na digitação das teclas
function bipTeclas(){
    const soundBip = new Audio();
    soundBip.src="./sound/click.mp3";
    soundBip.play();    
}
function bipConfirmar(){
    const soundConfirma = new Audio();
    soundConfirma.src="./sound/confirma.mp3";
    soundConfirma.play();  
}

// Armazena dados na urna
function armazena(){
   
    console.log(gravar);

    //Armazena no local storage
    localStorage.setItem('votos', JSON.stringify(votos));

   // let contagem = localStorage.getItem('votos');
}

function santinho (){
    window.open ('santinho.html', '_blank',"width=380,height=400");
}

santinho();