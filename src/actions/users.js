import SwapiService from '../api'
import * as types from '../types'

const api = new SwapiService()


const getAllUsers = () => async dispatch =>{

    try {
        const data  = await api.getAllUsers()
        
        dispatch({
            type: types.FETCH_USERS_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: types.FETCH_USERS_FAILURE,
        })
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
}


const getUserPosts = (id) => async dispatch =>{

    dispatch({
        type: types.FETCH_USERS_REQUEST,
    })

    try {
        
        const data  = await api.getUser(id)
        
        dispatch({
            type: types.FETCH_USER_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: types.FETCH_USERS_FAILURE,
        })
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
}

const getPostComments = (id) => async dispatch =>{

    dispatch({
        type: types.FETCH_COMMENTS_REQUEST,
        payload: id
    })

    try {
        
        const data  = await api.getPostComments(id)
        dispatch({
            type: types.FETCH_POST_COMMENTS_SUCCESS,
            payload: data
        })
        
    } catch(err) {
        dispatch({
            type: types.FETCH_USERS_FAILURE,
        })
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
}

const deletePost = (id) => async dispatch =>{


    dispatch({
        type: types.FETCH_DELETE_POST_REQUEST,
        payload: id
    })

    try {
        const data = await api.deletePost(id)
        if(data) {
            dispatch({
                type: types.FETCH_DELETE_POST_SUCCESS,
                payload: {
                    id,
                    data
                } 
            })
        } 


    } catch(err){
        alert("Не удалось удалить пост")
        dispatch({
            type: types.FETCH_DELETE_POST_ERROR,
            payload: id
        })
    
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }

}


const addPost = (data) => async dispatch=>{

    dispatch({
        type: types.FETCH_ADD_POST_REQUEST 
    })

    try{    
        const res = await api.addPost(data)

        if(res) {
            dispatch({
                type: types.FETCH_ADD_POST_SUCCESS,
                payload: res
            })
        }

    } catch(err) {
        alert("Не удалось добавить пост")
        dispatch({
            type: types.FETCH_ADD_POST_ERROR,
        })
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }

}


const editPost = (id, data) => async dispatch=>{

    dispatch({
        type: types.FETCH_EDIT_POST_REQUEST,
        payload:  {
            id,
            data
        }
    })


    try{    
        const res = await api.editPost(id, data)

        if(res) {
            dispatch({
                type: types.FETCH_EDIT_POST_SUCCESS,
                payload: res
            })
        }

    } catch(err) {
        alert("Не удалось изменить пост")
        dispatch({
            type: types.FETCH_EDIT_POST_ERROR,
            payload: id
        })
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }

}



export default {
    getAllUsers,
    getUserPosts,
    getPostComments,
    deletePost,
    addPost,
    editPost
}
