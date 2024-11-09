let musicas = [
    {titulo:'Money', artista:'Lisa', src:'MONEY.mp3', img:'lisa.jpg'},
    {titulo:'Bring Me To Life', artista:'Evanescence', src:'Evanescence.mp3', img:'Evanescence.jpg'},
    {titulo:'My Universe', artista:'Coldplay X BTS', src:'BTS.mp3', img:'bts.jpg'}
];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = musicas.length - 1;
    }
    renderizarMusica(indexMusica);
    tocarMusica();  // Garantir que toque ao mudar de música
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica >= musicas.length){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    tocarMusica();  // Garantir que toque ao mudar de música
});

// Funções
function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
        console.log('Música carregada:', musicas[index].titulo);
    });
}

function tocarMusica(){
    musica.play()
        .then(() => console.log("Música tocando"))
        .catch((error) => console.log("Erro ao tocar música:", error));
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinutos + ':' + campoSegundos;
}
