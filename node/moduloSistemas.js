const os = require('os')

console.log("PLATAFORMA",os.platform());
console.log("MEMORIOA LIBRE",os.freemem());
console.log("MEMORIOA TOTAL",os.totalmem());
console.log("ARQUITECTURA",os.arch());
console.log("RELASE",os.release());
console.log("VERSION",os.version());