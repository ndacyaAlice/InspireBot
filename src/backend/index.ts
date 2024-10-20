import {
    query,
    update,
    text,
    Record,
    StableBTreeMap,
    Variant,
    Vec,
    Ok,
    Err,
    ic,
    Principal,
    Opt,
    nat64,
    Result,
    bool,
    Canister,
    init,
    Void,
    nat,
  } from "azle/experimental";
  import { v4 as uuidv4 } from "uuid";

 const contributorsProps=Record({
    email: text,
    name: text
 })
 type contributorsProps = typeof contributorsProps.tsType;

 const contribution = Record({
    contrId: text,
    email: text,
    content: text,
    createdAt: text
 });
 type contribution = typeof contribution.tsType;
  const BusinessIdeaPayload= Record({
    promptIdea: text,
    aiIdea: text,
  });
  type BusinessIdeaPayload = typeof BusinessIdeaPayload.tsType;

  const BusinessIdea= Record({
    id: text,
    promptIdea: text,
    aiIdea: text,
    owner:Principal,
    contributors: Vec(contributorsProps),
    contributions: Vec(contribution),
    createdAt : text
  });

  type BusinessIdea= typeof BusinessIdea.tsType;

  const UserProfile = Record({
    userId: Principal,
    userEmail: text,
    userName: text
  })

  type UserProfile= typeof UserProfile.tsType;
  const UserProfileProps= Record({
    userEmail:text,
    userName: text,
  })

  type UserProfileProps= typeof UserProfileProps.tsType;
  const ErrorMessage = Variant({
    NotFound: text,
    InvalidPayload: text,
    Err: text,
    Empty: text
  })
  
  type ErrorMessage= typeof ErrorMessage.tsType;


  const BusinessIdeaStorage = StableBTreeMap<text,BusinessIdea>(0);
  const UserProfileStorage = StableBTreeMap<Principal, UserProfile>(1);

  export default Canister({

    createProfile: update([UserProfileProps],Result(text,ErrorMessage),(payload)=>{
        try{
            if(!payload.userEmail || !payload.userName){
              return Err({InvalidPayload: "Invalid payload"})
            }
            const Profiles = UserProfileStorage.values();
            if(Profiles.some((profile:UserProfile)=>(profile.userEmail ===payload.userEmail ))){
              return Err({Err:"Email already exists"})
            }

            const NewProfile:UserProfile ={
              ...payload,
              userId: ic.caller()
            }
            UserProfileStorage.insert(ic.caller(),NewProfile);
            return Ok("Created Successfully")
        }catch(err:any){
            return Err({Err: `Error occured ${err.message}`})
        }
    }),

    getProfile:query([],Result(UserProfile, ErrorMessage),()=>{
      try{
         const ProfileOpt = UserProfileStorage.get(ic.caller());

         if(!ProfileOpt){
          return Err({NotFound:"Profile does not exist"})
         }
        return Ok(ProfileOpt)
      }catch(err:any){
        return Err({Err: `Error occured ${err.message}`})
      }
    }),
     
    createIdea: update([BusinessIdeaPayload], Result(text, ErrorMessage), (payload)=>{
        try{
            if(!payload.promptIdea || !payload.aiIdea){
                return Err({InvalidPayload: "Invalid payload"})
            }
            const ProfileOpt= UserProfileStorage.get(ic.caller());
            if(!ProfileOpt){
             return Err({NotFound:"created profile please"})
            }
        
            const NewBusinessIdea:BusinessIdea= {
                id: uuidv4(),
               ...payload,
                owner: ic.caller(),
                contributors: [{"email": ProfileOpt.userEmail,"name": ProfileOpt.userName}],
                contributions: [],
         
                createdAt : getCurrentDate()
            }
             BusinessIdeaStorage.insert(NewBusinessIdea.id,NewBusinessIdea);
             return Ok("created Successfully")
        }catch(err:any){
            return Err({Err:`Error occured ${err.message}`})
        }
    }),
    getMyBusiness: query([], Result(Vec(BusinessIdea),ErrorMessage), ()=>{
        try{
           const ideas = BusinessIdeaStorage.values();
           if(ideas.length === 0 ){
            return Err({Empty: "No available Business"})
           }
           const MyIdea = ideas.filter((idea:BusinessIdea)=>(JSON.stringify(idea.owner) === JSON.stringify(ic.caller())));
           if(MyIdea.length === 0) {
            return Err({Empty:'You do not have business idea'})
           }
           return Ok(MyIdea)
        }catch(err:any){
            return Err({Err: `Error occured ${err.message}`})
        }
    }),

    invite: update([text,text], Result(text,ErrorMessage),(email, businessId)=>{
        try{
            if(!email || !businessId){
                return Err({InvalidPayload:"Invalid payload"});
            }
            console.log(email)
            console.log(businessId)
            const businessOpt = BusinessIdeaStorage.get(businessId);
            if(!businessOpt){
                return Err({ NotFound:"Business idea does not exist"})
            }
           const users = UserProfileStorage.values();
           if(users.length ===0){
            return Err({Empty: "No user available"})
           }
           const invitee = users.filter((user:UserProfile)=>(user.userEmail == email));
           if(invitee.length === 0){
            return Err({Empty:"User does note exist"})
           }
           const newInvite = {
            email:invitee[0].userEmail,
            name: invitee[0].userName
           }
           businessOpt.contributors.push(newInvite);
           BusinessIdeaStorage.insert(businessOpt.id, businessOpt)
           return Ok("Invited successfully")
        }catch(err:any){
            return Err({Err: `Error occured ${err.message}`})
        }
    }),
    whereIContribute: query([], Result(Vec(BusinessIdea),ErrorMessage),()=>{
        try{
           const ProfileOpt= UserProfileStorage.get(ic.caller());
           const businessIdeas = BusinessIdeaStorage.values()
         
           if(!ProfileOpt){
            return Err({NotFound:"created profile please"})
           }
           if(businessIdeas.length === 0){
            return Err({Empty:"No business idea available"})
           }
         
           const businessIdea = businessIdeas.filter(
            (idea:BusinessIdea)=>(
            idea.contributors.map((item:contributorsProps)=>(item.email)).includes(ProfileOpt.userEmail)
           ))
           if(businessIdea.length === 0){
            return Err({Empty:"You are not contributing to any"})
           }
           return Ok(businessIdea)
        }catch(err:any){
            return Err({Err: `Error occured ${err.message}`})
        }
    }),

    contribute:update([text,text],Result(text, ErrorMessage),(businessId, content)=>{
        try{
            if(!businessId || !content){
               return Err({InvalidPayload:"Invalid payload"});
            }
            const businessOpt = BusinessIdeaStorage.get(businessId);
            if(!businessOpt){
                return Err({NotFound:"The business idea does not exist"})
            }
            const contributorProfile = UserProfileStorage.get(ic.caller());
            if(!contributorProfile){
                return Err({NotFound:"You do not have profile"})
            }
            if(!businessOpt.contributors.map((item:contributorsProps)=>(item.email)).includes(contributorProfile.userEmail)){
              return Err({Err:"Not allowed to contribute"})
            }

            const newContribution: contribution={
                contrId: uuidv4(),
                email: contributorProfile.userEmail,
               content,
               createdAt: getCurrentDate()
            }

            businessOpt.contributions.push(newContribution);
            BusinessIdeaStorage.insert(businessOpt.id,businessOpt);

            return Ok("contributed successfully")
        }catch(err:any){
            return Err({Err: `Error occured ${err.message}`})
        }
    }),

    deleteContribution:update([text,text], Result(text, ErrorMessage), (businessId,contributeId)=>{
        try{
          if(!businessId || !contributeId){
            return Err({InvalidPayload:"not ids provided"})
          }
          const businessOpt = BusinessIdeaStorage.get(businessId);
          if(!businessOpt){
            return Err({NotFound:"The business idea does not exist"})
          }
          if(JSON.stringify(businessOpt.owner) != JSON.stringify(ic.caller())){
            return Err({Err:"Unauthorized"});
          }

          if(!businessOpt.contributions.map((item:contribution)=>(item.contrId)).includes(contributeId)){
            return Err({NotFound:"Contribution does not exist"});
          }
          const updatedContribution = businessOpt.contributions.filter((item:contribution)=>(item.contrId !=contributeId));
          businessOpt.contributions = updatedContribution;
          BusinessIdeaStorage.insert(businessOpt.id,businessOpt)

          return Ok("deleted successfully")
        }catch(err:any){
            return Err({Err: `Error occured ${err.message}`}) 
        }
    }),

  });

  const getCurrentDate = () => {
    const timestamp = new Number(ic.time());
    const date = new Date(timestamp.valueOf() / 1_000_000); 
    return date.toISOString().split('T')[0]; 
  };