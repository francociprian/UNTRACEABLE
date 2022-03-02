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

/*

let procesoScroll = document.documentElement.scrollTop;
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("scrollPag").style.color = "red";
    console.log(procesoScroll);
  } else {
    document.getElementById("scrollPag").style.top = "blue";
  }
}

*/

/*
//Como anidar el json al proyecto
//--------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

const fetchData = async () => {
  try {
      const res = await fetch('api.json');
      const data = await res.json();
      console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//--------------------------------------------------------
*/