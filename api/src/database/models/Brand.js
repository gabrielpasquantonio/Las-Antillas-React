module.exports = (sequelize,DataTypes) => {
    //Aca tenemos que poner el mismo nombre de la tabla que creamos y sobre la cual vamos a trabajar.
    let alias = 'Brand';
   
    //Las columnas van a ser objetos literales, que a su vez van a tener otros objetos dentro de ellas en donde van a estar detallados los campos. Aca tenemos que copiar el contenido que hay en workbench. 
    let cols = {
      id : {
            type:DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement:true
      },
      //Aca ya estamos resumiendo cada atributo, pero si quisieramos especificar cada uno de ellos , por ej el name, tendriamos que abrir otro objeto literal y empezar a desarrollarlo , tal como lo hicimos con el ID. 
      //Los campos createdAt , updatedAt , deletedAt que estaban creados en la base de datos , no hace falta establecerlos aca ya que como estamos trabajando de manera estandarizada el sequelize se encarga.
        name :{ 
            type: DataTypes.STRING,
            primaryKey: false,
            allowNull:false,
            autoIncrement:false
        }
      }
    
  //Dentro del config, se coloca toda la informacion que queremos poner si no cumplimos los estandares para crear los modelos. Esto se usa cuando nosotros no seguimos los estandares. 
  /*  let config = {
      tableName : 'products',
      timestamps: false, 
   
    } ,
    */
    ///Aca estamos definiendo el modelo. El alias es el nombre, el cols es el nombre de las diferentes columnas. Y el config, es la configuracion que va a tener el modelo. 
    const Brand = sequelize.define(alias, cols /*config*/);
    Brand.associate = function (models) {
      Brand.hasMany(models.Product, {
        // as: "products",
        foreignKey: "brand_id",
      });
   
      Brand.belongsToMany(models.Category, {
        // as: "categories",
        through:"brandCategory",
        foreignKey: "brand_id",
        otherKey: "category_id"

      });
    };
  
    return Brand;
  };
  