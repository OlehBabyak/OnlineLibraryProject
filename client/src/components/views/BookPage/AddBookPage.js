import React, {useEffect, useState} from 'react'
import {Typography, Button, Form, message, Input, Row} from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function AddBookPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [AuthorValue, setAuthorValue] = useState(1)
    const [GenreValue, setGenreValue] = useState("")
    const [PagesValue, setPagesValue] = useState(0)
    const [ReleaseValue, setReleaseValue] = useState("")

    const [Authors, setAuthors] = useState([])


    const [Images, setImages] = useState([])

    useEffect(() => {
        const endpoint = "/api/authors/getAuthors";
        getAuthors(endpoint)
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

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onAuthorChange = (event) => {
        setAuthorValue(event.currentTarget.value)
    }

    const onGenreChange = (event) => {
        setGenreValue(event.currentTarget.value)
    }

    const onPagesChange = (event) => {
        setPagesValue(event.currentTarget.value)
    }

    const onReleaseChange = (event) => {
        setReleaseValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !AuthorValue || !GenreValue || !PagesValue || !ReleaseValue || !Images) {
            return alert('Заповніть всі поля!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            author: AuthorValue,
            genre: GenreValue,
            releaseDate: ReleaseValue,
            pages: PagesValue,
            images: Images,
        }

        Axios.post('/api/addBook/saveBook', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Книга збережена у базі даних')
                    props.history.push('/')
                } else {
                    alert('Помилка при додавані книги')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} style={{color:"#fff"}}> Додати нову книгу</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label style={{color:"#fff", fontSize:"20px"}}>Назва книги</label>
                <br/>
                <Input style={{outline: "none",
                    borderRadius: "50px",
                    border: "1px solid #fff",
                    background: "#1b1c22",
                    padding: "10px 16px",
                    width: "600px",
                    color: "#fff",
                    fontSize: "18px"}}
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br/>
                <label style={{color:"#fff", fontSize:"20px"}}>Автор книги</label>

                <select style={{outline: "none",
                    borderRadius: "30px",
                    border: "1px solid #fff",
                    background: "#1b1c22",
                    padding: "10px 16px",
                    width: "600px",
                    color: "#fff",fontSize: "18px", overflow: "hidden",
                    mozAppearance: "none",
                    appearance: "none",
                    cursor:"pointer"}} onChange={onAuthorChange} value={AuthorValue}>
                    {Authors && Authors.map((author, index) => (
                        <option style={{cursor:"pointer"}} key={author._id} value={author._id}>{author.name} </option>
                    ))}
                </select>

                <br />
                <br/>
                <label style={{color:"#fff", fontSize:"20px"}}>Короткий опис</label>
                <TextArea style={{outline: "none",
                    borderRadius: "30px",
                    border: "1px solid #fff",
                    background: "#1b1c22",
                    padding: "10px 16px",
                    width: "600px",
                    color: "#fff",fontSize: "18px", overflow: "hidden"}}
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br/>
                <br />
                <label style={{color:"#fff", fontSize:"20px"}}>Жанр</label>
                <br/>
                <Input style={{outline: "none",
                    borderRadius: "50px",
                    border: "1px solid #fff",
                    background: "#1b1c22",
                    padding: "10px 16px",
                    width: "600px",
                    color: "#fff",
                    fontSize: "18px"}}
                       onChange={onGenreChange}
                       value={GenreValue}
                />
                <br/>
                <br />
                <label style={{color:"#fff", fontSize:"20px"}}>Кількість сторінок</label>
                <Input style={{outline: "none",
                    borderRadius: "50px",
                    border: "1px solid #fff",
                    background: "#1b1c22",
                    padding: "10px 16px",
                    width: "600px",
                    color: "#fff",
                    fontSize: "18px"}}
                       onChange={onPagesChange}
                       value={PagesValue}
                />
                <br/>
                <br />
                <label style={{color:"#fff", fontSize:"20px"}}>Дата випуску</label>
                <input style={{outline: "none",
                    borderRadius: "50px",
                    border: "1px solid #fff",
                    background: "#1b1c22",
                    padding: "10px 16px",
                    width: "600px",
                    color: "#fff", fontSize: "18px"}} type="date"
                onChange={onReleaseChange}
                value={ReleaseValue}
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
                    Додати книгу
                </Button>

            </Form>

        </div>
    )
}

export default AddBookPage
