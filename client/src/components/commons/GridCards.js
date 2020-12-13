import React from 'react'
import {Col} from 'antd';
import LikeDislikes from "../views/MovieDetail/Sections/LikeDislikes";

function GridCards(props) {

    let {bookId, title, description, author, genre, releaseDate, pages, image} = props

    if (title) {
        return (
            <Col key={bookId} lg={6} md={8} xs={24}>
                <div style={{position: 'relative'}}>
                    <div style={{display: "flex", flexWrap: "wrap", textAlign: "center"}}>
                        <div style={{margin: "1rem", width: "320px", backgroundColor: "#2c2e38"}}>
                            <a href={`/book/${bookId}`}>
                                <img style={{width: '100%', height: '450px'}} alt={title} src={image}/>
                                <h3 style={{color: "#fff", marginTop: "10px", marginBottom: "10px", fontSize:"18px"}}>{title}</h3>
                            </a>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: "10px",
                                color: "#fff"
                            }}>
                                <LikeDislikes book bookId={bookId} userId={localStorage.getItem('userId')}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        )
    }
}

export default GridCards
