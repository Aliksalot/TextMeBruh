const registerFormComponent = document.getElementById('register-form')

const submitRegister = async(event) => {
    event.preventDefault()

    const formData = new FormData(registerFormComponent)

    const data = {}

    formData.forEach((value, key) => {
        data[key] = value
    })
    

    await fetch('api/auth/register',{
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
    })
}

registerFormComponent.addEventListener('submit', submitRegister)