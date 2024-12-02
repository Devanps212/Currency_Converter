//Dropdwon Setup
const list1 = document.getElementById('list1') as HTMLSelectElement
const list2 = document.getElementById('list2') as HTMLSelectElement
const errorTag = document.getElementById('error') as HTMLDivElement
let result = document.getElementById('result') as HTMLDivElement
let countryData: Record<string, number> = {}

interface ValidationResult{
    message: string,
    result: 'success' | 'failed'
}

interface API_Response{
    result: string,
    conversion_rates: Record<string, number>
}

//Content Loading
document.addEventListener('DOMContentLoaded', (): void=>{

    fetch('https://v6.exchangerate-api.com/v6/831beec2d712d23703f68041/latest/USD')
    .then((res)=>res.json())
    .then((data: API_Response)=>{

        if(data.result === "success"){
            countryData = data.conversion_rates
            for(let char of Object.keys(countryData)){

                const option = document.createElement('option')

                option.style.width = "100%"
                option.value = char
                option.text = char

                list1.options.add(option)

                const listClone = option.cloneNode(true) as HTMLOptionElement

                list2.options.add(listClone)
            }
        }else{
            alert('Failed to fetch data')
        }
    })
    .catch((err:any)=>alert(err.message))
})

//Convert functionality
document.getElementById('convert-button').addEventListener('click', (): void=>{
    try{
        const countryName : string = list1.value
        const convertTo : string = list2.value
        const amount : number = parseFloat((document.getElementById('amount') as HTMLInputElement).value)

        //Validation
        const validationResult : ValidationResult = Validation(amount, countryName, convertTo)
        if(validationResult.result === 'failed'){
            errorTag.style.display = 'block'
            errorTag.innerText = validationResult.message
            errorTag.style.color = "red"
            errorTag.style.width = "100%"
            return
        }  

        if(countryData[countryName] && countryData[convertTo]){
            const changeRate : number = countryData[countryName]
            const convertRate : number = countryData[convertTo]

            const conversionRate = convertRate / changeRate;

            const convertedAmount = amount * conversionRate;
            
            result.innerText = `${amount} ${countryName} = ${convertedAmount.toFixed(2)} ${convertTo}`

            errorTag.style.display = "none"

            alert(`${countryName} to ${convertTo} conversion successfull`)
            
        }else{
            alert('No data found')
        }
    }catch(error: any){
        alert(error.message)
    }

    
})

//Validation Check
function Validation(amount: number, changeRate: string, convertRate: string) : ValidationResult{
    if(changeRate === convertRate){
        return {
            message:"Both countries cannot be the same",
            result: "failed"
        }
    }

    if(amount <= 0 || isNaN(amount)){
        return {
            message:"Please provide a valid amount",
            result: "failed"
        }
    }
    return {
        message:"validation success",
        result: "success"
    }
}