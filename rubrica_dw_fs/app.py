from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = "miclave"

app.config["MYSQL_HOST"]      = "localhost"
app.config["MYSQL_USER"]      = "root"
app.config["MYSQL_PASSWORD"]  = ""
app.config["MYSQL_DB"]        = "estudiantes"

mysql = MySQL(app)


@app.route("/")
def listado():
    c = mysql.connection.cursor()
    c.execute('SELECT * FROM estudiantes')
    datos = c.fetchall()
    return render_template("listado.html", estudiantes= [datos, len(datos)])


@app.route("/new")
def nuevo():
    return render_template("frmRegistro.html")

@app.route("/crear", methods = ["POST"])
def crear(): 
    if request.method== "POST":
        nombre = request.form["nombre"]
        pApellido = request.form["pApellido"]
        sApellido = request.form["sApellido"]
        codigo = request.form["codigo"]
        telefono = request.form["telefono"]
        fechaNac = request.form["fechaNac"]
        c = mysql.connection.cursor()
        c.execute('INSERT estudiantes(EST_NOMBRE, EST_PRIMER_APELLIDO, EST_SEGUNDO_APELLIDO, EST_CODIGO, EST_TELEFONO, EST_FEHCA_NAC) VALUES(%s, %s, %s, %s, %s, %s)',
        (nombre, pApellido, sApellido, codigo, telefono, fechaNac))
        mysql.connection.commit()

        flash("Contacto Registrado")
        return redirect(url_for("listado"))

@app.route("/editar/<id>")
def editar(id):
    c = mysql.connection.cursor()
    c.execute('SELECT * FROM estudiantes WHERE EST_ID = %s ',(id))
    dato = c.fetchall()
    return render_template("frmEditar.html", estudiante = dato[0])
   

@app.route("/editar/<id>", methods = ["POST"])
def actualizar(id):
    if request.method== "POST":
        nombre = request.form["nombre"]
        pApellido = request.form["pApellido"]
        sApellido = request.form["sApellido"]
        codigo = request.form["codigo"]
        telefono = request.form["telefono"]
        fechaNac = request.form["fechaNac"]
        c = mysql.connection.cursor()
        c.execute('UPDATE estudiantes SET EST_NOMBRE = %s, EST_PRIMER_APELLIDO = %s, EST_SEGUNDO_APELLIDO = %s, EST_CODIGO = %s, EST_TELEFONO = %s, EST_FEHCA_NAC = %s WHERE EST_ID = %s',
        (nombre, pApellido, sApellido, codigo, telefono, fechaNac, id))
        mysql.connection.commit()

        flash("Contacto actualizado")
        return redirect(url_for("listado"))

@app.route("/eliminar/<id>")
def eliminar(id):
    c = mysql.connection.cursor()
    c.execute('DELETE FROM estudiantes WHERE EST_ID = %s ',(id))
    mysql.connection.commit()
    flash("Contacto Eliminado")
    return redirect(url_for("listado"))

@app.route("/filtrar", methods = ["POST"])
def filtrar():
    if request.method== "POST":
        nombre = request.form["filtrar"]
        print(nombre)
        c = mysql.connection.cursor()
        c.execute("SELECT * FROM estudiantes WHERE EST_NOMBRE LIKE '"+nombre+"%'")
        mysql.connection.commit()
        datos = c.fetchall()
        return render_template("listado.html", estudiantes= datos)

if __name__ == "__main__":
    app.run(debug=True, port=4000)
