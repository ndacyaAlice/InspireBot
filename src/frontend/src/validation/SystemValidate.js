import * as Yup from "yup";

export const ContentValid = Yup.object().shape({
    idea: Yup
    .string()
    .required()
    .min(330, " user Note 6 character")
});

export const InviteValid=Yup.object().shape({
   email: Yup.string().email('Invalid email format').required('Email is required')
});

export const ContributeValid = Yup.object().shape({
    content:Yup
    .string()
    .required("Content is required")
    .min(15, "minimun required is 30 words"),
    businessId: Yup.string().required()
});
export const profileValid = Yup.object().shape({
    userEmail: Yup.string().email('Invalid email format').required('Email is required'),
    userName: Yup
    .string()
    .required("userName  is required")
    .max(30, "maximun length of the name is 30"),
})