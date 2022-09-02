function persona(nombre,apellido,direccion) {
    this.nombre = nombre,
    this.apellido = apellido,
    this.direccion = direccion
}

document.getElementById("agregar").addEventListener("click",()=>{
    let Nombre = document.getElementById("nombre").value
    let Apellido = document.getElementById("apellido").value
    let direccion = document.getElementById("direccion").value

    let array = []
    person = new persona(Nombre,Apellido,direccion)
    document.getElementById("texto").innerHTML = `Nombre:${person.nombre} Edad: ${person.apellido} Direccion: ${person.direccion}`
    array.push(person)
    console.log(array);
})