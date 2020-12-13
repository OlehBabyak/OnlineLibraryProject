import React, {useEffect, useState} from 'react'
import {Typography, Popover, Row} from 'antd';
import axios from 'axios';
import './favorite.css';
import {useSelector} from 'react-redux';

const {Title} = Typography;

function FavoritePage() {
    const user = useSelector(state => state.user)

    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = {userFrom: localStorage.getItem('userId')}

    useEffect(() => {
        fetchFavoredBook()
    }, [])

    const fetchFavoredBook = () => {
        axios.post('/api/favorite/getFavoredBook', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                    setLoading(false)
                } else {
                    alert('При звантаженні збережених книг сталась помилка')
                }
            })
    }

    const onClickDelete = (bookId, userFrom) => {

        const variables = {
            bookId: bookId,
            userFrom: userFrom,
        }

        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredBook()
                } else {
                    alert('Помилка при видалені книги')
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {

        return <tr key={index}>
            <td>
                <div style={{width: "320px"}}>
                    <img className="img" src={favorite.images[0].replace('client\\public', "")} alt=""/>
                </div>
            </td>
            <td style={{fontSize:"16px", color:"#fff", textAlign:"center"}}>{favorite.bookTitle}</td>
            <td>
                <button style={{display: "inline-block",
                    backgroundColor:"rgb(44, 46, 56)",
                    color: "white",
                    fontWeight: "700",
                    textDecoration: "none",
                    userSelect: "none",
                    padding: ".5em 2em",
                    outline: "none",
                    border: "0.5px solid",
                    borderRadius: "15px",
                    transition: "0.2s",
                    cursor:"pointer"}} onClick={() => onClickDelete(favorite.bookId, favorite.userFrom)}> Видалити</button>
            </td>
        </tr>
    })

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Title style={{color: "#fff"}} level={2}> Збережені книги </Title>
            <hr/>
            <br/>
            {user.userData && !user.userData.isAuth ?
                <div style={{
                    width: '100%',
                    fontSize: '2rem',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p>Будь ласка авторизуйтесь в ваш акаунт</p>
                    <a href="/login">Авторизуватись</a>
                </div>
                :
                !Loading &&
                <table>
                    <thead>
                    <tr>
                        <th>Зображення</th>
                        <th>Назва книги</th>
                        <th>Видалити із улюбленого</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderCards}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default FavoritePage
