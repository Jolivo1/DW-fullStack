
function inventario(id,nombre,descripcion,precio,foto) {
    this.id = id,
    this.nombre = nombre,
    this.descripcion = descripcion,
    this.precio = precio
    this.foto = foto
}
	let items = [];
	let inventarioLocalStorage = JSON.parse(localStorage.getItem("inventario")) || [];
 	let productos = document.getElementById("productos")

document.getElementById("agregarInventario").addEventListener("click",()=>{
	let id = document.getElementById("id").value
	let nombre = document.getElementById("nombre").value
	let descripcion = document.getElementById("descripcion").value
	let precio = document.getElementById("precio").value
	let foto = document.getElementById("foto").value

   
    producto = new inventario(id ,nombre, descripcion, precio, foto)
    items.push(producto)

	inventarioLocalStorage.push(producto)
	localStorage.setItem("inventario", JSON.stringify(inventarioLocalStorage));
	listarProductos()
	
})

let listarProductos = () => {
	return (productos.innerHTML = inventarioLocalStorage.map((x)=> {
	    let {id, nombre, descripcion, precio, foto} = x;
	    return `
	      	<div class="col-6" id="producto-id-${id}">
				
				<div class="card" style="width: 18rem;">
				  <img src="${foto}" class="card-img-top" alt="..." >
				  <div class="card-body">
				    <h5 class="card-title">${nombre}</h5>
				    <p class="card-text">${descripcion}</p>
				    <p> $ ${precio}</p>
					<p onclick="remover(${id})" style="cursor:pointer"> Eliminar del carrito </p>

				  </div>
				</div>	
			</div>

	    `;
	}).join(""));
}
let remover = (asd) => {
    let itemSeleccionado = asd;
	console.log(itemSeleccionado);
	// inventarioLocalStorage = inventarioLocalStorage.filter((x) => x.id !== itemSeleccionado.id);
	// listarProductos()
    // localStorage.setItem("inventario", JSON.stringify(inventarioLocalStorage));
}


listarProductos()

