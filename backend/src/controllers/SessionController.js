const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const organization = await connection('organizations').select('name').where('id', id).first();
        
        if (!organization) {
            return response.status(401).json({ message: 'fail authentication' })
        }
        else {
            return response.json(organization);
        }
    }
}