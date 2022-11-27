import React,{useEffect, useState} from 'react';
import PostsListComponent from './PostsListComponent';
import Pagination from '@mui/material/Pagination';
import Post from '../models/Post';

function PaginatedPostsComponent(props :{posts: Post[]}) {
    const itemsPerPage = 5;

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = props.posts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(props.posts.length / itemsPerPage) - 1;

    useEffect(() => {
        setItemOffset(0);
    }, [props.posts]);

    //Invoke when user click to request another page.
    const handlePageClick = (event : React.ChangeEvent<unknown>, value : number) => {
        const newOffset = (value * itemsPerPage);
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className='posts'>
                <PostsListComponent posts = {currentItems}/>
            </div>
            <div className='pagination'>
                <Pagination count={pageCount} onChange={handlePageClick}/>
            </div>
            
        </>
    );
}
export default PaginatedPostsComponent;