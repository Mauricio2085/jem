const express = require('express');
const router = express.Router();
const mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 20,
  host: 'localhost',
  user: 'root',
  password: 'M4ur1c10',
  database: 'jem'
  
});

router.get('/', (req, res) =>{
  res.render('index');
})

router.get('/registros/productos', (req, res) =>{
  res.render('admin/reg_producto', {mensaje: req.flash('mensaje')})
    });
  
router.post('/procesar_registro_productos', (req, res) =>{
  pool.getConnection(function (err, connection){
  
      const productoId = req.body.productoId;
      const descripcion = req.body.descripcion.toLowerCase().trim();
      const referencia = req.body.referencia.trim();
      const unidadEmpaqueId = req.body.unidadEmpaqueId;
      const marca = req.body.marca;
      const proveedor = req.body.proveedor;
      const costoUnd = req.body.costoUnd;
      const utilidadId = req.body.utilidadId;
      const precioVenta = req.body.precioVenta;
      const derivado = req.body.derivado;  
  
      //const costoUndMon = new Intl.NumberFormat().format(costoUnd)
  
         const consulta = `
          INSERT INTO
          productos
          (descripcion, referencia, unidad_empaque_id,
          marca, proveedor, costo_und, utilidad_id, precio_venta, derivado) 
          VALUES (${connection.escape(descripcion)}, ${connection.escape(referencia)},
           ${connection.escape(unidadEmpaqueId)}, ${connection.escape(marca)}, ${connection.escape(proveedor)}, 
           ${connection.escape(costoUnd)}, ${connection.escape(utilidadId)}, ${connection.escape(precioVenta)},
           ${connection.escape(derivado)});
          `
         
            test = console.log(costoUnd);
            connection.query(consulta, (error, filas, campos)=>{
               res.redirect('/registros/productos');
              })
              connection.release()
            })
                       
         })

router.get('/registros/proveedores', (req, res) =>{
          res.render('admin/reg_proveedor', {mensaje: req.flash('mensaje')})
          });
        
router.post('/procesar_registro_proveedor', (req, res) =>{
          pool.getConnection(function (err, connection){
        
            const nombre = req.body.nombre;
            const ciudad = req.body.ciudad;
            const direccion = req.body.direccion;
            const telefono = req.body.telefono;
               
               const consulta = `
                INSERT INTO
                proveedores
                (nombre, ciudad, direccion, telefono) 
                VALUES (${connection.escape(nombre)}, ${connection.escape(ciudad)},
                 ${connection.escape(direccion)}, ${connection.escape(telefono)});
                `
                  connection.query(consulta, (error, filas, campos)=>{
                     res.redirect('/registros/proveedores');
                    })
                    connection.release()
                  })
                        
               })   
               
router.get('/registros/marcas', (req, res) =>{
                res.render('admin/reg_marca', {mensaje: req.flash('mensaje')})
                });
              
router.post('/procesar_registro_marca', (req, res) =>{
                pool.getConnection(function (err, connection){
              
                  const marca = req.body.marca;
                                
                     const consulta = `
                      INSERT INTO
                      marcas
                      (marca) 
                      VALUES (${connection.escape(marca)});
                      `
                        connection.query(consulta, (error, filas, campos)=>{
                           res.redirect('/registros/marcas');
                          })
                          connection.release()
                        })
              
                       
                     })

router.get('/registros/unidad_empaque', (req, res) =>{
                      res.render('admin/reg_und_emp', {mensaje: req.flash('mensaje')})
                      });
                    
router.post('/procesar_registro_unidad_empaque', (req, res) =>{
                      pool.getConnection(function (err, connection){
                    
                        const undEmpaque = req.body.undEmpaque;
                                      
                           const consulta = `
                            INSERT INTO
                            unidad_empaque
                            (und_empaque) 
                            VALUES (${connection.escape(undEmpaque)});
                            `
                              connection.query(consulta, (error, filas, campos)=>{
                                 res.redirect('/registros/unidad_empaque');
                                })
                                connection.release()
                              })
                           })
      
router.get('/registros/utilidades', (req, res) =>{
                            
  pool.getConnection(function (err, connection){
                              
    const consulta2 = `
          SELECT * FROM
          utilidad;
          `
          connection.query(consulta2, (error, filas, campos)=>{
            res.render('admin/reg_utilidad', {mensaje: req.flash('mensaje'), utilidades: filas})
            })
          connection.release();
          }); 
        });
                          
router.post('/procesar_registro_utilidad', (req, res) =>{
  pool.getConnection(function (err, connection){
                          
   const porcentaje = req.body.porcentaje;
   const consulta = `
    INSERT INTO
    utilidad
    (porcentaje) 
    VALUES (${connection.escape(porcentaje)});
    `
    connection.query(consulta, (error, filas, campos)=>{
    res.redirect('/registros/utilidades');
    })
  connection.release()
  })
}) 

router.get('/inventario', (req, res) =>{
  res.render('admin/reg_entrada', {mensaje: req.flash('mensaje')})
    });
  
router.post('/procesar_registro_entrada', (req, res) =>{
  pool.getConnection(function (err, connection){
  
      const noFactura = req.body.noFactura;
      const fecha = req.body.fecha;
      const cantidad = req.body.cantidad;
      const precioUnd = req.body.precioUnd;
      const iva = req.body.iva;
      const valorTotal = req.body.valorTotal;
      
         const consulta = `
          INSERT INTO
          entradas
          (no_factura, fecha, cantidad,
           precio_unidad, iva, valor_total) 
          VALUES (${connection.escape(noFactura)}, ${connection.escape(fecha)},
           ${connection.escape(cantidad)}, ${connection.escape(precioUnd)}, ${connection.escape(iva)}, 
           ${connection.escape(valorTotal)});
          `
            connection.query(consulta, (error, filas, campos)=>{
               res.redirect('/inventario');
              })
              connection.release()
            })
                       
         })

module.exports = router;