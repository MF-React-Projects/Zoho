import React from 'react';
import {Container, Row} from "react-bootstrap";
import SectionHeader from "../Common/SectionHeader";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import Blog from "./Blog";
import Loading from "../Common/Loading/Loading";

const Blogs = () => {
    const navigate = useNavigate();
    const {data: blogs, isLoading} = useQuery('blogs', () => fetch('http://localhost:5000/blogs?limit=3').then(res => res.json()));
    if(isLoading) return <Loading/>

    return (
        <section className="home-blog-section section-bg py-80">
            <Container>
                <SectionHeader badge={'News Feeds'} title={'Latest News'}/>
                <Row className='mb-5'>
                    {
                        blogs.map(blog => <Blog key={blog._id} blog={blog}/>)
                    }
                </Row>
            </Container>
        </section>
    );
};

export default Blogs;