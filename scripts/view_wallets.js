document.addEventListener("DOMContentLoaded",async (e)=>{
    const walletsList= document.getElementById("wallets-list");

    const response = await fetch(`${config.apiBaseUrl}/wallet/view_wallets.php`,{
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem("userID")}`
        }
    })
    const result = await response.json();
    if(response.ok){
        result.wallets.forEach(wallet=>{
            const walletDiv = document.createElement("div");
                walletDiv.classList.add("wallet");

                walletDiv.innerHTML = `
                    <h3>${wallet.wallet_name}</h3>
                    <p>Balance: ${wallet.balance} ${wallet.currency}</p>
                    <a href="deposit.html?wallet=${encodeURIComponent(wallet.wallet_name)}">Deposit</a>
                        <a href="withdraw.html?wallet=${encodeURIComponent(wallet.wallet_name)}">Withdraw</a>
                        <a href="transfer.html?wallet=${encodeURIComponent(wallet.wallet_name)}">Transfer</a>
                        <a href="history.html?wallet=${encodeURIComponent(wallet.wallet_name)}&type=transactions">Transactions</a>
                        <a href="history.html?wallet=${encodeURIComponent(wallet.wallet_name)}&type=withdrawals">Withdrawals</a>
                        <a href="history.html?wallet=${encodeURIComponent(wallet.wallet_name)}&type=deposits">Deposits</a>
                        <a href="history.html?wallet=${encodeURIComponent(wallet.wallet_name)}&type=internal_transfers">Internal Transfers</a>
                `;

                walletsList.appendChild(walletDiv);
        })
    }else{
        console.error("Error fetching wallets",result);
    }
})