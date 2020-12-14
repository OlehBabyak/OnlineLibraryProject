import React, {useEffect, useState} from 'react'
import { Descriptions } from 'antd';
import Axios from "axios";

function BookInfo(props) {

    const { book } = props;

    const [Author, setAuthor] = useState("")

    useEffect(() => {
        const variables = {
           author: book.author
        }
        getAuthor(variables)
    }, [])

    const getAuthor = (variables) => {
        Axios.post('/api/authors/getAuthorById', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setAuthor([...Author, ...response.data.author])
                    } else {
                        setAuthor(response.data.author)
                    }
                } else {
                    alert('Помилка при завантаженні авторів')
                }
            })
    }

    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };

    const release = new Date(book.releaseDate).toLocaleDateString("ru", options);

    return (
        <table>
            <thead>
            <tr>
                <th style={{fontSize:"16px", color:"#fff", textAlign:"center", borderRight:"none"}}>Автор книги</th>
                <th style={{fontSize:"16px", color:"#fff", textAlign:"center", borderRight:"none"}}>Жанр книги</th>
                <th style={{fontSize:"16px", color:"#fff", textAlign:"center", borderRight:"none"}}>Дата публікації</th>
                <th style={{fontSize:"16px", color:"#fff", textAlign:"center", borderRight:"none"}}>Кількість сторінок</th>
            </tr>
            </thead>
            <tbody>
            <tr key={book._id}>
                <td style={{fontSize:"16px", color:"#fff", textAlign:"center"}}>{Author.name}</td>
                <td style={{fontSize:"16px", color:"#fff", textAlign:"center"}}>{book.genre}</td>
                <td style={{fontSize:"16px", color:"#fff", textAlign:"center"}}>{release}</td>
                <td style={{fontSize:"16px", color:"#fff", textAlign:"center"}}>{book.pages}</td>
            </tr>
            </tbody>
        </table>
    )
}

export default BookInfo
