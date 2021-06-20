const path = require("path");
const fs = require("fs");

// ACA PREPARAMOS EL ENTORNO DE TRABAJO PARA UTILIZAR SEQUELIZE PARA TRAER LOS DATOS DE LA BD
const db = require("../database/models");
// const { rols, user } =
const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;
const brandCategory = db.BrandCategory;
module.exports = {
    index: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        //res.render(path.resolve(__dirname, "..", "views", "web", "index.ejs"));
        products
          .findAll({
         
            // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
            // la key include tiene como value un array (en este caso de objetos)
            include: [
              {
                model: atributes,
                through: {
                    model: atributeProduct,
                    
                },
                },
                {
                    model: brands,
                },
                {
                    model: categories
                }
            ],
          })
          // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
          .then((productEncontradosConDescuento) => {
             const nameAttribute = ["VitolaDeGalera", "Vitola", "Taste"];
             const priceAttribute = ["UnitPrice", "PricePerBox"];// //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
              //console.log(
                //"producto encontrados",
                //JSON.stringify(productEncontradosConDescuento, null, 2)
             // );
             //Definimos en variables
            const productoConDescuento = [];
            // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
            productEncontradosConDescuento.forEach((productoEncontradoConDescuento) => {
                
                
                const discount = productoEncontradoConDescuento.Atributes.find(
                  (atribute) => atribute.name === "Discount"
                )
                if (discount) {
                  const name = productoEncontradoConDescuento.Atributes.find(
                    (atribute) => nameAttribute.includes(atribute.name)
                  ).atributeProduct.value;

                  const price = productoEncontradoConDescuento.Atributes.find(
                    (atribute) => priceAttribute.includes(atribute.name)
                  ).atributeProduct.value;

                  const imagen = productoEncontradoConDescuento.image;
                  const productId2 = productoEncontradoConDescuento.id;
                  productoConDescuento.push(
                    // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                    {
                      // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                      nombre: {
                        value: name,
                      },
                      precio: {
                        value: price,
                      },
                      descuento: {
                        value: discount.atributeProduct.value,
                      },
                      imagen: imagen,
                      id: productId2,
                      categoria: productoEncontradoConDescuento.Category.name,
                      marca: productoEncontradoConDescuento.Brand.name,
                    }
                  );
                }
            });
              


              
            // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
            // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
            res.send(
               { productoConDescuento }
            );
          })
          .catch((error) => console.log(error));


    },
    mantenimiento: (req, res) => {
      return res.send(
       "sorry site under revision")
    }
}