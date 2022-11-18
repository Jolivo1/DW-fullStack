
from flask import Flask, jsonify, request
from productos import productos






app = Flask(__name__)
@app.route("/")
def inico():
    return "Hola Mundo!!!!!!"


@app.route("/productos")
def getProductos():
    return jsonify(productos)

@app.route("/productos", methods=["POST"])
def add():
    nuevoProducto = {"id": request.json["id"], "nombre": request.json["nombre"], "precio": request.json["precio"]}
    productos.append(nuevoProducto)
    print(request.json)
    return "DATOS RECIBIDOS"


@app.route("/consultar/<string:codigo>")
def consultar(codigo):
    for x in productos:
        if x["id"] == codigo:
            return jsonify(x)
    return jsonify({"mensaje": "No encontrado"})




if __name__ == "__main__":
    app.run(debug=True, port= 4000)