import {Profile_API} from "../API/api"
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { GlobalStateType } from "./redux-store";
import { AnyAction } from "redux";
import { SubmitingDataType } from "../components/Profile/ProfileInfo/ProfileDataForm/ProfileDataForm";

type ContactsType = {
    facebook: string
    website: string 
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}

type PostType = {
    id: number | string
    msg: string
    quantityOfLikes: number
    time: string
}

const initialState = {
    postsData : [
        {id: '1', msg: "hi", quantityOfLikes: 10, time: '6 Dec 2019 22:13:20'},
        {id: '2', msg: "hi", quantityOfLikes: 100, time: '6 Dec 2019 22:13:21'},
        {id: '3', msg: "1", quantityOfLikes: 100,time: '6 Dec 2019 22:13:22'},
        {id: '4', msg: "hi", quantityOfLikes: 100, time: '6 Dec 2019 22:13:23'}
    ] as Array<PostType>,
    currentProfile: null as ProfileType | null,
    status: 'Some Status'
}

type StateType = typeof initialState

type AddPostActionType = {
    type: typeof ADD_POST
    time: string
    msg: string
}

type RemovePostActionType = {
    type: typeof REMOVE_POST,
    msg: string
}

type SetProfileActionType = {
    type: typeof SET_PROFILE
    profile: ProfileType
}

type EditStatusActionType = {
    type: typeof EDIT_STATUS
    status: string
}

type SavePhotoActionType = {
    type: typeof SAVE_PHOTO
    photos: PhotosType
}

type ActionsType = AddPostActionType | RemovePostActionType | SetProfileActionType | EditStatusActionType | SavePhotoActionType

const profilePageReducer = (state: StateType = initialState,action: AnyAction/*ActionsType*/): StateType => {
    switch(action.type){
        case 'social-network/ProfilePageReducer/ADD-POST':
        return {
            ...state,
            postsData: [...state.postsData,{id: action.time, msg: action.msg, time: action.time, quantityOfLikes: 0}]
        }

        case 'social-network/ProfilePageReducer/REMOVE-POST':
        const filteredPostsData = state.postsData.filter(item => item.msg !== action.msg);
        return {
            ...state,
            postsData: filteredPostsData
        }

        case 'social-network/ProfilePageReducer/SET-PROFILE': {
            return {
                ...state,
                currentProfile: action.profile
            }
        }

        case 'social-network/ProfilePageReducer/EDIT-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'social-network/ProfilePageReducer/SAVE-PHOTO' : {
            return {
                ...state,
                currentProfile: {...state.currentProfile,photos: action.photos} as ProfileType
            }
        }
        default: return state;
    }
}

const ADD_POST: string = 'social-network/ProfilePageReducer/ADD-POST'
const REMOVE_POST: string = 'social-network/ProfilePageReducer/REMOVE-POST'
const SET_PROFILE: string = 'social-network/ProfilePageReducer/SET-PROFILE'
const EDIT_STATUS: string = 'social-network/ProfilePageReducer/EDIT-STATUS'
const SAVE_PHOTO: string = 'social-network/ProfilePageReducer/SAVE-PHOTO'

export const creatorAddPostAction = (time: string, msg: string): AddPostActionType => ({type: ADD_POST,time,msg});
export const creatorRemovePostAction = (msg: string): RemovePostActionType => ({type: REMOVE_POST,msg});
export const setProfile = (profile: ProfileType): SetProfileActionType => ({type: SET_PROFILE,profile})
export const editStatus = (status: string): EditStatusActionType => ({type: EDIT_STATUS,status})
export const savePhoto = (photos: PhotosType): SavePhotoActionType => ({type: SAVE_PHOTO,photos})

type ThunkType = ThunkAction<Promise<void>,GlobalStateType,unknown,ActionsType | ReturnType<typeof stopSubmit>>

export const getProfile = (id: string | undefined, authorized: number | null): ThunkType => async (dispatch) => {
    const data = await Profile_API.getUserProfile(id,authorized)
    dispatch(setProfile(data))
}

export const saveProfileChanges = (payload: SubmitingDataType): ThunkType => async (dispatch,getState) => {
    const data = await Profile_API.setProfile(payload)
    if(data.data.resultCode === 0){
        dispatch(getProfile(undefined,getState().auth.userId))
    } else {
        const error_msg = data.data.messages.length > 0 ? data.data.messages[0] : 'Input error'
        dispatch(stopSubmit('profile-data-form',{_error: error_msg}))
        return Promise.reject(data.data.messages[0])
    }
}

export const getStatus = (id: string | undefined, authorized: number | null): ThunkType => async (dispatch) => {
    const status = await Profile_API.getUserStatus(id,authorized)
    dispatch(editStatus(status))
}

export const setStatus = (status: string): ThunkType => async (dispatch) => {
    const res = await Profile_API.setUserStatus(status)
    switch(res.data.resultCode) {
        case 0: {
            dispatch(editStatus(status))
            break
        }
        case 1: {
            debugger
            break
        }
    }
}

export const updatePhoto = (photo: any): ThunkType  => async (dispatch) => {
    const res = await Profile_API.savePhoto(photo)
    if(res.data.resultCode === 0) {
        dispatch(savePhoto(res.data.data.photos))
    }
}



export default profilePageReducer;