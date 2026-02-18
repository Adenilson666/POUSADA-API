'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const adminEmail = 'admin@gmail.com';

    // 🔎 verifica se já existe admin
    const [existing] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = :email LIMIT 1`,
      {
        replacements: { email: adminEmail },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (existing) {
      return; // admin já existe → não cria de novo
    }

    const password_hash = await bcrypt.hash('Admin@123', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: adminEmail,
        password_hash,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: 'admin@gmail.com'
    });
  }
};
