import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

function MainImage(props) {
    return (
        <div
            style={{
                background:
                    `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url('https://www.detroitlabs.com/wp-content/uploads/2018/02/alfons-morales-YLSwjSy7stw-unsplash.jpg'), #1c1c1c`,
                height: '500px',
                backgroundSize: '100%, cover',
                backgroundPosition: 'center, center',
                width: '100%',
                position: 'relative'
            }}
        >
            <div>
                <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }} >
                    <Title style={{ color: 'white' }} level={2} > Online Library </Title>
                    <p style={{ color: 'white', fontSize: '1.1rem' }} > Лабораторна робота з предмету Теорія алгоритмів.</p>
                    <p style={{ color: 'white', fontSize: '1.1rem' }}>Виконали студенти групи СТ:</p>
                    <p style={{ color: 'white', fontSize: '1.1rem' }}>Баб'як Олег, Ільтьо Валентин, Гранич Домініка, Капітан Ольга.</p>
                </div>
            </div>
        </div>
    )
}

export default MainImage
