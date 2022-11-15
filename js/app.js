// Variables
const carrito = document.querySelector("#carrito");

const contenedorCarrito = document.querySelector("#lista-carrito tbody");

const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

const listaCursos = document.querySelector("#lista-cursos");

let articulosCarritos = [];


function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener("click", agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);
}

cargarEventListeners();

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        // Elimina del arreglo articulosCarritos por el data-id
        articulosCarritos = articulosCarritos.filter(curso => curso.id !== cursoId);
        
        carritoHTML();  // iterar sobr eel carrito y mostrar su HTML
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la info del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    // Crea un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarritos.some(curso => curso.id === infoCurso.id);
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarritos.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;  // retorna el objeto actualizado
            } else {
                return curso;  // retorna los objetos que no son los duplicados
            }
        });
        articulosCarritos = [...cursos];
    } else {
        // Agrega elementos al arreglo de carrito
        articulosCarritos = [...articulosCarritos, infoCurso];
    }

    

    console.log(articulosCarritos);
    carritoHTML();
}

// Muestra eñ carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarritos.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${imagen}" width="110"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}" > X </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML= "";

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}



