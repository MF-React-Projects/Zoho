import React from 'react';
import {Col} from "react-bootstrap";
import Rating from "react-rating";
import {FaStar} from "@react-icons/all-files/fa/FaStar";

const ReviewItem = ({review}) => {
    const {name, comment, stars, avatar} = review;
    const updatedComment = comment.slice(0, 200) + '...';

    return (
        <Col lg={4} className={'mb-4'}>
            <div className="review-item h-100">
                <div className="review-header">
                    <div className="review-avatar">
                        <img src={avatar} alt="avatar" className='img-fluid'/>
                    </div>
                    <div className="review-info">
                        <p className="name">{name}</p>
                        <Rating
                            initialRating={parseInt(stars)}
                            emptySymbol={<FaStar/>}
                            fullSymbol={<FaStar style={{color: 'goldenrod'}}/>}
                            readonly
                        />
                    </div>
                </div>
                <p className="feedback-text">{updatedComment}</p>
            </div>
        </Col>
    );
};

export default ReviewItem;