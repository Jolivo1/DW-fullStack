document.getElementById("aceptar").addEventListener("click", ()=>{
    const array = []
    array.push("Loro")
    array.push("Perro")
    array.push("Gato")
    console.log(array);
})
 
document.getElementById("Concatenar").addEventListener("click", ()=>{

    let arra1 = ["Maria","Jose"]
    let arra2 = ["Juan","Miguel"]
    let arra3 = arra1.concat(arra2)
    console.log(arra3);
})

document.getElementById("objeto").addEventListener("click", objeto) 
function objeto(){
    let persona = {
        nombre : "juan",
        apellido : "Pedro",
        edad : 15,
    }
    clave = Object.keys(persona)

    for (let i = 0; i < clave.length; i++) {
        const element = clave[i];
        console.log(persona[element]);
        
    }

    let perro = {
        nombre: "scott",
        color : "negro",
        macho: true,
        edad:5
    }

    Object.entries(perro).forEach((x,y) => {
        console.log(x);
    });
}

function persona(nombre, apellido,edad)
this.nombre = nombre
this.apellido = apellido
this.edad = edad


document.getElementById("agregar").addEventListener("click", ()=>{
 
    p1 = new persona("juan","perez",25)
    p1 = new persona("Jose","Gomez",38)
}) 

