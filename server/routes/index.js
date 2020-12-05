'use strict';

const routes = [
    require('./api/customers'),
    require('./api/booths'),
    require('./api/orders'),
    require('./api/menu')
]

module.exports = function router(app, db) {
    return routes.forEach(route =>{
        route(app,db)
    })
}