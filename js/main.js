// Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaProductos = document.querySelector('#buy')

let articulosCarrito = [];

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})

const fetchData = async () => {
    try{
        const res = await fetch('./json/api.json')
        const data = await res.json()
        mostrarArticulos(data)
    } catch (error){
        console.log(error)
    }
}


    function mostrarArticulos(art){
        art.forEach(articulos => {
            const div = document.createElement('div')
            div.classList.add("item")
            div.setAttribute("id", "item")
            div.innerHTML = `
                    <img class="imagenCatalogo" src="${articulos.imagen}" alt="Producto" >
                    <h2 class="Producto dulce">${articulos.nombre}</h2>
                    <p>$ ${articulos.precio}</p>
                    <a href="#" class="boton agregar-carrito" data-id="${articulos.id}">Agregar al Carrito</a>
            `
            listaProductos.appendChild(div)
        });
    

cargarEvent();
function cargarEvent() {

    // Cuando agregamos un curso presionando agregar carrito

    listaProductos.addEventListener('click', agregarProducto)

    // Elimina productos del carro

    carrito.addEventListener('click', eliminarProducto)


    // Muestra los productos en el localstorage


    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        mostrarProducto();
    })


    // Vaciar Carrito

    vaciarCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        articulosCarrito = []
        limpiarHTML();
    })
}


function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        productoSeleccionado = e.target.parentElement

        leerDatosProducto(productoSeleccionado);
    }
}

function eliminarProducto(e){
    e.preventDefault()
    
    if(e.target.classList.contains('borrar-producto')){

        // Acceso al id del producto a eliminar

        const productoId = e.target.getAttribute('data-id');
        
        // Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(Producto => Producto.id !== productoId);
        mostrarProducto()
        }
    }


function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h2').textContent,
        precio: producto.querySelector('p').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);

if(existe){
    const productos = articulosCarrito.map(producto =>{
        if(producto.id === infoProducto.id){
            producto.cantidad++;
            return producto;
        }else{
            return producto;
        }
    })
    articulosCarrito = [...productos]
}else{
    articulosCarrito = [...articulosCarrito,infoProducto]
}
    mostrarProducto();
}


function mostrarProducto() {

    limpiarHTML();

    articulosCarrito.forEach( producto => {
        const{imagen, titulo, precio, cantidad, id} = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                <p id="cantidad">${cantidad}</p>
            </td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `

        contenedorCarrito.appendChild(row);
    })

    // Agrega el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarHTML() {
    // Se ejecuta el while cuando contenedorCarrito tiene algo
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

}