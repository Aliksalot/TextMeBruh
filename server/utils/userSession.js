
//store {username, token, createdWhen}
const sessionTokens = []

const genToken = () => {

}

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

const logout = (req) => {
    req.session.logged = undefined
}

module.exports = {
    setLoggedIn,
    isLogged,
    logout

}