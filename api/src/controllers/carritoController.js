const path = require('path');
const {validationResult} = require('express-validator');
const {Product, CartProduct, User, Cart, Atribute, AtributeProduct, Category } = require('../database/models'); 

module.exports = {
    addCart: (req,res) =>{ 
        //return res.send(req.body)
        const errores = validationResult(req);
        if(errores.isEmpty()){
            Product.findByPk(req.body.product_id, 
                {
                    include: [
                        {
                          model: Atribute,
                          attributes: ["id", "name"],
                          through: {
                            // This block of code allows you to retrieve the properties of the join table
                            model: AtributeProduct,
                            attributes: ["id", "value"],
                          },
                        },
                      ]
                }
            ).then(product => {
                const priceAttribute = ["UnitPrice", "PricePerBox"];
                const precio = product.Atributes.find((atribute) =>
                priceAttribute.includes(atribute.name)).atributeProduct.value

                Cart.findOne({
                where: { 
                    state_id : 1,
                    user_id: req.session.usuario.id
                    }
                })
                .then((cart)=>{
                    if (!cart){
                        Cart.create({
                            user_id: req.session.usuario.id,
                            state_id: 1,
                            total: Number(precio) * Number(req.body.cantidad)
                        })
                        .then((createdCart)=>{
                            CartProduct.create({
                                quantity: req.body.cantidad,
                                subtotal: Number(precio) * Number(req.body.cantidad),
                                product_id: req.body.product_id,
                                cart_id: createdCart.id
                            })
                            res.redirect('/carrito') //mandar para o carrinho
                        })
                        .catch(error => console.log(error))
                    }else {
                        
                        CartProduct.findOne({
                            where: {
                                product_id: req.body.product_id,
                                cart_id: cart.id
                            }
                        })
                        .then(cartProductEncontrado => {
                            if (cartProductEncontrado) {
                                CartProduct.update(
                                    {
                                        quantity: Number(cartProductEncontrado.quantity) + Number(req.body.cantidad),
                                        subtotal: cartProductEncontrado.subtotal + Number(precio) * Number(req.body.cantidad),
                                    },
                                    {
                                        where: {
                                            id: cartProductEncontrado.id
                                        }
                                    }
                                )
                                .then(() => {
                                    Cart.update(
                                        {
                                            total: Number(cart.total) + Number(precio) * Number(req.body.cantidad)
                                        },
                                        {
                                            where: {
                                                id: cart.id
                                            }
                                        }
                                    )
                                    .then(() => res.redirect('/carrito'))
                                })
                            }
                            else {
                                CartProduct.create({        
                                    quantity: req.body.cantidad,
                                    subtotal: Number(precio) * Number(req.body.cantidad),
                                    product_id: req.body.product_id,
                                    cart_id: cart.id
                                })
                                .then(() => {
                                    Cart.update(
                                        {
                                            total: Number(cart.total) +  Number(precio) * Number(req.body.cantidad),
                                        },
                                        {
                                            where: {
                                                id: cart.id
                                            }
                                        }
                                    )
                                    .then(() => res.redirect('/carrito'))
                                })
                            }
                        })
                        .catch(error => console.log(error))
                    }
                })
            })
        }
    },
    cart : (req,res) =>{
        Cart.findOne({
            where: { 
                state_id : 1,
                user_id: req.session.usuario.id
            },
            include:{
                model: Product,
                include: [
                    {
                        model: Atribute,
                        attributes: ["id", "name"],
                        through: {
                        model: AtributeProduct,
                        attributes: ["id", "value"],
                        }
                    },
                    { 
                        model: Category
                    }
                ],
                through: {
                  // This block of code allows you to retrieve the properties of the join table
                  model: CartProduct,
                },
            }
        })
        .then((cartProducto)=>{
            const nameAttribute = ["VitolaDeGalera", "Vitola", "Taste"];
            const priceAttribute = ["UnitPrice", "PricePerBox"];
            const productos = cartProducto && cartProducto.Products.map(producto => {
                const nombre = producto.Atributes.find((atribute) =>
                    nameAttribute.includes(atribute.name)
                ).atributeProduct.value
                
                const precio = producto.Atributes.find((atribute) =>
                  priceAttribute.includes(atribute.name)).atributeProduct.value
                return {
                    id: producto.id,
                    nombre,
                    precio,
                    tipo: {
                        name: producto.Category.name
                    },
                    imagen: producto.image,
                    cantidad: producto.CartProduct.quantity
                }
            })

            const carrito = {
                id: cartProducto && cartProducto.id,
                total: cartProducto && cartProducto.total,
                productos
            }

            return res.render(path.resolve(__dirname, '../views/productos/carrito'), {carrito})
        })
    },
    deleteCart : (req,res) =>{
        CartProduct.destroy({
            where: {
                product_id: req.body.productoId,
                cart_id: req.body.carritoId,
            }
        })
        .then(() => {
            CartProduct.findOne({
                where: {
                    cart_id: req.body.carritoId
                }
            })
            .then((cartProductEncontrado) => {
                if(cartProductEncontrado) {
                    Cart.findByPk(req.body.carritoId)
                    .then(carritoEncontrado => {
                        Cart.update(
                            {
                                total: carritoEncontrado.total - Number(req.body.productoPrecio) * Number(req.body.productoCantidad),
                            },
                            {
                                where: {
                                    id: req.body.carritoId
                                }
                            }
                        )
                        .then(() => res.redirect('/carrito'))
                        .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
                }
                else {
                    Cart.destroy({
                        where: {
                            id: req.body.carritoId,
                        }
                    })
                    .then(() => res.redirect('/'))
                    .catch(error => console.log(error))

                }
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    },
    mantenimiento:
        (req,res) => {
            //Aca le vamos a devolver al usuario la vista que indica que el sitio esta en mantenimiento. Usamos ademas el metodo path, para indicar la ruta correspondiente a la vista.
            return res.render(path.resolve(__dirname, "..", "views", "web", "mantenimiento.ejs"));
          
          }
    }



