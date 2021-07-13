/** DARK MODE OU LIGHT MODE */

const html = document.querySelector('html')
const checkbox = document.querySelector('input[name=theme]')

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style)

const initialColors = {
  bg: getStyle(html, '--bg'),
  bgPanel: getStyle(html, '--bg-panel'),
  colorHeadings: getStyle(html, '--color-headings'),
  colorText: getStyle(html, '--color-text')
}

const darkMode = {
  bg: '#333333',
  bgPanel: '#434343',
  colorHeadings: '#3664FF',
  colorText: '#B5B5B5'
}

const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase()

const changeColors = colors => {
  Object.keys(colors).map(key =>
    html.style.setProperty(transformKey(key), colors[key])
  )
}

checkbox.addEventListener('change', ({ target }) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

/** abre e fecha o menu ao clicar */
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', () => {
    nav.classList.toggle('show')
  })
}

/** quando clicar em um item do menu esconder menu */

const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', () => {
    nav.classList.remove('show')
  })
}

/** menu ativo conforme a section da pagina */
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const limitPoint = window.pageYOffset + window.innerHeight / 2

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const limitStart = limitPoint >= sectionTop
    const limitEnd = limitPoint <= sectionTop + sectionHeight

    if (limitStart && limitEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/** sobra no header da pagina quando der scrll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight
function boxShadowHeader() {
  if (window.scrollY >= navHeight) {
    header.classList.add('scroll')
  } else {
    header.classList.remove('scroll')
  }
}

/** TESTOMONIALS CARROSSEL / SHIPER  **/
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

/** ScrollReveal.JS - Animação ao rolar a pagina! */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 1200,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials,
  #contact .text, #contact .links,
  footer .brand, footer .social
`,
  { interval: 100 }
)
/** button to back top */
const buttonToTop = document.querySelector('#arrowUp')
function backToTop() {
  if (window.scrollY > 600) {
    buttonToTop.classList.add('show')
  } else {
    buttonToTop.classList.remove('show')
  }
}
/** whem scroll */
window.addEventListener('scroll', () => {
  boxShadowHeader()
  backToTop()
  activateMenuAtCurrentSection()
})
