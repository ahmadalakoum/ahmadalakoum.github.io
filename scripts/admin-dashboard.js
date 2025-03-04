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
        "Content-Type":"application/json"
        }
   });
   const result = await response.json();
   console.log(result);
   

})