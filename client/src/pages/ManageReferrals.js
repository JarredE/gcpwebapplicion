import React from 'react';
import TableContent from "../components/TableContent";




function ManageReferrals() {

  const referralredirect = localStorage.getItem("referralStart");

  if(referralredirect === "true"){
      window.location.replace("/submit-referral");
  }

  return (
    
       
          <TableContent />
        
      
    
      
  );
}

export default ManageReferrals;
