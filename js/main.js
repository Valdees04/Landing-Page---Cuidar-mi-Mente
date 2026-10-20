// EFECTO HEADER FIJO
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

//HAMBURGER MENU
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.querySelector('.btn-action').classList.toggle('active');
    });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();

          // Activar visualmente de inmediato el enlace pulsado
          navLinksItems.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");

          const header = document.querySelector("header");
          const headerHeight = header ? header.offsetHeight : 100;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          let startTime = null;
          const duration = 800; // Duración en milisegundos (0.8 segundos)

          function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          }

          // Función de aceleración suave (easeInOutQuad)
          function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
          }

          requestAnimationFrame(animation);

          // Cerrar menú móvil si está abierto
          const menuToggle = document.getElementById("menuToggle");
          const navLinks = document.getElementById("navLinks");
          if (menuToggle) menuToggle.classList.remove("active");
          if (navLinks) navLinks.classList.remove("active");
        }
      }
    });
  });
}

// LOGICA POPUP SERVICIOS
document.addEventListener("DOMContentLoaded", () => {
  const popupServicios = document.getElementById("popupServicios");
  const cerrarServicios = document.getElementById("cerrarPopupServicios");
  const botonesServicios = document.querySelectorAll(".btn-servicio");

  const iconos = {
    persona:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />',
    pareja:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />',
    infantil:
      '<path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3.5 17.5c5.667 4.667 11.333 4.667 17 0" /><path d="M19 18.5l-2 -8.5l1 -2l2 1l1.5 -1.5l-2.5 -4.5c-5.052 .218 -5.99 3.133 -7 6h-6a3 3 0 0 0 -3 3" /><path d="M5 18.5l2 -9.5" /><path d="M8 20l2 -5h4l2 5" />',
  };

  botonesServicios.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const titulo = btn.dataset.titulo;
      const descripcion = btn.dataset.descripcion;
      const infosesiones = btn.dataset.infosesiones;
      const icono = btn.dataset.icono;
      const beneficios = btn.dataset.beneficios.split(",");
      const btnAgendarCita = btn.dataset.btncita;

      document.getElementById("popupServiciosTitulo").textContent = titulo;
      document.getElementById("popupServiciosDescripcion").innerHTML = descripcion;
      document.getElementById("popupServiciosinfosesiones").innerHTML = infosesiones;
      document.getElementById("popupServiciosBoton").onclick = () => {
        window.open(btnAgendarCita, "_blank");
      };

      const iconoContainer = document.getElementById("popupServiciosIcono");
      iconoContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">${iconos[icono]}</svg>`;

      const lista = document.getElementById("popupServiciosBeneficios");
      lista.innerHTML = "";
      beneficios.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
      });

      popupServicios.classList.add("active");
      document.body.classList.add("no-scroll");
    });
  });

  cerrarServicios.addEventListener("click", () => {
    popupServicios.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  popupServicios.addEventListener("click", (e) => {
    if (e.target === popupServicios) {
      popupServicios.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

  // LOGICA POPUP TALLERES
  const popupTaller = document.getElementById("popup");
  const cerrarTaller = document.getElementById("cerrarPopup");

  if (popupTaller && cerrarTaller) {
    const botonesTaller = document.querySelectorAll(".btn-ver-mas");

    botonesTaller.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const tallerId = parseInt(btn.dataset.id);
        const taller = talleresData.find((t) => t.id === tallerId);

        if (taller) {
          document.getElementById("popupTitulo").textContent = taller.titulo;
          document.getElementById("popupDescripcion").textContent = taller.descripcion;
          document.getElementById("popupLugar").textContent = taller.lugar;
          document.getElementById("popupFecha").textContent = taller.fecha;
          document.getElementById("popupHora").textContent = taller.hora;
          document.getElementById("popupAforo").textContent = taller.aforo;
          document.getElementById("popupPrecio").textContent = taller.precio;
          document.getElementById("popupImagen").src = taller.imagen;

          const lista = document.getElementById("popupIncluye");
          lista.innerHTML = "";

          taller.incluye.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            lista.appendChild(li);
          });

          popupTaller.classList.add("active");
          document.body.classList.add("no-scroll");
        }
      });
    });

    cerrarTaller.addEventListener("click", () => {
      popupTaller.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });

    popupTaller.addEventListener("click", (e) => {
      if (e.target === popupTaller) {
        popupTaller.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  }
});

// ==========================================
// SECCIÓN PROFESIONALES - CARRUSEL
// ==========================================

// Carrusel de profesionales
const track = document.querySelector(".carrusel-track");
const cards = document.querySelectorAll(".card-profesional");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const indicadores = document.querySelectorAll(".indicador");
const popupProfesional = document.getElementById("popupProfesional");
const cerrarPopupProfesional = document.getElementById("cerrarPopupProfesional");

let tarjetaIndex = 0;
const cardsVisible = 3;
const totalCards = cards.length;

function updateCarrusel() {
  if (!track) return;
  const cardWidth = 280;
  const gap = 30;
  const offset = -(tarjetaIndex * (cardWidth + gap));

  track.style.transform = `translateX(${offset}px)`;

  indicadores.forEach((ind, i) => {
    ind.classList.toggle("active", i === Math.floor(tarjetaIndex / cardsVisible));
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    if (tarjetaIndex > 0) {
      tarjetaIndex--;
      updateCarrusel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (tarjetaIndex < totalCards - cardsVisible) {
      tarjetaIndex++;
      updateCarrusel();
    }
  });
}

// Abrir popup de profesional
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const profesionalId = parseInt(card.dataset.profesional);
    const profesional = profesionalesData.find((p) => p.id === profesionalId);

    if (profesional) {
      document.getElementById("popupProfesionalImg").src = profesional.foto;
      document.getElementById("popupProfesionalNombre").textContent = profesional.nombre;
      document.getElementById("popupProfesionalCargo").textContent = profesional.cargo;
      document.getElementById("popupProfesionalExperiencia").textContent = profesional.experiencia;
      document.getElementById("popupProfesionalPublico").textContent = profesional.publico;
      document.getElementById("popupProfesionalEspecialidades").textContent = profesional.especialidades;
      document.getElementById("popupProfesionalEnfoque").textContent = profesional.enfoque;
      document.getElementById("popupProfesionalPrioridad").textContent = profesional.prioridad;
      document.getElementById("popupProfesionalBoton").onclick = () => {
        window.open(profesional.agendarCita, "_blank");
      };

      popupProfesional.classList.add("active");
      document.body.classList.add("no-scroll");
    }
  });
});

cerrarPopupProfesional.addEventListener("click", () => {
  popupProfesional.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

popupProfesional.addEventListener("click", (e) => {
  if (e.target === popupProfesional) {
    popupProfesional.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});

// Scrollspy - detectar sección activa
const sections = document.querySelectorAll("section[id]");
const navLinksItems = navLinks ? navLinks.querySelectorAll("a") : [];

function highlightNav() {
  const scrollY = window.pageYOffset;
  const headerHeight = header ? header.offsetHeight : 100;
  let currentSectionId = "";

  // recorrer las secciones para detectamos en cuál se encuentra el scroll
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 20;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  // cuando el usuario llegue al final de la página, activar la última sección
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    const lastSection = sections[sections.length - 1];
    if (lastSection) currentSectionId = lastSection.getAttribute("id");
  }

  // 3. Si está arriba del todo, activar la primera sección por defecto (#inicio)
  if (!currentSectionId && sections.length > 0) {
    currentSectionId = sections[0].getAttribute("id");
  }

  // 4. Actualizamos la clase 'active' en los enlaces correspondientes
  navLinksItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentSectionId);
  });
}

// Ejecutar al cargar la página para activar 'Inicio' de inmediato
highlightNav();

// Ejecutar en cada movimiento del scroll
window.addEventListener("scroll", highlightNav);