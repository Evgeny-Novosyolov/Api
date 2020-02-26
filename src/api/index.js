export default class SwapiService {

    _apiBase = 'https://jsonplaceholder.typicode.com/'
    _postsBase = 'posts'
    _usersBase = 'users'
    _postComments = 'comments'
    _methodDelet = {
        method: 'DELETE'
    }

    _addPost(data){
        return {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
    }

    _editPost(data){
        return {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
    }
    

    getResource = async (url, method) =>{
        try {
            const response = await fetch(`${this._apiBase}${url}`,  method )
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
            } 
            if(data){
                return await data
            }
        } catch(err){
            throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
        }
        
    }

    getAllUsers = async () => {
        const res = await this.getResource(this._usersBase);
        return res
    };

    getAllPosts = async () => {
        const res = await this.getResource(this._postsBase);
        return res
    };
    
    getUser = async (id) => {
        const user = await this.getResource(`${this._postsBase}?userId=${id}`);
        return user;
    };

    getPostComments = async (id) => {
        const postComments = await this.getResource(`${this._postsBase}/${id}/${this._postComments}`);
        return postComments;
    };

    deletePost = async (id) => {
        const res = await this.getResource(`${this._postsBase}/${id}`, this._methodDelet)
        return res
    }

    addPost = async (data) =>{
        const res = await this.getResource(this._postsBase, this._addPost(data))
        return res
    }

    editPost = async (id,data) =>{
        const res = await this.getResource(`${this._postsBase}/${id}`, this._editPost(data))
        return res
    }

}
