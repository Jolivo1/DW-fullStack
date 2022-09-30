let totalCompra   = document.getElementById("totalCompra");
let detalle       = document.getElementById("detalle");

let carrito = JSON.parse(localStorage.getItem("dato")) || [];

let total = () => {
	let total = document.getElementById("total");
	let sum   = carrito.map((x)=> x.item).reduce((x,y) => x +y , 0);
	total.innerHTML = `[${sum}]`;
}
total();

let generarCarrito = () => {
    if(carrito.length !== 0){
        return (detalle.innerHTML = carrito.map((x) =>{
            let {id, item} = x;
            let buscar = items.find((y) => y.id === id);
            return `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${buscar.imagen}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${buscar.nombre} $ ${buscar.precio}</h5>
                    <p class="card-text">$ ${buscar.precio * item}</p>
                    <p onclick="remover(${id})" style="cursor:pointer"> Eliminar del carrito </p>

                    <i onclick="disminuir(${id})" class="bi bi-dash-lg botones"></i>
				    <div id=${id} class="botones">
				     ${item}
				    </div>
				    <i onclick="aumentar(${id})" class="bi bi-plus-lg botones"></i>

                    </div>
                </div>
                </div>
            </div>
            
            `;
        }).join(""));
    }else{
        totalCompra.innerHTML = "";
        detalle.innerHTML     = `<a href="productos.html" class="btn btn-primary">Volver</a>`;
    }
}
generarCarrito();

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
    generarCarrito();
    TCompra()
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
    generarCarrito();
    TCompra()
	localStorage.setItem("dato", JSON.stringify(carrito));
}

let actualizar = (id) => {
	let buscar = carrito.find((x)=> x.id === id);
	document.getElementById(id).innerHTML = buscar.item;
	total();
}

let remover = (id) => {
    let itemSeleccionado = id;
    console.log(itemSeleccionado);
	carrito = carrito.filter((x) => x.id !== itemSeleccionado.id);
    generarCarrito()
    total();
    localStorage.setItem("dato", JSON.stringify(carrito));
}

let TCompra = () =>{
    if (carrito.legth !== 0) {
        let acumulado = carrito. map((x)=>{
            let buscar = items.find((y) => y.id === x.id)
            return x.item* buscar.precio;
        }).reduce((x,y)=> x+y, 0)
        totalCompra.innerHTML = `Total : ${acumulado}`
        
    }
}
TCompra()