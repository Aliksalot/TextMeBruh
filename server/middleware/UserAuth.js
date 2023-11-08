
const allowed_routes = ['/login', '/register']

const routeAllowed = (route) => {
    for(let i = 0; i < allowed_routes.length; i++){
        if(allowed_routes[i] === route)
            return true
    }
    return false;
}

const auth = (req, res, next) => {
    if(req.body.logged){
        next()
        return
    }
    const route = req.originalUrl
    console.log(route)

    if(routeAllowed(route)){
        next()
        return
    }
        

    res.redirect('/login')
    

}

module.exports = auth