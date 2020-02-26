import React, {Component, useEffect} from 'react'
import { connect } from 'react-redux';
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import UsersItem from '../users-item'
import actions from '../../actions';
import './users-list.scss'

class UserListContainer extends Component {

    componentDidMount() {
        this.props.getAllUsers();
        
       
    
    }
    
    render() {
        const { users, loading, error, getUserPosts } = this.props;
        if (loading) {
            return <Spinner />;
        }
    
        if (error) {
            return <ErrorIndicator />;
        }
    
        return <UsersList 
                users={users} 
                getUserPosts={getUserPosts}
                />;
        }
    }


const UsersList = ({users = [],getUserPosts}) => {
    return (
        <ul className="users__list">
            {
                users.map((user) => {
                return (
                    <li 
                    className="users__item"
                    key={user.id}>
                    <UsersItem
                        user={user}
                        getUser={() => getUserPosts(user.id)}/>
                    </li>
                );
                })
            }
            </ul>
    );
}

const mapStateToProps = state => ({
    users: state.users.users,
    loading: state.users.loading,
    error: state.users.error
})




export default connect(mapStateToProps, actions)(UserListContainer);