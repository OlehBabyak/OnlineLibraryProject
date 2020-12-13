import React, { useState } from 'react'
import { Button, Input, Typography, } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;
const { Title } = Typography;

function Comments(props) {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('Буд ласка авторизуйтесь');
        }

        const variables = {
            content: Comment,
            writer: user.userData._id,
            bookId: props.bookId
        }
        console.log(variables)

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Помилка при збережені коментаря')
                }
            })
    }

    return (
        <div>
            <br />
            <Title level={3} > Поділіться своїми враженнями про "{props.bookTitle}" </Title>
            <hr />
            {/* Comment Lists  */}
            {console.log(props.CommentLists)}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} bookId={props.bookId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} bookId={props.bookId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px'}} >
                    Стань першим, хто напише відгук про цю книгу!!!
                </div>
            }

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Введіть текст!"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Додати</Button>
            </form>

        </div>
    )
}

export default Comments
