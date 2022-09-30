let productos = document.getElementById("productos")


let carrito = JSON.parse(localStorage.getItem("dato")) || [];

let listarProductos = () =>{

    return productos.innerHTML = items.map(x => {
        let {id, name, precio, descripcion, imgage} = x
        let buscar = carrito.find((x)=> x.id === id) || []
        return `
        <div class="col-4" id="producto-${id}">
        <div class="card" style="width: 18rem;">
            <img src="${imgage}">
            <div class="card-body">
              <h5 class="card-title text-center">${name}</h5>
              <p class="card-text">${descripcion}</p>
              <a href="#" class="btn btn-primary">$ ${precio}</a>
              <div class="mt-3">
              <i onclick="disminuir(${id})" class="bi bi-dash-lg"></i>
              <span id="${id}">${buscar.item == undefined ? 0: buscar.item}</span>
              <i onclick="aumentar(${id})" class="bi bi-plus-lg"></i>
          </div>
            </div>
          </div>
        </div>
        `
    }).join("");
   
}
listarProductos()

let actualizar = (id) =>{
    let buscar = carrito.find((x)=> x.id ===id)
    document.getElementById(id).innerHTML = buscar.item
    total()
}

let aumentar = (id) =>{
    let itemSeleccionado = id
    let buscar = carrito.find((x)=> x.id === itemSeleccionado.id)
    if (buscar === undefined) {
        carrito.push({id: itemSeleccionado.id, item: 1})
        
    }else{
        buscar.item += 1;
    }
    console.log(carrito);
    actualizar(itemSeleccionado.id)

    localStorage.setItem("dato", JSON.stringify(carrito))
   
}

let disminuir = (id) =>{
    let itemSeleccionado = id
    let buscar = carrito.find((x)=> x.id === itemSeleccionado.id)
    if (buscar === undefined) {
      return
        

    }else if (buscar.item === 0) {
        return
    }else{
        buscar.item -= 1;
    }
   
    actualizar(itemSeleccionado.id)
    carrito = carrito.filter((x) => x.item !== 0)
    console.log(carrito);
 
    localStorage.setItem("dato", JSON.stringify(carrito))
}

let total =()=>{
    let total= document.getElementById("total")
    let sum = carrito.map(x => x.item).reduce((x,y)=> x + y,0);
    total.innerHTML = `items[${sum}]`
} 

total()