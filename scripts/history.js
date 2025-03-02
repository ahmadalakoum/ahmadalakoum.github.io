document.addEventListener("DOMContentLoaded",async (e)=>{
    const transactionsList= document.getElementById("transactions-list");
    const urlParams = new URLSearchParams(window.location.search);
    // Get the wallet_id from the query string
    const walletID = urlParams.get('wallet_id');
    const transactionHistoryURL=`${config.apiBaseUrl}/wallet/transaction_history.php?wallet_id${walletID}`;
    const response = await fetch(transactionHistoryURL,{
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem("userID")}`
        }
    });
    const result = await response.json();
    //list all transactions
    if(response.ok){
        result.transactions.forEach(transaction=>{
            const transactionDiv = document.createElement("div");
            transactionDiv.classList.add("transaction");
            transactionDiv.innerHTML = `
                <span>type:${transaction.type}</span>
                <span>amount:${transaction.amount}</span>
                <span>date:${transaction.date}</span>
            `;
            transactionsList.appendChild(transactionDiv);
        });
    }else{
        console.error("Error fetching transaction history",result);
    }
 });
