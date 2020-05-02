
exports.up = function(knex) {
    return knex.schema.createTable('cases', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();
        table.string('organization_id').notNullable();
        table.foreign('organization_id').references('id').inTable('organizations');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cases');
};
