import React, { useEffect, useState } from 'react'
import { Row, Button } from 'antd';
import axios from 'axios';

import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import BookImage from './Sections/BookImage';
import BookInfo from './Sections/BookInfo';
import Favorite from './Sections/Favorite';
import Axios from "axios";

function BookDetailPage(props) {

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
                </div>


                {/* Book Info */}
                {!LoadingForBook ?
                    <BookInfo book={Book} />
                    :
                    <div>Завантаження...</div>
                }

                <br />

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

