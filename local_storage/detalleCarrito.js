let totalCompra = document.getElementById("totalCompra")
let detalle = document.getElementById("detalle")

let carrito = JSON.parse(localStorage.getItem("dato")) || [];


let total =()=>{
    let total= document.getElementById("total")
    let sum = carrito.map(x => x.item).reduce((x,y)=> x + y,0);
    total.innerHTML = `items[${sum}]`
} 

total()

let generarCarrito = () =>{
    if (carrito.length !== 0) {
       
    }else{
        totalCompra.innerHTML = "";
        detalle.innerHTML = `<a class="nav-link" href="index.html">Volver</a>`;
    }
}

generarCarrito()