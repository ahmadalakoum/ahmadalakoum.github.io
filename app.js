document.getElementById("convertBtn").addEventListener("click",()=>{
    const amount=parseFloat(document.getElementById("amount").value);
    const fromCurrency=document.getElementById("fromCurrency").value.toUpperCase();
    const toCurrency=document.getElementById("toCurrency").value.toUpperCase(); 
    const apiKey='88830e02eb57fdc04ca2922a';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    fetch(url)
    .then(response => response.json())
    .then(data =>{
        if(data.result ==='success'){
        const rate=data.conversion_rate;
        const convertedAmount= (amount *rate ).toFixed(2);
        const conversionResult = document.getElementById('conversionResult');
        conversionResult.innerHTML=
        `
         <p>${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}</p>
        <p>Conversion Rate: 1 ${fromCurrency} = ${rate} ${toCurrency}</p>
        `
        }
        else{
            conversionResult.innerHTML='Conversion failed! please check currency code';
        }

    })
    .catch(error=>{
        conversionResult.innerHTML='Error fetching data!';
    });

    

});