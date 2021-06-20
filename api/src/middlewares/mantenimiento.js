const path = require('path');
module.exports= (req,res,next) => {
  //Aca le vamos a devolver al usuario la vista que indica que el sitio esta en mantenimiento. Usamos ademas el metodo path, para indicar la ruta correspondiente a la vista.
  return res.render(path.resolve(__dirname, "..", "views", "web", "mantenimiento.ejs"));

}