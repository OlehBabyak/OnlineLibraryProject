import React from 'react'
import { SmileOutlined } from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p style={{color: "#cb6ad2"}}> Розроблено студентом Баб'яком Олегом  <SmileOutlined  type="smile" /></p>
        </div>
    )
}

export default Footer
