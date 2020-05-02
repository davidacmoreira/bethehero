const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const organizations = await connection('organizations').select('*');
        
        if (organizations.length > 0) {
            return response.json(organizations);
        }
        else {
            return response.status(204).send();
        }
    },

    async create(request, response) {
        const { name, city, email, whatsapp } = request.body;

        const res = await connection('organizations').select('id').where('name', name).first();

        if (res) {
            return response.status(409).send({ message: "organization already exists" });
        }
        else {
            const id = crypto.randomBytes(4).toString('HEX');
        
            await connection('organizations').insert({
                id, name, city, email, whatsapp 
            });
    
            return response.json({ id });
        }
    }
};