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
       return (detalle.innerHTML = carrito.map((x)=>{
        let {id ,item}= x;
        let buscar = items.find((y)=> y.id === id)
        return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${buscar.imgage}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">${buscar.precio * item}</small></p>
                </div>
                </div>
            </div>
        </div>
        `
       }))
    }else{
        totalCompra.innerHTML = "";
        detalle.innerHTML = `<a class="nav-link" href="index.html">Volver</a>`;
    }
}

generarCarrito()