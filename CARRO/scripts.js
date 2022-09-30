let productos = document.getElementById("productos");



let carrito = JSON.parse(localStorage.getItem("dato")) || [];

let listarProductos = () => {
	return (productos.innerHTML = items.map((x)=> {
	    let {id, nombre, precio, descripcion, imagen} = x;
	    let buscar = carrito.find((z)=> z.id === id) || [];
	    return `
	      	<div class="col-lg-4" id="producto-id-${id}">
				
				<div class="card" style="width: 18rem;">
				  <img src="${imagen}" class="card-img-top" alt="..." >
				  <div class="card-body">
				    <h5 class="card-title">${nombre}</h5>
				    <p class="card-text">${descripcion}</p>
				    <p> $ ${precio}</p>

				    <i onclick="disminuir(${id})" class="bi bi-dash-lg botones"></i>
				    <div id=${id} class="botones">
				    ${buscar.item == undefined ? 0: buscar.item}
				    </div>
				    <i onclick="aumentar(${id})" class="bi bi-plus-lg botones"></i>

				  </div>
				</div>	
			</div>

	    `;
	}).join(""));
}
listarProductos();

let aumentar = (id) => {
	let itemSeleccionado = id;
	let buscar = carrito.find((x)=> x.id === itemSeleccionado.id);
	if(buscar=== undefined){
		carrito.push({id: itemSeleccionado.id , item: 1})
	}else{
		buscar.item += 1;
	}
	console.log(carrito);
	actualizar(itemSeleccionado.id);
	localStorage.setItem("dato", JSON.stringify(carrito));
}
let disminuir = (id) => {
	let itemSeleccionado = id;
	let buscar = carrito.find((x)=> x.id === itemSeleccionado.id);
	if(buscar=== undefined) return;
	else if(buscar.item === 0) return;
	else{
		buscar.item -= 1;
	}
	
	actualizar(itemSeleccionado.id);
	carrito = carrito.filter((x)=> x.item !== 0);
	console.log(carrito);
	localStorage.setItem("dato", JSON.stringify(carrito));
}

let actualizar = (id) => {
	let buscar = carrito.find((x)=> x.id === id);
	document.getElementById(id).innerHTML = buscar.item;
	total();
}

let total = () => {
	let total = document.getElementById("total");
	let sum   = carrito.map((x)=> x.item).reduce((x,y) => x +y , 0);
	total.innerHTML = `[${sum}]`;
}
total();