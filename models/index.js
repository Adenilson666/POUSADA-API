'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const db = {};
const modelsPath = __dirname;
const currentFile = path.basename(__filename);

// 1️⃣ Cria a conexão
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

// 2️⃣ Carrega todos os models automaticamente
fs.readdirSync(modelsPath)
  .filter(isModelFile)
  .forEach(loadModel);

// 3️⃣ Executa associações (se existirem)
Object.values(db).forEach(runAssociations);

// 4️⃣ Exporta
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/* =========================
   Funções auxiliares
   ========================= */

function isModelFile(file) {
  return (
    file !== currentFile &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  );
}

function loadModel(file) {
  const model = require(path.join(modelsPath, file))(
    sequelize,
    Sequelize.DataTypes
  );

  db[model.name] = model;
}

function runAssociations(model) {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
}
