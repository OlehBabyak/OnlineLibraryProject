import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

function Favorite(props) {
    const user = useSelector(state => state.user)

    const bookId = props.bookId
    const userFrom = props.userFrom
    const bookTitle = props.bookInfo.title
    const images = props.bookInfo.images

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const variables = {
        bookId: bookId,
        userFrom: userFrom,
        bookTitle: bookTitle,
        images: images,
    }

    const onClickFavorite = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Будь ласка авторизуйтесь');
        }

        if (Favorited) {
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Помилка при видалені книги')
                    }
                })

        } else {

            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Помилка при додавані книги')
                    }
                })
        }
    }

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.subscribeNumber)
                } else {
                    alert('Помилка при завантаженні підписок')
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.subcribed)
                } else {
                    alert('Помилка')
                }
            })

    }, [])


    return (
        <>
            <Button style={{display: "inline-block",
                backgroundColor:"rgb(44, 46, 56)",
                color: "white",
                fontWeight: "700",
                textDecoration: "none",
                userSelect: "none",
                padding: "-0.5em 2em",
                outline: "none",
                border: "0.5px solid",
                borderRadius: "15px",
                transition: "0.2s",
                cursor:"pointer"}} onClick={onClickFavorite} > {!Favorited ? "Зберегти книгу" : "Видалити з улюблених"} ( {FavoriteNumber} )</Button>
        </>
    )
}

export default Favorite

