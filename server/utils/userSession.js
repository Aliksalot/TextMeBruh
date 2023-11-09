const setLoggedIn = (req, username) => {
    req.session.logged = username
}

const isLogged = (req) => {
    try{
        return req.session.logged !== undefined    
    }catch(e){
        return false
    }
    
}

module.exports = {
    setLoggedIn,
    isLogged
}