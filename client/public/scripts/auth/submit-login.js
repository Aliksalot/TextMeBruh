const loginFormComponent = document.getElementById('login-form')

const submitLogin = async(event) => {
    event.preventDefault();
    
    const formData = new FormData(loginFormComponent)

    const data = {}

    formData.forEach((value, key) => {
        data[key] = value
    })

    await fetch('api/auth/loginattempt',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if(response.ok)
            return response.json()
    }).then(result => {
        console.log(result)
        if(result.success)
            window.location.href = '/home'
    })
}

loginFormComponent.addEventListener('submit', submitLogin);