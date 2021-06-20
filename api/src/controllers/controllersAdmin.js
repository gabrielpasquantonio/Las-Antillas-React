const path = require("path");
const fs = require('fs');
const db = require('../database/models')
// const rols = db.Rol;
// const users = db.User;
// const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;
const brandCategory = db.BrandCategory;

const ProductDao = require('../data/productoDao')
const atributeDao = require('../data/atributeDao');

module.exports = {
    indexProductos: async (req, res) => {
      //parametrizando para que la primera letra de files View sea mayuscula                
      //Aca pasamos los datos del archivo Json de los Productos a un Array de una manera parametrizada
      // console.log('index,', req.query.type)
      const todosProductosFromDBByType = await ProductDao.getProductsByCategory(req.query.type)
      res.render(path.resolve(__dirname, "..", "views", "admin", "adminProductos.ejs"),{todosProductosJson: todosProductosFromDBByType});
    },

    createProductos: async (req, res) => {
      //Aca pasamos los datos del archivo Json de Habanos a un Array
      const parseType = JSON.parse(req.query.type);

      const marcasFromDb = await categories.findOne({
        include: [
          {
            model: brands,
            attributes: ["name", "id"]
          },
        ],
        where: {
          id: parseType.id,
        }
      });

      const nombreId = parseType.id === 1 ? 1 
      : parseType.id === 2 || parseType.id === 3 ? 11
      : 4
      
      const priceId = parseType.id === 3 ? 12 : 5 // Solo cigarritos tiene priceperbox

      const cantidadId = parseType.id === 3 ? 7 : 9

      const marcas = marcasFromDb.Brands.map(marca => marca)
      res.render(path.resolve(__dirname, "..", "views", "admin", "createProductos.ejs"),{productType: parseType, marcas, nameAttributeId: nombreId, priceAttributeId: priceId, cantidadAttributeId: cantidadId, });
    },
    
    saveProductos: async (req, res) => {
      //Aca pasamos los datos del archivo Json de Habanos a un Array
      const atributeList = ['largo', 'ancho', 'sabor', 'origen', 'cantidad', 'descripcion', 'nombre', 'precio']
      const productType = JSON.parse(req.body.tipo) 
      const newProduct = {
        brand_id: req.body.marca,
        category_id: productType.id,
        image: req.files.length > 0 ? req.files[0].filename: "default.jpg",
      }

      const newProductFromDb = await ProductDao.createProduct(newProduct);
      const productAtributeType = await ProductDao.getAtributesTypeByCategory(productType.id)

      // console.log('body', req.body)
      // console.log('new product', JSON.stringify(newProduct))

      const attributesKeys =  Object.keys(req.body);

      for (const key of attributesKeys) {
        if(atributeList.includes(key)) {
          await atributeProduct.create({
            atribute_id: req.body[`${key}Id`],
            product_id: newProductFromDb.id,
            value: req.body[key]
          })
        }
      }

      res.redirect(`/adminProductos/?type=${productType.id}`)
    },

    showProductos: async (req,res) =>{
      //Aca pasamos los datos del archivo Json de Habanos a un Array
      const miProducto = await ProductDao.getProductById(req.params.id);
      //console.log('producto encontrados', JSON.stringify(miProducto, null, 2))//Aca pongo lo que le voy a mandar a la vista  
      res.render(path.resolve(__dirname, '..','views','admin','detailProductos.ejs'), {miProducto})
    },

    destroyProductos: async (req, res) => {
      const product = await ProductDao.deleteById(req.params.id);
      res.redirect(`/adminProductos/?type=${req.query.type}`);
    },

    editProductos: async (req,res) => {
      //Aca pasamos los datos del archivo Json de Habanos a un Array
      const productoEditar = await ProductDao.getProductById(req.params.id);
      //Aca pongo lo que le voy c mandar a la vista
      const marcasFromDb = await categories.findOne({
        include: [
          {
            model: brands,
            attributes: ["name", "id"]
          },
        ],
        where: {
          id: productoEditar.tipo.id,
        },
      });
      const marcas = marcasFromDb.Brands.map(marca => marca)
      res.render(path.resolve(__dirname, '..','views','admin','editProductos.ejs'), {productoEditar, marcas});
    },

    updateProductos: async (req,res) => {
      const atributeList = ['largo', 'ancho', 'sabor', 'origen', 'cantidad', 'descripcion', 'nombre', 'precio']
      Object.keys(req.body).forEach(async key => {
        if(atributeList.includes(key)) {
          await atributeProduct.update(
            {
              value: req.body[key]
            },
            {
              where: {
                id: req.body[`${key}Id`]
              }
            }
          )    
        }
      })
      const updatedFields = {
        image: req.files.length > 0 ? req.files[0].filename: req.body.oldimagen,
        brand_id: req.body.marca
      }

      await ProductDao.updateById(req.params.id, updatedFields)
      res.redirect(`/adminProductos/?type=${JSON.parse(req.body.tipo).id}`);        
    }           
                    
}
