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

router.get('/vistas/productos', (req, res) =>{

  pool.getConnection(function (err, connection){
      const consulta = `
      SELECT * FROM productos 
I`
    connection.query(consulta, function (error, filas, campos) {
      res.render('admin/vista_productos', {productos: filas});
    })
    connection.release()
  })
})

router.get('/vistas/proveedores', (req, res) =>{

    pool.getConnection(function (err, connection){
        const consulta = `
        SELECT
        *
        FROM proveedores
        `
      connection.query(consulta, function (error, filas, campos) {
          res.render('admin/vista_proveedores', {proveedores: filas});
      })
      connection.release()
    })
  })

  router.get('/vistas/entradas', (req, res) =>{

    pool.getConnection(function (err, connection){
        const consulta = `
        SELECT
        *
        FROM entradas
        `
      connection.query(consulta, function (error, filas, campos) {
          res.render('admin/vista_entradas', {entradas: filas});
      })
      connection.release()
    })
  })


module.exports = router;