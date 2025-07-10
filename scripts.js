let input = document.querySelector('.input input')
let selects = document.querySelector('.dropdown').querySelectorAll('select')
let button = document.querySelector('button')

for (let select of Array.from(selects)){
    for(let currCode in countryList){
        let newOption = document.createElement('option')
        newOption.innerText = currCode
        newOption.value = currCode
        if (currCode == 'PKR' && select.name == 'from'){
            newOption.selected = 'selected'
        } 
        else if (currCode == 'USD' && select.name == 'to'){
            newOption.selected = 'selected'
        } 
        select.append(newOption)
    }

    select.addEventListener('change',() => {
        let countCode = countryList[select.value]
        let flag = select.parentElement.querySelector('img')
        flag.src = `https://flagsapi.com/${countCode}/flat/64.png`
    })
}


button.addEventListener('click',async (e) => {
    e.preventDefault()
    let value = input.value
    let fromCurr = selects[0]
    let toCurr = selects[1]
    let fromValue = fromCurr.value.toLowerCase()
    let toValue = toCurr.value.toLowerCase()
    
    let a = await fetch(`https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromValue}.json`)
    let data = await a.json()
    let conversion = data[fromValue][toValue]
    let answer = conversion * value
    document.querySelector('.answer input').value = answer
})