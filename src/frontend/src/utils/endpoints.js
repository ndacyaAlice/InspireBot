const createProfile=async(Profile)=>{ 
  return  await window.canister.InspireBotApi.createProfile(Profile)
};

const getProfile=async()=>{ 
  return  await window.canister.InspireBotApi.getProfile()
};

const createIdea=async(BusinessIdea)=>{
  return await window.canister.InspireBotApi.createIdea(BusinessIdea)
}

const getMyBusiness=async()=>{ 
  return  await window.canister.InspireBotApi.getMyBusiness()
};

const invite=async(email,businessId)=>{ 
  return  await window.canister.InspireBotApi.invite(email,businessId)
};

const whereIContribute=async()=>{ 
  return  await window.canister.InspireBotApi.whereIContribute()
};

const contribute=async(businessId,content)=>{ 
  return  await window.canister.InspireBotApi.contribute(businessId,content)
};

const deleteContribution=async(businessId,contributeId)=>{ 
  return  await window.canister.InspireBotApi.deleteContribution(businessId,contributeId)
};


export {
  createProfile,
  getProfile,
  createIdea,
  getMyBusiness,
  invite,
  whereIContribute,
  contribute,
  deleteContribution
}