document.addEventListener("DOMContentLoaded",async (e)=>{
   const role = localStorage.getItem("role");

   if(role!=="admin"){
       window.location.href = "../pages/login.html";
   }
   const adminAnalyticsURL=`${config.apiBaseUrl}/admin/admin_analytics.php`;

   const response = await fetch(adminAnalyticsURL,{
    method:"GET",
    credentials:"include",
    headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${localStorage.getItem("userID")}`
        }
   });
   const result = await response.json();
   console.log(result);
   if (data.status === "success") {
    document.getElementById("totalUsers").textContent = data.data.user_growth.total_users;
    document.getElementById("newUsers").textContent = data.data.user_growth.new_users_this_month;
    document.getElementById("totalTransactions").textContent = data.data.transactions.total_transactions;

    const transactionsTable = document.getElementById("transactionsTable");
    transactionsTable.innerHTML = "";

    for (const [currency, stats] of Object.entries(data.data.transactions.currencies)) {
        const row = `
            <tr>
                <td>${currency}</td>
                <td>${stats.total_deposits}</td>
                <td>${stats.total_withdrawals}</td>
                <td>${stats.total_transfers}</td>
            </tr>
        `;
        transactionsTable.innerHTML += row;
    }
} else {
    document.body.innerHTML = `<h2>Error: ${data.message}</h2>`;
}
   

})