import React, { useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function AddAuthorPage(props) {

    const [NameValue, setNameValue] = useState("")
    const [BirthValue, setBirthValue] = useState("")
    const [DeathValue, setDeathValue] = useState("")

    const [Images, setImages] = useState([])


    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value)
    }

    const onBirthChange = (event) => {
        setBirthValue(event.currentTarget.value)
    }

    const onDeathChange = (event) => {
        setDeathValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!NameValue || !BirthValue || !Images) {
            return alert('Заповніть всі поля!')
        }

        const variables = {
            writer: props.user.userData._id,
            name: NameValue,
            birthDate: BirthValue,
            deathDate: DeathValue,
            images: Images,
        }

        Axios.post('/api/addAuthor/saveAuthor', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Автор збережений у базі даних')
                    props.history.push('/')
                } else {
                    alert('Помилка при додавані автора')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} style={{color:"#fff"}}> Додати нового автора</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label style={{color:"#fff", fontSize:"20px"}}>ПІБ автора</label>
                <br/>
                <Input style={{outline: "none",
                    borderRadius: "50px",
                    border: "1px solid #fff",
                    background: "#1b1c22",
                    padding: "10px 16px",
                    width: "600px",
                    color: "#fff",
                    fontSize: "18px"}}
                    onChange={onNameChange}
                    value={NameValue}
                />
                <br />
                <br/>
                <label style={{color:"#fff", fontSize:"20px"}}>Дата народження</label>
                <input style={{outline: "none",
                    borderRadius: "50px",
                    border: "1px solid #fff",
                    background: "#1b1c22",
                    padding: "10px 16px",
                    width: "600px",
                    color: "#fff", fontSize: "18px"}} type="date"
                onChange={onBirthChange}
                value={BirthValue}
                />
                <br/>
                <br/>
                <label style={{color:"#fff", fontSize:"20px"}}>Дата смерті</label>
                <br/>
                <input type="date" style={{outline: "none",
                    borderRadius: "50px",
                    border: "1px solid #fff",
                    background: "#1b1c22",
                    padding: "10px 16px",
                    width: "600px",
                    color: "#fff", fontSize: "18px"}}
                       onChange={onDeathChange}
                       value={DeathValue}
                />

                <br/><br/>
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
                    cursor:"pointer",}}
                    onClick={onSubmit}
                >
                    Додати автора
                </Button>

            </Form>

        </div>
    )
}

export default AddAuthorPage
