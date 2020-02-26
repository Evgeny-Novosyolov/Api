import * as types from '../types'

const initialState = {
    users: [],
    userPosts: [],
    postComments: [],
    loadingComments: [],
    postsDelete: [],
    editPostLoading: [],
    addPostLoading: false,
    deletePostLoading: false,
    loading: true,
    error: false


}


const users = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.FETCH_USERS_REQUEST: 

            return{
                ...state,
                loading: true
            }

        case types.FETCH_COMMENTS_REQUEST: 

            const item = state.loadingComments.find((item)=> item === action.payload)
            if(item === undefined) {
                return{
                    ...state,
                    loadingComments: [...state.loadingComments, action.payload]
                }
            }
            return {
                ...state
            }

        case types.FETCH_USERS_SUCCESS: 

            return {
                ...state,
                users: action.payload,
                loading: false
            } 

        case types.FETCH_USERS_FAILURE: 

            return {
                ...state,
                users: [],
                error: true,
                loading: false
            }

        case types.FETCH_USER_SUCCESS: 

            return {
                ...state,
                userPosts: action.payload,
                postComments: [],
                loadingComments: [],
                loading: false,
            }

        case types.FETCH_POST_COMMENTS_SUCCESS: 

            const postId = action.payload[0].postId
            const itemIndex = state.loadingComments.findIndex((item)=> postId === item )

            return {
                ...state,
                postComments: action.payload,
                loadingComments: [...state.loadingComments.slice(0, itemIndex),
                ...state.loadingComments.slice(itemIndex + 1)]
            }

        case types.FETCH_DELETE_POST_REQUEST: 
            
            const isDeleteItem =  state.postsDelete.includes(action.payload)

            if(!isDeleteItem){
                return {
                    ...state,
                    postsDelete : [...state.postsDelete, action.payload]
                }
            } 
            return {
                ...state
            }

        case types.FETCH_ADD_POST_REQUEST:
            
            return{
                ...state,
                addPostLoading: true
            }



        case types.FETCH_DELETE_POST_SUCCESS: 
            
            const {data, id} = action.payload

            if (Object.keys(data).length == 0) {
            
                const itemIndex = state.postsDelete.findIndex((item)=>  item === id)

                const newPosts = state.userPosts.filter(({id: idPost}) => idPost !== id)

                return {
                    ...state,
                    userPosts: newPosts,
                    postsDelete: [...state.postsDelete.slice(0, itemIndex),
                    ...state.postsDelete.slice(itemIndex+1)]
                }
            }

            return{
                ...state
            }
            
        case types.FETCH_DELETE_POST_ERROR:

            const itemIndexDelete = state.postsDelete.findIndex((index)=> index === action.payload)
            
            return{
                ...state,
                postsDelete: [...state.postsDelete.slice(0, itemIndexDelete),
                ...state.postsDelete.slice(itemIndexDelete + 1)]
            }


        case types.FETCH_ADD_POST_SUCCESS:

            return {
                ...state,
                addPostLoading: false,
                userPosts: [action.payload, ...state.userPosts ]
            }

        case types.FETCH_EDIT_POST_REQUEST:

            

            if(!state.editPostLoading.includes(action.payload.id)){
                return{
                    ...state,
                    editPostLoading: [...state.editPostLoading, action.payload.data]
    
                }
            }
            return {
                ...state
            }



        case types.FETCH_EDIT_POST_SUCCESS:

            const {id: postIdEdit} = action.payload

            const postIndex = state.userPosts.findIndex(({id: postId})=> postId ===  postIdEdit)
            const postIndexEdit = state.editPostLoading.findIndex((item)=> item === postIdEdit )


            return {
                ...state,
                userPosts: [...state.userPosts.slice(0, postIndex),
                action.payload,
                ...state.userPosts.slice(postIndex+1)],
                editPostLoading: [...state.editPostLoading.slice(0, postIndexEdit),
                ...state.editPostLoading.slice(postIndexEdit + 1)]
            }

        case types.FETCH_EDIT_POST_ERROR: 


            const postIndexEdit2 = state.editPostLoading.findIndex((item)=> item.id === action.payload)

            return {
                ...state,
                editPostLoading: [...state.editPostLoading.slice(0, postIndexEdit2),
                    ...state.editPostLoading.slice(postIndexEdit2 + 1)]
            }

        case types.FETCH_ADD_POST_ERROR: 
        
            return {
                ...state,
                addPostLoading:false
            }



        default:
            return state
    }
}

export default users