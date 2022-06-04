import React from 'react';
import {Container, Row} from "react-bootstrap";
import {useQuery} from "react-query";
import ReviewItem from "./ReviewItem";
import SectionHeader from "../Common/SectionHeader";
import Loading from "../Common/Loading/Loading";

const Reviews = () => {
    const {data: reviews, isLoading, isError} = useQuery('reviews', () => {
        return fetch('https://peaceful-castle-36366.herokuapp.com/reviews?limit=3')
            .then(res => res.json())
    });

    if(isLoading) return <Loading/>

    return (
        <section className="testimonial-section section-bg py-80">
            <Container>
                <SectionHeader badge={'Best Reviews'} title={'Customer Reviews'}/>
                <div className="review-items">
                    <Row>
                        {
                            reviews.map(review => <ReviewItem key={review._id} review={review}/>)
                        }
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default Reviews;