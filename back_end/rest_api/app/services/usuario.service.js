/**
 *  usuarios.js
 *    - Functions related to 'usuarios' on the database
 *  
 ******************************************************************************/

/* Importing modules */
var jwt = require('jsonwebtoken'),
  Config = require('../config'),
  Usuario = require('../schemas/usuario.schema');

/* Exporting the functions into the module */
module.exports.getUsuarios = getUsuarios;
module.exports.createUsuario = createUsuario;
module.exports.updateUsuario = updateUsuario;
module.exports.removeUsuario = removeUsuario;

/**
 * Queries the 'usuarios' on the database
 */
function getUsuarios(req, res, next) {
  var matchQuery = {},
    queryArray = [];

  /* Checks query params for 'nome' */
  if (req.query.nome) {
    queryArray.push({ 'nome': req.query.nome });
  }

  /* Checking the 'queryArray' size */
  if (queryArray.length >= 2) {
    /* If we have multiple queries, we need the '$and' operator */
    matchQuery = {
      '$and': queryArray
    };
  } else if (queryArray.length > 0) {
    /* There's a single query, and we can't use it as array */
    matchQuery = queryArray[0];
  }

  /* Finding the 'usuarios' based on the query */
  Usuario.find(matchQuery, { senha: 0 }, function(err, usuarios) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Checking if array is empty */
    if (usuarios.length === 0) {
      return res.json({
        success: false,
        message: 'Não existem usuários com estes filtros'
      });
    }

    /* Returning the success message */
    return res.json({
      success: true,
      usuarios: usuarios,
      message: usuarios.length.toString() + ' usuário(s) encontrado(s)'
    });
  });
}

/**
 * Creates an 'usuario' on the database
 */
function createUsuario(req, res, next) {
  /* Checking if there's already an user with the provided 'nome' */
  Usuario.findOne({ 'nome': req.body.new.nome }, function(err, userDoc) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Checking if user exists with provided 'nome' */
    if (userDoc) {
      return res.json({
        success: false,
        message: 'Já existe um usuário cadastrado com este nome'
      });
    }

    /* Tries to update the user's fields */
    try {
      var userObject = {};

      userObject.nome = req.body.new.nome;
    } catch (err) {
      /* There was an error creating the hash */
      return res.json({
        success: false,
        message: 'Confira se todos os campos foram preenchidos corretamente'
      });
    }

    /* Sending the create request to the database */
    Usuario.create(userObject, function(err) {
      /* Checking for errors */
      if (err) { return next(err); }

      /* Returning the success message */
      return res.json({
        success: true,
        message: userObject.nome + ' cadastrado com sucesso'
      });
    });
  });
}

/**
 * Updates an 'usuario' on the database
 */
function updateUsuario(req, res, next) {
  /* Finding the user document based on query */
  Usuario.findOne({ 'nome': req.body.old.nome }, function(err, userDoc) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Checking if the user was found */
    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    /* Tries to update the user's fields */
    try {
      /* Checking each field ('nome') */
      if (req.body.new.nome) {
        userDoc.nome = req.body.new.nome;
      }
    } catch (err) {
      /* There was an error */
      return res.json({
        success: false,
        message: 'Confira se todos os campos foram preenchidos corretamente'
      });
    }

    /* Saving the updated 'usuario' document */
    userDoc.save(function(err) {
      /* Checking for errors */
      if (err) { return next(err); }

      /* Returning the success message */
      return res.json({
        success: true,
        message: userDoc.nome + ' alterado(a) com sucesso'
      });
    });
  });
}

/**
 * Removes an 'usuario' from the database
 */
function removeUsuario(req, res, next) {
  /* Checking for the 'nome' parameter */
  if (!req.query.nome) {
    return res.json({
      success: false,
      message: 'Confira se todos os campos foram preenchidos corretamente'
    });
  }

  /* Finding the user document based on query */
  Usuario.findOne({ 'nome': req.query.nome }, function(err, userDoc) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Checking if the user was found */
    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    /* Sends the remove request to the database */
    Usuario.remove({ 'nome': req.query.nome }, function(err) {
      /* Checking for errors */
      if (err) { return next(err); }

      /* Returning the success message */
      return res.json({
        success: true,
        message: req.query.nome + ' removido(a) com sucesso'
      });
    });
  });
}