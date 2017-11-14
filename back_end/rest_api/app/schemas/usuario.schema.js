/**
 *  usuarios.js
 *    - Defining the 'usuarios' database model
 *  
 ******************************************************************************/

/* Importing modules */
var mongoose = require('mongoose');

/* Creating the Schema */
var usuariosSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dt_cadastro: { type: Date, required: true, default: Date.now }
});

/* Exporting the mongoose model as a module */
module.exports = mongoose.model('Usuario', usuariosSchema);