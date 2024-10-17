import React, {useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import  ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { 
  Typography,
  Box,
  CircularProgress
 }from '@mui/material';
 import MuiAccordionSummary from "@mui/material/AccordionSummary"
 import MuiAccordion from "@mui/material/Accordion"
 import  MuiAccordionDetails from "@mui/material/AccordionDetails"
import TotalAvatars from './Avators';
import Chips from './Chip';
import { WhereIContributeThunk } from '../redux/action/whereIcontribute';
import { useDispatch, useSelector } from 'react-redux';
import { ContributeThunk } from '../redux/action/contribute';
import { ContributeValid } from '../validation/SystemValidate';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#f6f9fc',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: '#f6f9fc',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid #f6f9fc',
}));

export default function CustomizedAccordionSupport() {
  const [expanded, setExpanded] = useState(" ");
  const [inputIdea, setInputIdea ] = useState();

  const dispatch = useDispatch();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(async()=>{
    dispatch(WhereIContributeThunk());
  },[dispatch])
  const { register, handleSubmit,setValue, formState: { errors }} = useForm({
    resolver: yupResolver(ContributeValid),
  });

  const submit=async(data)=>{
    const { businessId,content} = data;
      await dispatch(ContributeThunk({businessId,content}));
      setValue(" ");
      dispatch(MyBusinessThunk())
  }

   const {loading, myContribution,error } = useSelector((state)=>state.myContribution)
  const {  load } = useSelector((state)=>state.contribution)
  return (
    <div>
     {loading?
     (<div style={{textAlign: "center"}}>
      <CircularProgress size={50} color="primary" />
   </div>):  
   ((myContribution?.length  === 0)|| error)?(
    <div style={{textAlign: "center"}}>
          <p>You are not contributing to any</p>
    </div>
  ):(
    myContribution?.map((Ideas, index)=>(
       <Accordion expanded={expanded === `${Ideas.id}`} key={Ideas.id} onChange={handleChange(Ideas.id)} 
       sx={{borderRadius: "8px", marginBottom:"15px"}}
       >
         <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          
               <Box>
               <Box sx={{display:"flex",justifyContent:"space-between", 
                 marginBottom: "20px"}}>
                 <Box><Chips name={index+1} /></Box>
                 <Typography>{Ideas.createdAt}</Typography>
               </Box>
               
               <Box>
               <Typography sx={{marginBottom:"10px", fontWeight:"bold"}}>
                 USER PROMPT
                 </Typography>
                  <Typography>
                   {Ideas.promptIdea}
                  </Typography>
           </Box>
               </Box>
         </AccordionSummary>
         <AccordionDetails >
          <Box sx={{overflowY:"scroll", height: "60vh"}}>
         
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px"}}>
             <TotalAvatars contributors={Ideas.contributors}/>
         </Box>
        
         <Box>
         <Typography sx={{marginBottom:"10px", fontWeight:"bold"}}>
                 AI RESPONSE
         </Typography>
 
             <Typography>
             {Ideas.aiIdea}
              </Typography>
         </Box>
         <Box sx={{display:"flex", justifyContent:"space-between", marginTop: "40px"}}>
         <form className="Form" onSubmit ={handleSubmit(submit).bind(Ideas.id)}>
                 <textarea 
                   className="textArea"
                   placeholder="Suggest what to change or add "
                   {...register('content')}
                 />
                  <input type="hidden" value={Ideas.id} {...register('businessId')}/>
                  <button type="submit" className="buttonComment">
                  {load? <CircularProgress size={20} color="primary" />:"Contribute"}
              </button>
              
                 
              </form>
         </Box>
          {Ideas.contributions.map((contribution)=>(
            <Box sx={{marginTop:"20px", marginBottom:"20px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              padding: "14px"
             }}>
               <Box sx={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}} key={contribution.contrId}>
                <Typography sx={{padding: "4px 16px", background:"grey", borderRadius: "8px", color: "white"}}>{contribution.email}</Typography>
                <Typography>{contribution.createdAt}</Typography>
               </Box>
               <Typography>
                  {contribution.content}
               </Typography>
            </Box> 
          ))}  
          </Box>
         </AccordionDetails>
       </Accordion>
     )))}
    </div>
  );
}
