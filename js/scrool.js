/* CAMBIO DE COLOR DEL FOOTER */
$(window).scroll(function () {
    if ($(document).scrollTop() > 950) {
        $('.animation').addClass('animation--active');
        $('.menu__btn').addClass('menu__btn-column')
        console.log("OK");
    } else {
        $('.animation').removeClass('animation--active');
        $('.menu__btn').removeClass('menu__btn-column')
    }
});

/* MODAL FAVORITOS */
let modalFavoritos = document.getElementById('modalFavoritos');
let btnFavoritos = document.getElementById('btnFavoritos');
let btnClose = document.getElementsByClassName('close')[0];

btnFavoritos.onclick = function() {
    modalFavoritos.style.display = "block";
}

btnClose.onclick = function() {
    modalFavoritos.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalFavoritos) {
        modalFavoritos.style.display = "none";
    }
}