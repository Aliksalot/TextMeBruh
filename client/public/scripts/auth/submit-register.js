const registerFormComponent = document.getElementById('register-form')

const registerOutput = (message) => {
    const p = document.getElementById('register-result')
    
    p.textContent = message
}

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
        console.log(result.status)
        switch(result.status){
            case 'OK': window.location.href = '/home'; break;
            case 'TAKEN': registerOutput('Come on, choose a unique name :('); break;
            case "OTHER": registerOutput('Unknow issue happened'); break;
            case 'SHORT': registerOutput('Not looking at your password, but choose a longer one bro. ');break;
            case 'BAD': registerOutput("Couldn't you be more unique? ");break;
            default: registerOutput('Unknown issue happened')
        }
    })
}

registerFormComponent.addEventListener('submit', submitRegister)