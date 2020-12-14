import React, { useEffect, useState } from 'react'
import { Row, Button, Typography } from 'antd';
import axios from 'axios';

import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import BookImage from './Sections/BookImage';
import BookInfo from './Sections/BookInfo';
import Favorite from './Sections/Favorite';
import Axios from "axios";
import {useSelector} from "react-redux";

const { Title } = Typography;

function BookDetailPage(props) {
    const user = useSelector(state => state.user)

    const bookId = props.match.params.bookId
    const [Book, setBook] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForBook, setLoadingForBook] = useState(true)
    const bookVariable = {
        bookId: bookId
    }

    useEffect(() => {
        Axios.get(`/api/books/bookById?id=${bookId}&type=single`)
            .then(response => {
                setBook(response.data[0])
                setLoadingForBook(false)
            })

    }, [])

    useEffect(() => {
        axios.post("/api/comment/getComments", bookVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('Помилка при заванатаженні коментарів')
                }
            })

    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    const onClickDelete = (bookId) => {

        const variables = {
            bookId: bookId,
        }

        axios.post('/api/books/removeBook', variables)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/");
                } else {
                    alert('Помилка при видалені книги')
                }
            })
    }

    return (
        <div>
            {/* Header */}
            {!LoadingForBook ?
                <BookImage
                    image={Book.images[0].replace('client\\public',"")}
                    title={Book.title}
                    description={Book.description}
                />
                :
                <div>Завантаження...</div>
            }


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite bookInfo={Book} bookId={bookId} userFrom={localStorage.getItem('userId')} />
                    {user.userData && user.userData.isAuth ?
                        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                            <a href={`/editBook/${bookId}`} style={{display: "inline-block",
                                backgroundColor:"blue",
                                color: "white",
                                fontWeight: "700",
                                textDecoration: "none",
                                userSelect: "none",
                                padding: "0.5em 2em",
                                outline: "none",
                                border: "0.5px solid",
                                borderRadius: "15px",
                                transition: "0.2s",
                                cursor:"pointer", marginLeft:"50px", marginRight:"10px"}}>Редагувати інформацію
                            </a>
                            <a style={{display: "inline-block",
                                backgroundColor:"red",
                                color: "white",
                                fontWeight: "700",
                                textDecoration: "none",
                                userSelect: "none",
                                padding: "0.5em 2em",
                                outline: "none",
                                border: "0.5px solid",
                                borderRadius: "15px",
                                transition: "0.2s",
                                cursor:"pointer"}} onClick={() => onClickDelete(bookId)}>Видалити
                            </a>
                        </div>
                        :
                        <div></div>
                    }
                </div>

                <br/>
                <Title level={2} style={{color:"#fff"}} > Інформація про книгу "{Book.title}" </Title>
                {/* Book Info */}
                {!LoadingForBook ?
                    <BookInfo book={Book}/>
                    :
                    <div>Завантаження...</div>
                }

                <br />
                <br/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes book bookId={bookId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments bookTitle={Book.title} CommentLists={CommentLists} bookId={bookId} refreshFunction={updateComment} />

            </div>

        </div>
    )
}

export default BookDetailPage

