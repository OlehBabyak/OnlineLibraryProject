import React from 'react'
import { Descriptions } from 'antd';

function BookInfo(props) {

    const { book } = props;

    return (
        <Descriptions style={{color:"#fff"}} title="Інформація про книгу" bordered>
        <Descriptions.Item label="Автор">{book.author}</Descriptions.Item>
        <Descriptions.Item label="Жанр">{book.genre}</Descriptions.Item>
        <Descriptions.Item label="Дата публікації">{book.releaseDate}</Descriptions.Item>
        <Descriptions.Item label="Кількість сторінок">{book.pages}</Descriptions.Item>
      </Descriptions>
    )
}

export default BookInfo
