import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <div className="box">
                <div className="container-1">
                    <span className="icon"><i className="fa fa-search"></i></span>
                    <input type="search" id="search" placeholder="Пошук..." value={SearchTerms}
                           onChange={onChangeSearch}/>
                </div>
            </div>
        </div>
    )
}

export default SearchFeature
