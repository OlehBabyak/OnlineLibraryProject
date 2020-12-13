import React, { useEffect, useState, useRef } from 'react'
import {Typography, Row} from 'antd';
import AuthorCard from '../AuthorPage/AuthorCard'
import {useSelector} from "react-redux";
import Axios from "axios";
const { Title } = Typography;

function AuthorPage() {
    const user = useSelector(state => state.user)

    const [Authors, setAuthors] = useState([])
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        const endpoint = "/api/authors/getAuthors";
        getAuthors(endpoint)
        setLoading(false)
    }, [])

    const getAuthors = (variables) => {
        Axios.post('/api/authors/getAuthors', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setAuthors([...Authors, ...response.data.authors])
                    } else {
                        setAuthors(response.data.authors)
                    }
                } else {
                    alert('Помилка при завантаженні авторів')
                }
            })
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={2} style={{color:"#fff"}} > Автори </Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {Authors && Authors.map((author, index) => (
                        <React.Fragment key={index}>
                            <AuthorCard
                                image={author.images[0].replace('client\\public',"")}
                                authorId={author._id}
                                authorName={author.name}
                                birth={author.birthDate}
                                death={author.deathDate}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                <div style={{color: "#fff"}}>Завантаження...</div>}

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                </div>
            </div>

        </div>
    )
}

export default AuthorPage
