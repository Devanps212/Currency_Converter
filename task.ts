document.addEventListener('DOMContentLoaded', (): void =>{
    const list1 = document.getElementById('list1') as HTMLSelectElement
    const list2 = document.getElementById('list2') as HTMLSelectElement

    fetch('https://v6.exchangerate-api.com/v6/831beec2d712d23703f68041/latest/USD')
    .then((res)=>res.json())
    .then((data: any)=>{
        console.log(data)
        const conversionCountry : Record<string, number> = data.conversion_rates
        for(let char of Object.keys(conversionCountry)){

            const option = document.createElement('option')
            option.value = char
            option.text = char

            list1.options.add(option)

            const listClone = option.cloneNode(true) as HTMLOptionElement

            list2.options.add(listClone)
        }
    })
})