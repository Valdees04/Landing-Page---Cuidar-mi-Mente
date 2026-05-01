// EFECTO HEADER FIJO
const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("scrolled", window.scrollY > 50);
});

// LOGICA POPUP NUESTRO SERVICIOS
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const cerrar = document.getElementById("cerrarPopup");

        // Botones
    const botones = document.querySelectorAll(".btn-ver-mas");

    botones.forEach(btn => {
        btn.addEventListener("click", (e) =>{
            e.preventDefault();
            // Obtener datos
            const titulo = btn.dataset.titulo;
            const descripcion = btn.dataset.descripcion;
            const lugar = btn.dataset.lugar;
            const fecha = btn.dataset.fecha;
            const hora = btn.dataset.hora;
            const aforo = btn.dataset.aforo;
            const precio = btn.dataset.precio;
            const imagen = btn.dataset.img;
            const incluye = btn.dataset.incluye.split(",");
            // Insertar en popup
            document.getElementById("popupTitulo").textContent = titulo;
            document.getElementById("popupDescripcion").textContent = descripcion;
            document.getElementById("popupLugar").textContent = lugar;
            document.getElementById("popupFecha").textContent = fecha;
            document.getElementById("popupHora").textContent = hora;
            document.getElementById("popupAforo").textContent = aforo;
            document.getElementById("popupPrecio").textContent = precio;
            document.getElementById("popupImagen").src =  imagen;
            // Lista dinámica
            const lista = document.getElementById("popupIncluye");
            lista.innerHTML = "";

            incluye.forEach(item =>{
                const li = document.createElement("li");
                li.textContent = item;
                lista.appendChild(li);
            });
            // Mostrar popup
            popup.classList.add("active");
        });
    });

    // Cerrar
    cerrar.addEventListener("click", () =>{
        popup.classList.remove("active");
    });

    //Cerrar al hacer click afuera
    popup.addEventListener("click", (e) =>{
        if(e.target === popup){
            popup.classList.remove("active");
        }
    });
});

