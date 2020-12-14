import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
import './comment.css'
const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            bookId: props.bookId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Помилка при збережені коментаря')
                }
            })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span style={{color:"#fff", fontSize:"14px"}} onClick={openReply} key="comment-basic-reply-to">Відповісти </span>
    ]

    return (
        <div>
            <Comment style={{color:"#fff", fontSize:"16px"}}
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p style={{fontSize:"16px", color:"#fff"}}>
                        {props.comment.content}
                    </p>
                }
            ></Comment>


            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px',height: "48px",
                            background: "rgb(44, 46, 56)",
                            fontSize: "16px",
                            float: "left",
                            color: "#fff",
                            paddingTop: "10px",
                            paddingLeft:"25px",
                            webkitBorderRadius: "5px",
                            mozBorderRadius: "5px", }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="Введіть текст!"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '48px', display: "inline-block",
                        backgroundColor:"rgb(44, 46, 56)",
                        color: "white",
                        fontWeight: "700",
                        textDecoration: "none",
                        userSelect: "none",
                        padding: "-0.5em 2em",
                        outline: "none",
                        border: "0.5px solid",
                        transition: "0.2s",
                        cursor:"pointer" }} onClick={onSubmit}>Додати</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment
