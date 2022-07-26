// Adiciona e apaga Playlist
// Para cada uma, vê musicas que tem e pode adicionar musicas
// Ficam no LS

const listaPlaylists = document.querySelector('.playlistList');
const listaMusicas = document.querySelector('.musicList');
const formPlaylist = document.querySelector('.playlistForm');
const formMusic = document.querySelector('.musicForm');
var plAtiva = document.querySelector('.ativo');

// adicionar pl
formPlaylist.addEventListener('submit', e => {
    e.preventDefault()
    var playlist = formPlaylist.playlist.value.trim()
    if (playlist.length > 0) {
        listaPlaylists.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="plElement">${playlist}</span>
        <i class="fas fa-trash delete"></i>
        </li>
        `;
        plAtiva = document.querySelector('.ativo');
        localStorage.setItem('playlist',JSON.stringify(listaPlaylists.innerHTML))
    }
    formPlaylist.reset();
})


// adicionar musicas
formMusic.addEventListener('submit', e => {
    e.preventDefault()
    var music = formMusic.music.value.trim();
    var link = formMusic.youtubeLink.value.trim();
    if (music.length > 0) {
        listaMusicas.innerHTML+=`
        <li class="list-group-item d-flex justify-content-between align-items-center" playlist="${plAtiva.firstElementChild.innerText}">
        ${music}
        <a href="${link}" target="_blank"><i class="fas fa-play play"></i></a>
        </li>
        `;
        localStorage.setItem('musicas',JSON.stringify(listaMusicas.innerHTML))
    }
    formMusic.reset();
})


// clica pl 
    // remove - FALTA REMOVER MUSICAS ASSOCIADAS; Se Apagar 1a e for ativa, qual é ativa?
    // ativa e filtra musicas
listaPlaylists.addEventListener('click', e => {
    if (e.target.tagName == 'I') {
        if (e.target.parentElement.classList.contains('ativo')) {
            e.currentTarget.firstElementChild.classList.add('ativo');
            plAtiva = e.currentTarget.firstElementChild;
            filtrarMusicas(plAtiva.firstElementChild.innerText);
        }
        e.target.parentElement.remove();
        localStorage.setItem('playlist', JSON.stringify(listaPlaylists.innerHTML));
    } else {
        if (e.target.tagName == 'SPAN' && !e.target.parentElement.classList.contains('ativo')) {
            plAtiva.classList.remove('ativo');
            e.target.parentElement.classList.add('ativo');
            plAtiva = e.target.parentElement;
            filtrarMusicas(plAtiva.firstElementChild.innerText);
            localStorage.setItem('playlist', JSON.stringify(listaPlaylists.innerHTML));
        }
    }
})

// filtrar musicas
const filtrarMusicas = playlist => {
    var musicas = document.querySelectorAll('[playlist]')
    musicas.forEach(musica => {
        if (musica.getAttribute('playlist') != playlist) {
            musica.classList.add('filtered');
        } else {
            musica.classList.remove('filtered');
        }
    })
}

// load
    // converte pl e mus
    // define ativa e filtra musicas
window.addEventListener('load', e => {
    listaPlaylists.innerHTML = JSON.parse(localStorage.getItem('playlist'));
    listaMusicas.innerHTML = JSON.parse(localStorage.getItem('musicas'));
    plAtiva = document.querySelector('.ativo');
    filtrarMusicas(plAtiva.firstElementChild.innerText);
})

