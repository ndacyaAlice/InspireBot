import { configureStore } from "@reduxjs/toolkit";
import CreateProfileSlice from "../slice/createProfile";
import CreateIdeaSlice from "../slice/createIdea";
import DeleteContributionSlice from "../slice/deleteContributionSlice";
import MyBusinessSlice from "../slice/myBusiness";
import OneProfile from "../slice/getProfileSlice";
import InviteSlice from "../slice/inviteSlice";
import WhereIContributeSlice from "../slice/whereIContributeSlice";
import ContributionSlice from "../slice/contributeSlice"

const store = configureStore({
    reducer: {
        createProfile:CreateProfileSlice,
        createIdea: CreateIdeaSlice,
        deleteContribution: DeleteContributionSlice,
        myBusiness: MyBusinessSlice,
        OneProfile: OneProfile,
        invite: InviteSlice,
        myContribution: WhereIContributeSlice,
        contribution: ContributionSlice
    }
});

export default store;