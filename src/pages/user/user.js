import React, {Component, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Spinner from '../../components/spinner'
import ErrorIndicator from '../../components/error-indicator'
import ButtonItem from '../../components/button'
import actions from '../../actions';
import './user.scss'
import { TransitionGroup ,CSSTransition } from 'react-transition-group';

class UserPageContainer extends Component {

    componentDidMount() {
        this.props.getAllUsers();
    }
    

    render() {
        const { users, loading, error, match: { params: {id}}, } = this.props;

        const person = users.find((user)=> user.id === +id)

    
        if (loading) {
            return <Spinner />;
        }
    
        if (error) {
            return <ErrorIndicator />;
        }
    
        return <UserPage 
                {...this.props}
                person={person}
                />;
        }
}



const UserPage = ({userPosts: posts ,person,getPostComments,comments, loadingComments , deletePost,addPost, addPostLoading, editPost, editPostLoading, postsDelete}) =>{
    const [value, setValue] = useState({})
    const [editValue, setEditValue] = useState({})
    const [isModalEdit, setIsModalEdit] = useState()
    const [isModalAdd, setIsModalAdd] = useState(false)
    useEffect(() => {
            if(!addPostLoading) {
                setValue({})
            }
            if(editPostLoading) {
                setIsModalEdit()
            }

    }, [addPostLoading, editPostLoading])
    


    const handleChange = (e, id) =>{

        e.preventDefault()
        const {name, value, dataset: {type}} = e.target
        
        if(type === "add") {
            setValue((prev)=>{
                return {
                    userId: person.id,
                    ...prev,
                    [name]: value
                }
            })
        } else {    
            setEditValue((prev)=>{
                return {
                    id,
                    userId: person.id,
                    ...prev,
                    [name]: value
                }
            })
        }


        
    }
 


    const renderComments = comments && comments.map(({email,body, id}, idx)=>{

        return (
            <CSSTransition
            timeout={500}
            classNames="comment"
            key={id}
            >
            <li className="comments__item">
                <h6 className="comments__title"><span className="comments__title--primary">User :</span><span className="comments__title--secondary">{email}</span></h6>
                <p className="comments__text">
                    {body}
                </p>
            </li>
        </CSSTransition>
        )
    })

  

    const renderPosts = posts.map((post)=>{
        
        const isSearch = loadingComments.includes(post.id) 
        const isDelete = postsDelete.includes(post.id)
        const editItem = editPostLoading.find((item)=> item.id === post.id)


        let idPost
        if(comments.length) {
            idPost = comments[0].postId
        }
        const isRender = idPost === post.id
        const renderInfo =  isRender ? renderComments : null
        
        const classesInput = ['user-posts__input']
        const classesText = []

        const isOpen = isModalEdit === post.id

        if(isOpen) {
            classesInput.push("active--input")
            classesText.push(" text-close")
        }

        return (
            <li className="user-posts__item"
            key={post.id}
            >
                <div className="user-posts__main">
                    <div className="user-posts__info">
                        <div className="user-posts__content">
                        {!isOpen && (<h5 className={classesText.join(" ").concat("user-posts__title")}>{post.title}</h5>)}
                        <textarea 
                        type="text"
                        value={(editItem && editItem.title) ? (editItem && editItem.title) : editValue.title ? editValue.title   : "" }
                        name='title'
                        data-type="edd"
                        maxLength="140"
                        onChange={(e)=> {
                            handleChange(e, post.id)
                        }}
                        className={classesInput.join(" ").concat(" user-posts__area--title")}
                        />
                        {!isOpen && (<p  className="user-posts__text">{post.body}</p>)}
                        <textarea
                            type="text"
                            value={(editItem && editItem.body) ? (editItem && editItem.body) : editValue.body ? editValue.body   : "" }
                            name='body'
                            data-type="edd"
                            maxLength="500"
                            onChange={(e)=> {
                                handleChange(e, post.id)
                            }}
                            className={classesInput.join(" ").concat(" user-posts__area")}
                        />
                        </div>
                        <div className="user-posts__wrapper-button">
                            {isOpen && (<div className="button-block">
                                <ButtonItem
                                type="send"
                                onClick={
                                    ()=>{
                                        editPost(post.id, editValue)
                                        setEditValue({})
                                    }}
                                text={editItem != undefined ? 'Send...' : 'Send'}
                                />
                                <ButtonItem
                                type="cancel"
                                onClick={()=> setIsModalEdit()}
                                text='Сancel'
                                />
                            </div>)}
                            {!isOpen && (
                                <ButtonItem
                                type="edit"
                                onClick={()=>{
                                        setEditValue({
                                            id: post.id,
                                            userId: person.id,
                                            title: post.title,
                                            body: post.body
                                        })
                                        setIsModalEdit(post.id)}}
                                text='edit'
                                />
                            )}
                            <ButtonItem
                                type="delete"
                                onClick={()=>deletePost(post.id)}
                                text={isDelete ? "Delete..." : "Delete"}
                                />
                        </div>
                    </div>
                    <div className="user-posts__comments-wrapper">
                        <TransitionGroup>
                            {!isRender && 
                                (<CSSTransition
                                timeout={300}
                                classNames="user-posts__button-animation"
                                >
                                <ButtonItem
                                type="comments"
                                onClick={()=>{getPostComments(post.id)}}
                                text='Comments'
                                />
                                </CSSTransition>)}
                        </TransitionGroup>
                        <div className="user-posts__comments-block">
                            {isRender && (<h3>Comments:</h3>)}
                            { isSearch ? <Spinner /> : (
                                <ul className="user-posts__comments comments__list">
                                    <TransitionGroup>
                                        {renderInfo}
                                    </TransitionGroup>
                                </ul>
                            )}
                        </div>
                        
                    </div>
                </div>
            </li>
        )
    })

    return(
        <div className="user-posts__container">
            <div className="person__container">
                <h1 className="person__title"><span>Profile: </span>{person.name}</h1>
                <h2 className="person__subtitle"><span>Username: </span>{person.username}</h2>
                <h3 className="person__email"><span>Email: </span>{person.email}</h3>
                <button
                className={!isModalAdd ? "person__button" : "person__button--close"}
                onClick={()=> setIsModalAdd(!isModalAdd)}>New Post</button>
            </div>
                <CSSTransition
                timeout={300}
                classNames="user-posts__content form__wrapper form"
                in={isModalAdd}
                unmountOnExit
                >
                <div>
                    <div className="form__content">
                    <h3 className="form__title">New post:</h3>
                    <label>
                        <span>Title:</span>
                        <textarea
                        type="text"
                        value={value.title || ""}
                        name='title'
                        data-type="add"
                        className="form__area user-posts__area--title"
                        maxLength="140"
                        onChange={(e)=> {
                            handleChange(e)
                        }}
                        />
                    </label>
                    <label>
                        <span>Text:</span>
                        <textarea
                        type="text"
                        value={value.body || ""}
                        name='body'
                        data-type="add"
                        maxLength="500"
                        className="form__area user-posts__area form__area--b"
                        onChange={(e)=> {
                            handleChange(e)
                        }}
                        />
                    </label>
                </div>
                <ButtonItem
                disabled={addPostLoading}
                                type="send"
                                onClick={()=>addPost(value)}
                                text='Send'
                                />
            </div>
                </CSSTransition>
            {posts.length === 0 ? <Spinner/> : 
            (
            <>
            <h3 className="person__posts-title">Posts:</h3>
            <ul className="user-posts__list">
                {renderPosts}
            </ul>
            </>
            )}
        </div>

    )
}


const mapStateToProps = state => ({
    userPosts: state.users.userPosts,
    users: state.users.users,
    loading: state.users.loading,
    error: state.users.error,
    loadingComments: state.users.loadingComments,
    comments: state.users.postComments,
    addPostLoading: state.users.addPostLoading,
    editPostLoading: state.users.editPostLoading,
    postsDelete: state.users.postsDelete
})




export default connect(mapStateToProps, actions)(UserPageContainer);

