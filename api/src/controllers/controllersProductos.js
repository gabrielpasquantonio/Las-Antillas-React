const path = require("path");
const fs = require("fs");

// ACA PREPARAMOS EL ENTORNO DE TRABAJO PARA UTILIZAR SEQUELIZE PARA TRAER LOS DATOS DE LA BD
const db = require("../database/models");
// const { rols, user } =
const rols = db.Rol;
const users = db.User;
const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;
const brandCategory = db.BrandCategory;

//  Aca pasamos los datos del archivo Json de Habanos a un Array
//const productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
//const productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
//const productoTabacoPipas = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacoPipa.json")));
//const productoTabacoArmar = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacoCigarro.json")));

module.exports = {
  habanos: (req, res) => {
    // PRODUCTS REPRESENTA AL MODELO.
    // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
    // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
    // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
    // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
    // console.log('valor/es que viene del front (nav bar "/habanos/?type=X&brand=X") por query', req.query);

    products
      .findAll({
        where: {
          category_id: 1,
        },
        // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
        // la key include tiene como value un array (en este caso de objetos)
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
      .then((productEncontradosDesdeBD) => {
        // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
        // Definimos en variables
        const productoHabanos = [];
        // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
        productEncontradosDesdeBD.forEach((productoEncontrado) => {
          // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
          const name = productoEncontrado.Atributes.find(
            (atribute) => atribute.id === 1
          ).atributeProduct.value;
          const price = productoEncontrado.Atributes.find(
            (atribute) => atribute.name === "UnitPrice"
          ).atributeProduct.value;
          const imagen = productoEncontrado.image;
          const productId = productoEncontrado.id;
          const category = productoEncontrado.category_id;
          const brand = productoEncontrado.brand_id;

          productoHabanos.push(
            // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
            {
              // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
              name: name,
              price: price,
              image: imagen,
              id: productId,
              brand: brand,
              category: category,
            }
          );
        });
        // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
        // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
        res.send(productoHabanos);
      })
      .catch((error) => res.send(error));
  },

  cigarros: (req, res) => {
    // PRODUCTS REPRESENTA AL MODELO.
    // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
    // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
    // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
    // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
    //console.log('valor/es que viene del front (nav bar "/cigarros/?type=X&brand=X") por query', req.query);
    products
      .findAll({
        where: {
          category_id: 2,
        },
        // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
        // la key include tiene como value un array (en este caso de objetos)
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
      .then((productEncontradosDesdeBD2) => {
        // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
        // console.log(
        //   "producto encontrados",
        //   JSON.stringify(productEncontradosDesdeBD2, null, 2)
        // );
        // Definimos en variables
        const productoCigarros = [];

        // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
        productEncontradosDesdeBD2.forEach((productoEncontrado2) => {
          // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
          const name = productoEncontrado2.Atributes.find(
            (atribute) => atribute.id === 11
          ).atributeProduct.value;
          const price = productoEncontrado2.Atributes.find(
            (atribute) => atribute.name === "UnitPrice"
          ).atributeProduct.value;
          const imagen = productoEncontrado2.image;
          const productId2 = productoEncontrado2.id;
          const category2 = productoEncontrado2.category_id;
          const brand2 = productoEncontrado2.brand_id;

          productoCigarros.push(
            // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
            {
              // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
              name: name,
              price: price,
              image: imagen,
              id: productId2,
              brand: brand2,
              category: category2,
            }
          );
        });

        // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
        // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
        res.send(productoCigarros );
      })
      .catch((error) => res.send(error));
  },
  tabaco_pipas: (req, res) => {
    // PRODUCTS REPRESENTA AL MODELO.
    // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
    // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
    // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
    // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
    // console.log('valor/es que viene del front (nav bar "/tabacoPipa/?type=X&brand=X") por query', req.query);
    products
      .findAll({
        where: {
          category_id: 4,
        },
        // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
        // la key include tiene como value un array (en este caso de objetos)
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
      .then((productEncontradosDesdeBD4) => {
        // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
        // console.log(
        //   "producto encontrados",
        //   JSON.stringify(productEncontradosDesdeBD4, null, 2)
        // );
        // Definimos en variables
        const productoTabacoPipas = [];
        // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
        productEncontradosDesdeBD4.forEach((productoEncontrado4) => {
          // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
          const name = productoEncontrado4.Atributes.find(
            (atribute) => atribute.id === 4
          ).atributeProduct.value;
          const price = productoEncontrado4.Atributes.find(
            (atribute) => atribute.name === "UnitPrice"
          ).atributeProduct.value;
          const imagen = productoEncontrado4.image;
          const productId4 = productoEncontrado4.id;
          const category4 = productoEncontrado4.category_id;
          const brand4 = productoEncontrado4.brand_id;
          productoTabacoPipas.push(
            // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
            {
              // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
              name: name,
              price: price,
              image: imagen,
              id: productId4,
              brand: brand4,
              category: category4,
            }
          );
        });

        // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
        // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
        res.send(productoTabacoPipas);
      })
      .catch((error) => {
        console.log("Error in tabaco_pipas", error);
        res.send(error); // AGREGAR UNA PAGINA PARA ERROR (error.ejs)
      });
  },
  tabaco_armar: (req, res) => {
    // PRODUCTS REPRESENTA AL MODELO.
    // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
    // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
    // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
    // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
    //console.log('valor/es que viene del front (nav bar "/tabacoPipa/?type=X&brand=X") por query', req.query);
    products
      .findAll({
        where: {
          category_id: 5,
        },
        // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
        // la key include tiene como value un array (en este caso de objetos)
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
      .then((productEncontradosDesdeBD5) => {
        // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
        // console.log(
        //   "producto encontrados",
        //   JSON.stringify(productEncontradosDesdeBD5, null, 2)
        // );
        // Definimos en variables
        const productoTabacoArmar = [];
        // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
        productEncontradosDesdeBD5.forEach((productoEncontrado5) => {
          // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
          const name = productoEncontrado5.Atributes.find(
            (atribute) => atribute.id === 4
          ).atributeProduct.value;
          const price = productoEncontrado5.Atributes.find(
            (atribute) => atribute.name === "UnitPrice"
          ).atributeProduct.value;
          const imagen = productoEncontrado5.image;
          const productId5 = productoEncontrado5.id;
          const category5 = productoEncontrado5.category_id;
          const brand5 = productoEncontrado5.brand_id;
          productoTabacoArmar.push(
            // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
            {
              // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
              name: name,
              price: price,
              image: imagen,
              id: productId5,
              brand: brand5,
              category: category5,
            }
          );
        });
        // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
        // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
        res.send(productoTabacoArmar);
      })
      .catch((error) => {
        console.log("Error in tabaco_Armar", error);
        res.send(error); // AGREGAR UNA PAGINA PARA ERROR (error.ejs)
      });
  },
  cigarritos: (req, res) => {
    // PRODUCTS REPRESENTA AL MODELO.
    // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
    // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
    // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
    // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
    // console.log(
    //   'valor/es que viene del front (nav bar "/cigarritos/?type=X&brand=X") por query',
    //   req.query
    // );
    products
      .findAll({
        where: {
          category_id: 3,
        },
        // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
        // la key include tiene como value un array (en este caso de objetos)
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
      .then((productEncontradosDesdeBD3) => {
        // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
        // console.log(
        //   "producto encontrados",
        //   JSON.stringify(productEncontradosDesdeBD3, null, 2)
        // );
        // Definimos en variables
        const productoCigarritos = [];
        // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
        productEncontradosDesdeBD3.forEach((productoEncontrado3) => {
          // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
          const name = productoEncontrado3.Atributes.find(
            (atribute) => atribute.id === 11
          ).atributeProduct.value;
          const price = productoEncontrado3.Atributes.find(
            (atribute) => atribute.name === "PricePerBox"
          ).atributeProduct.value;
          const imagen = productoEncontrado3.image;
          const productId3 = productoEncontrado3.id;
          const category3 = productoEncontrado3.category_id;
          const brand3 = productoEncontrado3.brand_id;
          productoCigarritos.push(
            // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
            {
              // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
              name: name,
              price: price,
              image: imagen,
              id: productId3,
              brand: brand3,
              category: category3,
            }
          );
        });
        // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
        // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
        res.send(productoCigarritos);
      })
      .catch((error) => res.send(error));
  },

  productDetailHabano: (req, res) => {
    //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
   
    products
      .findByPk(req.query.productId, {
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      .then((productoEncontrado) => {
        const name = productoEncontrado.Atributes.find(
          (atribute) => atribute.name === "VitolaDeGalera"
        ).atributeProduct.value;
        const price = productoEncontrado.Atributes.find(
          (atribute) => atribute.name === "UnitPrice" 
        ).atributeProduct.value;
        const ring = productoEncontrado.Atributes.find(
          (atribute) => atribute.name === "Ring"
        ).atributeProduct.value;
        const taste = productoEncontrado.Atributes.find(
          (atribute) => atribute.name === "Taste"
        ).atributeProduct.value;
        const length = productoEncontrado.Atributes.find(
          (atribute) => atribute.name === "Length"
        ).atributeProduct.value;
        const image = productoEncontrado.image;
        const brand = productoEncontrado.brand_id;
        const category=productoEncontrado.category_id
        const productoHabano = {
          id: productoEncontrado.id,
          price:  price,
          cepo: ring,
          name:name,
          taste:taste,
          length:length,
          image: image,
          brand:brand,
          category:category
        };

        res.send(
         
          productoHabano
        );
      });
  },
  productDetailCigarro: (req, res) => {
    //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
    products
      .findByPk(req.query.productId, {
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      .then((productoEncontrado2) => {
        const name = productoEncontrado2.Atributes.find(
          (atribute) => atribute.name === "Vitola"
        ).atributeProduct.value;
        const price = productoEncontrado2.Atributes.find(
          (atribute) => atribute.name === "UnitPrice"
        ).atributeProduct.value;
        const ring = productoEncontrado2.Atributes.find(
          (atribute) => atribute.name === "Ring"
        ).atributeProduct.value;
        const taste = productoEncontrado2.Atributes.find(
          (atribute) => atribute.name === "Taste"
        ).atributeProduct.value;
        const length = productoEncontrado2.Atributes.find(
          (atribute) => atribute.name === "Length"
        ).atributeProduct.value;
        const origin = productoEncontrado2.Atributes.find(
          (atribute) => atribute.name === "Origin"
        ).atributeProduct.value;
        const image = productoEncontrado2.image;
        const brand = productoEncontrado2.brand_id;
        const category=productoEncontrado2.category_id
        const productoCigarros = {
          id: productoEncontrado2.id,
          price: price,
          cepo:ring,
          name: name, 
          taste:taste,
          length:length,
          origen: origin,
          image: image,
          brand:brand,
          category:category
        };

        res.send(
          productoCigarros
        );
      });
  },

  productDetailCigarrito: (req, res) => {
    //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
    products
      .findByPk(req.query.productId, {
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      .then((productoEncontrado3) => {
        const name = productoEncontrado3.Atributes.find(
          (atribute) => atribute.name === "Vitola"
        ).atributeProduct.value;
        const price = productoEncontrado3.Atributes.find(
          (atribute) => atribute.name === "PricePerBox"
        ).atributeProduct.value;
        const ring = productoEncontrado3.Atributes.find(
          (atribute) => atribute.name === "Ring"
        ).atributeProduct.value;
        const taste = productoEncontrado3.Atributes.find(
          (atribute) => atribute.name === "Taste"
        ).atributeProduct.value;
        const length = productoEncontrado3.Atributes.find(
          (atribute) => atribute.name === "Length"
        ).atributeProduct.value;
        const origin = productoEncontrado3.Atributes.find(
          (atribute) => atribute.name === "Origin"
        ).atributeProduct.value;
        const image = productoEncontrado3.image;
        const brand = productoEncontrado3.brand_id;
        const category=productoEncontrado3.category_id
        const productoCigarritos = {
          id: productoEncontrado3.id,
          price: price,
          cepo:ring,
          name: name, 
          taste:taste,
          length:length,
          origen: origin,
          image: image,
          brand:brand,
          category:category
        };

        res.send(
        productoCigarritos 
        );
      });
  },

  productDetailTabacoParaPipa: (req, res) => {
    //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
    products
      .findByPk(req.query.productId, {
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      .then((productoEncontrado4) => {
        const name = productoEncontrado4.Atributes.find(
          (atribute) => atribute.name === "Taste"
        ).atributeProduct.value;
        const price = productoEncontrado4.Atributes.find(
          (atribute) => atribute.name === "UnitPrice"
        ).atributeProduct.value;
        const taste = productoEncontrado4.Atributes.find(
          (atribute) => atribute.name === "Taste"
        ).atributeProduct.value;
        const quantity = productoEncontrado4.Atributes.find(
          (atribute) => atribute.name === "Quantity"
        ).atributeProduct.value;
        const origin = productoEncontrado4.Atributes.find(
          (atribute) => atribute.name === "Origin"
        ).atributeProduct.value;
        const description = productoEncontrado4.Atributes.find(
          (atribute) => atribute.name === "Description"
        ).atributeProduct.value;
        const image = productoEncontrado4.image;
        const brand = productoEncontrado4.brand_id;
        const category=productoEncontrado4.category_id
        const productoTabacoParaPipa = {
          id: productoEncontrado4.id,
          price:price,
          quantity:quantity,
          name:name,
          taste:taste,
          description:description,
          origen:origin,
          image:image,
          brand:brand,
          category:category
        };

        res.send(
          productoTabacoParaPipa
        );
      });
  },

  //tabacos: (req, res) => {
  //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
  // res.render(path.resolve(__dirname, "..", "views", "productos", "tabacos.ejs"));
  productDetailTabacoParaArmar: (req, res) => {
    //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
    products
      .findByPk(req.query.productId, {
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      .then((productoEncontrado5) => {
        const name = productoEncontrado5.Atributes.find(
          (atribute) => atribute.name === "Taste"
        ).atributeProduct.value;
        const price = productoEncontrado5.Atributes.find(
          (atribute) => atribute.name === "UnitPrice"
        ).atributeProduct.value;
        const taste = productoEncontrado5.Atributes.find(
          (atribute) => atribute.name === "Taste"
        ).atributeProduct.value;
        const quantity = productoEncontrado5.Atributes.find(
          (atribute) => atribute.name === "Quantity"
        ).atributeProduct.value;
        const origin = productoEncontrado5.Atributes.find(
          (atribute) => atribute.name === "Origin"
        ).atributeProduct.value;
        const description = productoEncontrado5.Atributes.find(
          (atribute) => atribute.name === "Quantity"
        ).atributeProduct.value;
        const image = productoEncontrado5.image;
        const brand = productoEncontrado5.brand_id;
        const category=productoEncontrado5.category_id
        const productoTabacoParaArmar = {
          id: productoEncontrado5.id,
          price:price,
          quantity:quantity,
          name:name,
          taste:taste,
          description:description,
          origen:origin,
          image:image,
          brand:brand,
          category:category
        };

        res.send(
          productoTabacoParaArmar
        );
      });
  },

  //tabacos: (req, res) => {
  //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
  // res.render(path.resolve(__dirname, "..", "views", "productos", "tabacos.ejs"));
  carrito: (req, res) => {
    //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
    res.render(
      path.resolve(__dirname, "..", "views", "productos", "carrito.ejs")
    );
  },

  allProducts: (req, res) => {
    //-------------------------------Aca esta toda la funcion que trae los habanos  ----------------------------

    products
      .findAll({
        where: {
          category_id: 1,
        },
        // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
        // la key include tiene como value un array (en este caso de objetos)
        include: [
          {
            model: atributes,
            through: {
              model: atributeProduct,
            },
          },
        ],
      })
      // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
      .then((productEncontradosDesdeBD) => {
        // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
        console.log(
          "producto encontrados",
          JSON.stringify(productEncontradosDesdeBD, null, 2)
        );
        // Definimos en variables
        var allProducts = [];
        // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
        productEncontradosDesdeBD.forEach((productoEncontrado) => {
          // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
          const name = productoEncontrado.Atributes.find(
            (atribute) => atribute.name === "VitolaDeGalera"
          ).atributeProduct.value;
          const price = productoEncontrado.Atributes.find(
            (atribute) => atribute.name === "UnitPrice"
          ).atributeProduct.value;
          const imagen = productoEncontrado.image;
          const productId = productoEncontrado.id;
          const category = productoEncontrado.category_id;
          const brand = productoEncontrado.brand_id;

          allProducts.push(
            // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
            {
              // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
              name: name,
              price: price,
              image: imagen,
              id: productId,
              brand: brand,
              category: category,
            }
          );
        });
        //-------------------------------Aca esta la funcion que trae los cigarros--------------------------------
        products
          .findAll({
            where: {
              category_id: 2,
            },
            // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
            // la key include tiene como value un array (en este caso de objetos)
            include: [
              {
                model: atributes,
                through: {
                  model: atributeProduct,
                },
              },
            ],
          })
          // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
          .then((productEncontradosDesdeBD2) => {
            // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
            // console.log(
            //   "producto encontrados",
            //   JSON.stringify(productEncontradosDesdeBD2, null, 2)
            // );
            // Definimos en variables

            // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
            productEncontradosDesdeBD2.forEach((productoEncontrado2) => {
              // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
              const name = productoEncontrado2.Atributes.find(
                (atribute) => atribute.name === "Vitola"
              ).atributeProduct.value;
              const price = productoEncontrado2.Atributes.find(
                (atribute) => atribute.name === "UnitPrice"
              ).atributeProduct.value;
              const imagen = productoEncontrado2.image;
              const productId2 = productoEncontrado2.id;
              const category2 = productoEncontrado2.category_id;
              const brand2 = productoEncontrado2.brand_id;
              allProducts.push(
                // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                {
                  // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                  name: name,
                  price: price,
                  image: imagen,
                  id: productId2,
                  brand: brand2,
                  category: category2,
                }
              );
            });
            // ----------------------------------------Aca empieza la tercera funcion de cigarritos-------------------------------
            products
              .findAll({
                where: {
                  category_id: 3,
                },
                // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
                // la key include tiene como value un array (en este caso de objetos)
                include: [
                  {
                    model: atributes,
                    through: {
                      model: atributeProduct,
                    },
                  },
                ],
              })
              // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
              .then((productEncontradosDesdeBD3) => {
                // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
                // console.log(
                //   "producto encontrados",
                //   JSON.stringify(productEncontradosDesdeBD3, null, 2)
                // );
                // Definimos en variables

                // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
                productEncontradosDesdeBD3.forEach((productoEncontrado3) => {
                  // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
                  const name = productoEncontrado3.Atributes.find(
                    (atribute) => atribute.name === "Vitola"
                  ).atributeProduct.value;
                  const price = productoEncontrado3.Atributes.find(
                    (atribute) => atribute.name === "PricePerBox"
                  ).atributeProduct.value;
                  const imagen = productoEncontrado3.image;
                  const productId3 = productoEncontrado3.id;
                  const category3 = productoEncontrado3.category_id;
                  const brand3 = productoEncontrado3.brand_id;
                  allProducts.push(
                    // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                    {
                      // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                      name: name,
                      price: price,
                      image: imagen,
                      id: productId3,
                      brand:brand3,
                      category:category3
                    }
                  );
                });
                //----------------------------------Aca empieza la cuarta funcion ------------------------------------------------------------
                products
                  .findAll({
                    where: {
                      category_id: 4,
                    },
                    // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
                    // la key include tiene como value un array (en este caso de objetos)
                    include: [
                      {
                        model: atributes,
                        through: {
                          model: atributeProduct,
                        },
                      },
                    ],
                  })
                  // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
                  .then((productEncontradosDesdeBD4) => {
                    // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
                    // console.log(
                    //   "producto encontrados",
                    //   JSON.stringify(productEncontradosDesdeBD4, null, 2)
                    // );
                    // Definimos en variables

                    // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
                    productEncontradosDesdeBD4.forEach(
                      (productoEncontrado4) => {
                        // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
                        const name = productoEncontrado4.Atributes.find(
                          (atribute) => atribute.name === "Taste"
                        ).atributeProduct.value;
                        const price = productoEncontrado4.Atributes.find(
                          (atribute) => atribute.name === "UnitPrice"
                        ).atributeProduct.value;
                        const imagen = productoEncontrado4.image;
                        const productId4 = productoEncontrado4.id;
                        const category4 = productoEncontrado4.category_id;
                        const brand4 = productoEncontrado4.brand_id;
                        allProducts.push(
                          // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                          {
                            // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                            name: name,
                            price: price,
                            image: imagen,
                            id: productId4,
                            brand:brand4,
                            category:category4
                          }
                        );
                      }
                    );

                    products
                      .findAll({
                        where: {
                          category_id: 5,
                        },
                        // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
                        // la key include tiene como value un array (en este caso de objetos)
                        include: [
                          {
                            model: atributes,
                            through: {
                              model: atributeProduct,
                            },
                          },
                        ],
                      })
                      // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
                      .then((productEncontradosDesdeBD5) => {
                        // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
                        // console.log(
                        //   "producto encontrados",
                        //   JSON.stringify(productEncontradosDesdeBD5, null, 2)
                        // );
                        // Definimos en variables

                        // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
                        productEncontradosDesdeBD5.forEach(
                          (productoEncontrado5) => {
                            // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
                            const name = productoEncontrado5.Atributes.find(
                              (atribute) => atribute.name === "Taste"
                            ).atributeProduct.value;
                            const price = productoEncontrado5.Atributes.find(
                              (atribute) => atribute.name === "UnitPrice"
                            ).atributeProduct.value;
                            const imagen = productoEncontrado5.image;
                            const productId5 = productoEncontrado5.id;
                            const category5 = productoEncontrado5.category_id;
                            const brand5 = productoEncontrado5.brand_id;
                            allProducts.push(
                              // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                              {
                                // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                                name: name,
                                price: price,
                                image: imagen,
                                id: productId5,
                                brand:brand5,
                                category:category5
                              }
                            );
                          }
                        );
                        // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
                        // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.

                        // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
                        // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.

                        res.send(allProducts);

                        //Aca cierra el 5to then
                      });

                    //Aca cierra el cuarto then
                  });

                //Aca cierra el tercer then
              });

            //Aca cierra el segundo then
          });

        //Aca cierra el primer then
      });

    //Aca cierra la funcion AllProducts
  },
};
