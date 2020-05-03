const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { organization_id, page=1 } = request.query;
        
        let cases = []

        if (organization_id) {
            cases = await connection('cases')
                .join('organizations', 'organizations.id', '=', 'cases.organization_id')
                .limit(5)
                .offset((page - 1) * 5)
                .where('organization_id', organization_id)
                .select(['cases.*', 'organizations.name', 'organizations.city', 'organizations.email', 'organizations.whatsapp']);

            const [ count ] = await connection('cases').where('organization_id', organization_id).count();
            response.header('X-Total-Count', count['count(*)']);
        }
        else {
            cases = await connection('cases')
                .join('organizations', 'organizations.id', '=', 'cases.organization_id')
                .limit(5)
                .offset((page - 1) * 5)
                .select(['cases.*', 'organizations.name', 'organizations.city', 'organizations.email', 'organizations.whatsapp']);;

            const [ count ] = await connection('cases').count();
            response.header('X-Total-Count', count['count(*)']);
        }

        if (cases) {
            return response.json(cases);
        }
        else {
            return response.status(204).send();
        }
    },

    async create(request, response) {
        const organization_id = request.headers.authorization;
        const { title, description, value } = request.body;

        const res_org = await connection('organizations').select('id').where('id', organization_id).first();

        if (res_org) {
            const res_case = await connection('cases').select('id').where('title', title).first();

            if (res_case) {
                return response.status(409).send({ message: "case already exists" });
            }
            else {
                const [id] = await connection('cases').insert({
                    title, description, value, organization_id
                });
        
                return response.json({ id });
            }
        }
        else {
            return response.status(401).send({ message: 'no permission' })
        }
    },

    async update(request, response) {
        const organization_id = request.headers.authorization;
        const { id } = request.params;
        const { title, description, value } = request.body;

        const res_case = await connection('cases')
            .select('organization_id', 'title', 'description', 'value')
            .where('id', id)
            .first();

        if (res_case) {
            if (res_case.organization_id === organization_id) {
                const body = {
                    'title': title||res_case.title,
                    'description': description||res_case.description,
                    'value': value||res_case.value
                }

                const res = await connection('cases').update(body).where('id', id);
                console.log(res);

                return response.json({ 'id': res });
            }
            else {
                return response.status(401).json({ message: 'no permission' });
            }
        }
        else {
            return response.status(404).send();
        }
    },

    async delete(request, response) {
        const organization_id = request.headers.authorization;
        const { id } = request.params;

        const res_case = await connection('cases').select('organization_id').where('id', id).first();

        if (res_case) {
            if (res_case.organization_id != organization_id) {
                return response.status(401).json({ message: 'no permission' })
            }
            else {
                await connection('cases').where('id', id).delete();
    
                return response.status(204).send();
            }
        }
        else {
            return response.status(404).send();
        }
    }
}