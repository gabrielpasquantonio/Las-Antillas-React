const db = require("../database/models");
const rols = db.Rol;
const users = db.User;
const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;

const productAssociationQuery = [
  {
    model: categories,
    attributes: ["id", "name"],
  },
  {
    model: brands,
    attributes: ["id", "name"],
  },
  {
    model: atributes,
    attributes: ["id", "name"],
    through: {
      // This block of code allows you to retrieve the properties of the join table
      model: atributeProduct,
      attributes: ["id", "value"],
    },
  },
]

const mapProductWithAssociations = (product) => {
  const nameAttribute = ["VitolaDeGalera", "Vitola", "Taste"];
  const priceAttribute = ["UnitPrice", "PricePerBox"];
  
  const precioFirst = product.Atributes.find((atribute) =>
    priceAttribute.includes(atribute.name));
  
  const precio =
    (precioFirst &&
      precioFirst.atributeProduct) ||
    { value: "PONER PRECIO", id:'999999' }
  
  const nombreFirst = product.Atributes.find((atribute) =>
    nameAttribute.includes(atribute.name)
  );
  
  const nombre =
    (nombreFirst &&
      nombreFirst.atributeProduct) ||
    { value: "PONER nombre", id:'999999' }
  
  const getAttributes = () => {
    if(product.Category.id === 1) {
      const lengthAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Length")
      const ringAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Ring")
      const tasteAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Taste")
      
      return {
        largo: {
          value: lengthAtribute.atributeProduct.value,
          id: lengthAtribute.atributeProduct.id
        },
        ancho: {
          value: ringAtribute.atributeProduct.value,
          id: ringAtribute.atributeProduct.id
        },
        sabor: {
          value: tasteAtribute.atributeProduct.value,
          id: tasteAtribute.atributeProduct.id
        }
      }
    }
    
    if(product.Category.id === 2 || product.Category.id === 3) {
      const lengthAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Length")
      const ringAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Ring")
      const tasteAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Taste")
      const originAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Origin")

      return {
        largo: {
          value: lengthAtribute.atributeProduct.value,
          id: lengthAtribute.atributeProduct.id
        },
        ancho: {
          value: ringAtribute.atributeProduct.value,
          id: ringAtribute.atributeProduct.id
        },
        sabor: {
          value: tasteAtribute.atributeProduct.value,
          id: tasteAtribute.atributeProduct.id
        },
        origen: {
          value: originAtribute.atributeProduct.value,
          id: originAtribute.atributeProduct.id
        }
      }
    }

    if(product.Category.id === 4) {
      const originAtribute = product.Atributes.find((atribute) =>
      atribute.name === "Origin")
      const descriptionAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Description")
      return {
        descripcion: {
          value: descriptionAtribute.atributeProduct.value,
          id: descriptionAtribute.atributeProduct.id
        },
        origen: {
          value: originAtribute.atributeProduct.value,
          id: originAtribute.atributeProduct.id
        }
      }
    }

    if(product.Category.id === 5) {
      const quantityAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Quantity")
      const originAtribute = product.Atributes.find((atribute) =>
        atribute.name === "Origin")

      return {
        cantidad: {
          value: quantityAtribute.atributeProduct.value,
          id: quantityAtribute.atributeProduct.id
        },
        origen: {
          value: originAtribute.atributeProduct.value,
          id: originAtribute.atributeProduct.id
        }
      }
    }

  }

  const attributes = getAttributes();
  
  return {
    id: product.id,
    // marca: product.Brand.name,
    marca: {
      value: (product.Brand && product.Brand.name) || "AGREGAR",
      id: (product.Brand && product.Brand.id) || "99999" 
    },
    nombre,
    tipo: {
      name: product.Category.name,
      id: product.Category.id
    },
    ...attributes,
    precio,
    descuento: "20%",
    oldImagen: product.image,
    imagen: product.image,
  };
}

module.exports = {
  getProductsByCategory: async (type) => {
    const productsFromDB = await products.findAll({
      include: productAssociationQuery,
      attributes: ["id", "image"],
      where: {
        category_id: type,
      }
    });
    // console.log(JSON.stringify(productsFromDB, null, 4))
    const mapProduct = productsFromDB.map((product) => mapProductWithAssociations(product))
    return mapProduct
  },

  getAtributesTypeByCategory: async (type) => {
    const productsFromDB = await products.findOne({
      include: productAssociationQuery,
      attributes: ["id", "image"],
      where: {
        category_id: type,
      },
    });
    const nameAttribute = ["VitolaDeGalera", "Vitola", "Taste"];
    const priceAttribute = ["UnitPrice", "PricePerBox"];

    const atributes = {
      nameType: productsFromDB.Atributes.find(atribute => nameAttribute.includes(atribute.name)).name,
      priceType: productsFromDB.Atributes.find(atribute => priceAttribute.includes(atribute.name)).name
    }
    return atributes
  },


  getProductById: async (productId) => {
    const product = await products.findOne({
      include: productAssociationQuery,
      attributes: ["id", "image"],
      where: {
        id: productId
      }
    })
    return mapProductWithAssociations(product)
  },

  deleteById: async (productId) => {
    const product = await products.destroy({
      where: {
        id: productId
      }
    })
    return product
  },

  updateById: async (productId, fields) => {
    const producto = await products.update(
      {
        ...fields 
      },
      {
        where: {
          id: productId
        }
      }
    )
  },

  createProduct: async (product, atribute) => {
    return await products.create(product)
  }

};
