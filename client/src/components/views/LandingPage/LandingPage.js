import React, { useEffect, useState } from 'react'
import {Typography, Row, Col} from 'antd';
import MainImage from './Sections/MainImage'
import GridCard from '../../commons/GridCards'
import SearchFeature from "./Sections/SearchFeature"
import CheckBox from "./Sections/CheckBox"
import {useSelector} from "react-redux";
import Axios from "axios";

const { Title } = Typography;


function LandingPage() {
    const user = useSelector(state => state.user)

    const [Books, setBooks] = useState([])
    const [Authors, setAuthors] = useState([])
    const [Loading, setLoading] = useState(true)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [Filters, setFilters] = useState({
        authors: [],
    })

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        }
        fetchBooks(variables)
        setLoading(false)
    }, [])

    useEffect(() => {
        const endpoint = "/api/authors/getAuthors";
        getAuthors(endpoint)
        setLoading(false)
    }, [])


    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }

        fetchBooks(variables)
        setSkip(skip)
    }

    const fetchBooks = (variables) => {
        Axios.post('/api/books/getBooks', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setBooks([...Books, ...response.data.books])
                    } else {
                        setBooks(response.data.books)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Помилка при завантаженні книг')
                }
            })
    }

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


    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        fetchBooks(variables)
        setSkip(0)

    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        fetchBooks(variables)
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
                <MainImage
                    image="https://www.detroitlabs.com/wp-content/uploads/2018/02/alfons-morales-YLSwjSy7stw-unsplash.jpg"
                />

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Row gutter={[16, 16]}>
                    <Col lg={12} xs={24} >
                        <CheckBox
                            list={Authors}
                            handleFilters={filters => handleFilters(filters, "author")}
                        />
                    </Col>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '5px auto' }}>

                        <SearchFeature
                            refreshFunction={updateSearchTerms}
                        />

                    </div>
                </Row>

                <Title level={2} style={{color:"#fff"}} > Останні новинки </Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {Books && Books.map((book, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={book.images[0].replace('client\\public',"")}
                                bookId={book._id}
                                title={book.title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                    <div>Завантаження...</div>}

                <br />
                {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                        cursor:"pointer"}} className="loadMore" onClick={onLoadMore}>Показати ще</button>
                </div>
                }
            </div>
        </div>
    )
}

export default LandingPage
