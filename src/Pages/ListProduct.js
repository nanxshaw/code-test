import React, { useState, useEffect } from 'react';
import { FILTER_PRODUCT, UPDATE_PRODUCT } from '../Redux/Actions/actions';
import ReactStars from "react-rating-stars-component";
import { List, Image, Row, Col, Divider, Button, Space, Select } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import prod from '../Json/product.json';
import DocumentMeta from 'react-document-meta';

//format int to currency rupiah
function currencyFormat(num) {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

//cek date per week
function check_date(date) {
    var now = moment();
    var input = moment(date);
    var isThisWeek = (now.isoWeek() == input.isoWeek())
    return isThisWeek;
}

function ListProduct() {
    //initial state
    const [product, setProduct] = useState([]);
    const [cache, setCache] = useState(0);
    //dispatch redux
    const dispatch = useDispatch();
    //get state reducers
    const products = useSelector((state) => state.product);
    const data_products = useSelector((state) => state.data_product);
    //meta data
    const meta = {
        title: 'Code Test',
        description: 'Coding Test',
        meta: {
            charset: 'utf-8',
            name: {
                keywords: 'react,meta,document,html,tags'
            }
        }
    };

    useEffect(() => {
        //update product
        dispatch(UPDATE_PRODUCT(product))
        setProduct(data_products)

    });

    //filter ASC or DESC
    function filterProduct(type) {
        if (type === 'desc') {
            const prods = products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            setProduct(prods)
        } else {
            const prods = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            setProduct(prods)
        }
        setCache(cache + 1)
    }

    //filter rating lebih dari 1 / 2 / 3 / 4 / 5
    function filterRating(item) {
        const arr = [];
        for (let i = 0; i < prod.length; i++) {
            if (prod[i].rating.rate > item)
                arr.push(prod[i]);
        }
        setProduct(arr)
    }

    return (
        <DocumentMeta {...meta}>
            <div style={{ padding: 10 }}>
                <Space wrap>
                    <Button className='btn' type="primary" onClick={() => filterProduct('asc')} >Filter by Price (A-Z)</Button>
                    <Button className='btn' type="primary" onClick={() => filterProduct('desc')} >Filter by Price (Z-A)</Button>
                    <Select
                        defaultValue="1"
                        onChange={filterRating}
                        options={[
                            {
                                value: '1',
                                label: 'Rating > 1',
                            },
                            {
                                value: '2',
                                label: 'Rating > 2',
                            },
                            {
                                value: '3',
                                label: 'Rating > 3',
                            },
                            {
                                value: '4',
                                label: 'Rating > 4',
                            },
                            {
                                value: '5',
                                label: 'Rating > 5',
                            },
                        ]}
                    />
                </Space>
                <h2>List Product</h2>
                <List
                    pagination
                    dataSource={products}
                    renderItem={item => (
                        <Link className='link' to={'/detail/' + item.id}>
                            <Row>
                                <Col span={4} >
                                    <Image preview={false} src={item.image} width={150} height={150} />
                                </Col>
                                <Col span={18} >
                                    <p className='title'>{item.title}</p>
                                    <p className='cat'>{item.category}</p>
                                    <p className='desc'>{item.description}</p>
                                    <Row className='row-center'>
                                        <p className='tx-rate'>{item.rating.rate}</p>
                                        <ReactStars
                                            edit={false}
                                            count={5}
                                            value={item.rating.rate}
                                            size={15}
                                            isHalf={true}
                                            activeColor="#ffd700"
                                        />
                                        {
                                            item.rating.review > 0 ?
                                                <p className='tx-rate'> ({item.rating.review})</p>
                                                :
                                                <p className='tx-rate'>No Review Yet</p>
                                        }
                                    </Row>
                                    <Row className='row-center'>
                                        {
                                            check_date(item.created_at) == true ?
                                                <span className='span-new'>
                                                    <p className='tx-white'>NEW</p>
                                                </span>
                                                :
                                                null
                                        }
                                        {
                                            item.rating.review > 20 && item.rating.rate > 4 ?
                                                <span className='span-best-seller'>
                                                    <p className='tx-white'>BEST SELLER</p>
                                                </span>
                                                :
                                                null
                                        }
                                        {
                                            check_date(item.created_at) == true && item.rating.review > 20 && item.rating.rate > 4 ?
                                                <span className='span-hot-lesson'>
                                                    <p className='tx-white'>Hot Lesson</p>
                                                </span>
                                                :
                                                null
                                        }
                                    </Row>
                                </Col>
                                <Col span={2} >
                                    <p className='price'>{currencyFormat(item.priceDiscount)}</p>
                                    <p className='price-line'>{currencyFormat(item.price)}</p>
                                </Col>
                            </Row>
                            <Divider />
                        </Link>
                    )}
                />
            </div>
        </DocumentMeta>
    )
}
export default ListProduct;
