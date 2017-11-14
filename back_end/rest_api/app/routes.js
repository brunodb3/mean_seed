/**
 *  routes.js
 *    - Declares all the app's routes
 *  
 ******************************************************************************/

/* Importing modules */
var Usuarios = require('./services/usuario.service');

/**
 * Exports the file as a module
 * @param  {Object}  app  Main app object
 * @return {null}
 */
module.exports = function(app) {
  /**
   * Declaring the app's routes (each route calls a function)
   * First parameter is the path for the route, second is the function to call
   * 
   ****************************************************************************/

  /* Gets all the 'usuarios' on the database */
  app.get('/api/usuarios', Usuarios.getUsuarios);

  /* Updates an 'usuario' on the database */
  app.put('/api/usuarios', Usuarios.updateUsuario);

  /* Creates an 'usuario' on the database */
  app.post('/api/usuarios', Usuarios.createUsuario);

  /* Removes an 'usuario' from the database */
  app.delete('/api/usuarios', Usuarios.removeUsuario);
}