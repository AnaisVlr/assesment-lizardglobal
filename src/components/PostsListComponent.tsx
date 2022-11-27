import React from 'react';
import Post from '../models/Post';
import PostComponent from './PostComponent';

function PostsListComponent(props :{posts: Post[]}) {
    //We get the posts and display them one by one
    const postList = props.posts.map((post) => (
        <PostComponent key={post.id} post={post}/>
    ));

    return(
        <div className='list-of-post'>{postList}</div>
    );
}

export default PostsListComponent;