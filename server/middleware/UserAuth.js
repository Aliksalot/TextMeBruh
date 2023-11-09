
const allowed_api_routes = ['/api/auth/loginattempt', '/api/auth/register']
const allowed_view_routes = ['/login', '/register', '/favicon.ico']

const { isLogged } = require('../utils/userSession')

const routeAllowed = (route) => {
    const allowed_routes = [...allowed_api_routes, ...allowed_view_routes]
    for(let i = 0; i < allowed_routes.length; i++){
        if(allowed_routes[i] === route)
            return true
    }
    return false;
}

const auth = (req, res, next) => {
    const route = req.originalUrl
    if(isLogged(req)){
        console.log('allowing', route)
        next()
        return
    }

    if(routeAllowed(route)){
        console.log('allowing', route)
        next()
        return
    }
        
    console.log('redirecting', route)
    res.redirect('/login')
    

}

module.exports = auth