import { Boom } from "@hapi/boom";
import { db } from '../database';

export const getUserListingsRoute = {
    method : 'GET',
    path   : '/api/users/{userId}/listings',
    handler: async (req,h)=>{
        const userId = req.params.userId;
        const { results } = await db.query(
            'SELECT * FROM listings WHERE user_id=?',
            [userId],
        );
        const listing = results[0];
        if (!listing) throw Boom.notFound(`Listing does not exist for user id ${userId}`);
        return listing;
    }
}