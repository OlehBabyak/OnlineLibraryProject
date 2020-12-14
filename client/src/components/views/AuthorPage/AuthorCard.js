import React from 'react'
import {Col} from 'antd';

function AuthorCard({authorName, image, authorId, birth, death}) {

    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };

    const newBirth = new Date(birth).toLocaleDateString("ru", options);
    const newDeath = new Date(death).toLocaleDateString("ru", options);

    if (authorName) {
        return (
            <Col key={authorId} lg={6} md={8} xs={24}>
                <div style={{position: 'relative'}}>
                    <div style={{display: "flex", flexWrap: "wrap", textAlign: "center"}}>
                        <div style={{margin: "1rem", width: "350px", backgroundColor: "#2c2e38"}}>
                                <img style={{width: '100%', height: '450px', textAlign: "center"}} alt={authorName}
                                     src={image}/>
                            <h3 style={{color: "#fff", textAlign: "center", marginTop: "10px", marginBottom: "10px", fontSize:"18px"}}>{authorName}</h3>
                            <h4 style={{color: "#fff", textAlign: "center", marginBottom: "10px", fontSize:"16px"}}>{newBirth} — {newDeath}</h4>
                        </div>
                    </div>
                </div>
            </Col>
        )
    }
}

export default AuthorCard
