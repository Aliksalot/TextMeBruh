const formComponent = document.getElementById('login-form')

const submitLogin = async(event) => {
    event.preventDefault();
    
    const data = new FormData(formComponent)

    await fetch('api/auth/loginattempt',{
        method: 'POST',
        body: data
    }).then(response => {
        if(response.ok)
            return response.json()
    }).then(result => {
        console.log(result)
    })
}

formComponent.addEventListener('submit', submitLogin);