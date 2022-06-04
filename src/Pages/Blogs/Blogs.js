import React from 'react';
import {Container, Row} from "react-bootstrap";
import SectionHeader from "../Common/SectionHeader";
import Blog from "../Home/Blog";
import {useQuery} from "react-query";
import Loading from "../Common/Loading/Loading";

const Blogs = () => {
    const {data: blogs, isLoading} = useQuery('blogs', () => fetch('https://peaceful-castle-36366.herokuapp.com/blogs').then(res => res.json()));
    if(isLoading) return <Loading/>

    return (
        <div className='blog-section py-80'>
            <Container>
                <SectionHeader badge={'News Feeds'} title={'Latest News'}/>
                <Row className='mb-3'>
                    {
                        blogs.map(blog => <Blog key={blog._id} blog={blog}/>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Blogs;