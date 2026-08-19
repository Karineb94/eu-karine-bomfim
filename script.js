// ===== Menu mobile (hambúrguer) =====
const btnMenuMobile = document.getElementById('btnMenuMobile');
const navMenu = document.getElementById('navMenu');

function fecharMenuMobile() {
  navMenu.classList.remove('aberto');
  btnMenuMobile.setAttribute('aria-expanded', 'false');
}

function alternarMenuMobile() {
  const abrindo = !navMenu.classList.contains('aberto');
  navMenu.classList.toggle('aberto', abrindo);
  btnMenuMobile.setAttribute('aria-expanded', String(abrindo));
}

if (btnMenuMobile && navMenu) {
  btnMenuMobile.addEventListener('click', alternarMenuMobile);

  // Fecha o menu mobile ao clicar em um link de navegação (Início / Aprendizado)
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', fecharMenuMobile);
  });
}

// ===== Dropdown "Fale Comigo" (funciona em desktop, mobile e teclado) =====
const btnContato = document.getElementById('btnContato');
const dropdownContato = document.getElementById('dropdownContato');

function fecharDropdownContato() {
  dropdownContato.classList.remove('aberto');
  btnContato.setAttribute('aria-expanded', 'false');
}

function alternarDropdownContato(evento) {
  evento.stopPropagation();
  const abrindo = !dropdownContato.classList.contains('aberto');
  dropdownContato.classList.toggle('aberto', abrindo);
  btnContato.setAttribute('aria-expanded', String(abrindo));
}

if (btnContato && dropdownContato) {
  btnContato.addEventListener('click', alternarDropdownContato);

  // Fecha ao clicar fora do dropdown
  document.addEventListener('click', (evento) => {
    if (!dropdownContato.contains(evento.target) && evento.target !== btnContato) {
      fecharDropdownContato();
    }
  });

  // Fecha com a tecla Esc (acessibilidade via teclado)
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
      fecharDropdownContato();
      fecharMenuMobile();
    }
  });
}

// ===== Efeito de Digitação em Loop =====
const elementoTexto = document.querySelector('.texto-digitado');

const frases = [
  "Praticando JavaScript & Lógica de Programação ...",
  "Construindo o futuro no Front-End ...",
  "Transformando teoria em código real ..."
];

const preferemMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let fraseIndex = 0;
let charIndex = 0;
let estaApagando = false;
let velocidadeDigitacao = 100;

function digitar() {
  if (!elementoTexto) return;

  const fraseAtual = frases[fraseIndex];

  if (estaApagando) {
    elementoTexto.textContent = fraseAtual.substring(0, charIndex - 1);
    charIndex--;
    velocidadeDigitacao = 50;
  } else {
    elementoTexto.textContent = fraseAtual.substring(0, charIndex + 1);
    charIndex++;
    velocidadeDigitacao = 100;
  }

  if (!estaApagando && charIndex === fraseAtual.length) {
    estaApagando = true;
    velocidadeDigitacao = 2000; // Pausa antes de apagar
  } else if (estaApagando && charIndex === 0) {
    estaApagando = false;
    fraseIndex = (fraseIndex + 1) % frases.length;
    velocidadeDigitacao = 500; // Pausa antes de digitar a próxima
  }

  setTimeout(digitar, velocidadeDigitacao);
}

document.addEventListener('DOMContentLoaded', () => {
  if (elementoTexto) {
    if (preferemMenosMovimento) {
      // Mostra a primeira frase direto, sem animação, para quem prefere menos movimento
      elementoTexto.textContent = frases[0];
    } else {
      setTimeout(digitar, 500);
    }
  }
});
