import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
import { Image, Row, Col, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

class Product extends Component {

    //format int to currency rupiah
    currencyFormat(num) {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    //cek date per week
    check_date(date) {
        if (date) {
            const endDate = new Date().getTime();
            const startDate = endDate - (7 * 24 * 60 * 60 * 1000);
            const valDate = new Date(date).getTime();

            if (valDate >= startDate && valDate <= endDate) {
                return true;
            } else {
                return false;
            }
        }
    }


    render() {
        const { item } = this.props;
        return (
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
                            {
                                item.wishlist === true ?
                                    <HeartFilled style={{ fontSize: '20px', color: '#FF69B4' }} />
                                    :
                                    <HeartOutlined style={{ fontSize: '20px', color: '#FF69B4' }} />
                            }
                        </Row>
                        <Row className='row-center'>
                            {
                                this.check_date(item.created_at) === true && (item.rating.review > 20 && item.rating.rate > 4) ?
                                    <Tag color="#DC143C">Hot Lesson</Tag>
                                    :
                                    <div>
                                        {
                                            this.check_date(item.created_at) === true ?
                                                <Tag color="#f50">NEW</Tag>
                                                :
                                                null
                                        }
                                        {
                                            item.rating.review > 20 && item.rating.rate > 4 ?
                                                <Tag color="#2db7f5">BEST SELLER</Tag>
                                                :
                                                null
                                        }
                                    </div>
                            }
                        </Row>
                    </Col>
                    <Col span={2} >
                        <p className='price'>{this.currencyFormat(item.priceDiscount)}</p>
                        <p className='price-line'>{this.currencyFormat(item.price)}</p>
                    </Col>
                </Row>
                <Divider />
            </Link>
        )
    }
}


export default Product;
