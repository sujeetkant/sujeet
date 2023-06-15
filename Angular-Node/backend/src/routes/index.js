import { getAllListingsRoute } from './getAllListings';
import { getListingRoute } from './getListing';
import { addViewToListingRoute } from './addViewToListing';
import { getUserListingsRoute } from './getUserListings';
import { createNewListingRoute } from './createNewListing';
import { deleteListingRoute } from './deleteListing';
import { updateListingRoute } from './updateListing';

export default [
    getAllListingsRoute,
    getListingRoute,
    addViewToListingRoute,
    getUserListingsRoute,
    createNewListingRoute,
    deleteListingRoute,
    updateListingRoute
];