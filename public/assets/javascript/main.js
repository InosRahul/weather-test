
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();


    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    const location = search.value
    if(location)
    {
        fetch('/weather?address=location').then((response)=>{
        response.json().then((data) => {
            if(data.errorMessage)
            {
                msg1.textContent = data.errorMessage
                msg2.textContent = ''
            }
            else{
                msg1.textContent = data.weatherresults
                msg2.textContent = ''
            }   
        })
        })
    }
    else{
        msg1.textContent = 'Enter Address'
        msg2.textContent = ''
    }
    
})