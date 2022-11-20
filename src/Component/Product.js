import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
import { List, Image, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';

class Product extends Component {

    render() {
        const {data} = this.props;
        return (
            <div style={{ padding: 10 }}>
                <List
                    pagination
                    dataSource={data}
                    renderItem={item => (
                        <Link to={'/detail?data='+item}>
                            <Row>
                                <Col span={4} >
                                    <Image preview={false} src={item.image} width={150} height={150}  />
                                </Col>
                                <Col span={19} >
                                    <p>{item.title}</p>
                                    <p>{item.category}</p>
                                    <p>{item.description}</p>
                                    <Row>
                                        {item.rating.rate}
                                        <ReactStars
                                            count={5}
                                            value={item.rating.rate}
                                            size={15}
                                            isHalf={true}
                                            activeColor="#ffd700"
                                        />
                                        ({item.rating.count})
                                    </Row>
                                </Col>
                                <Col span={1} >
                                    {item.price}
                                </Col>
                            </Row>
                            <Divider />
                            </Link>
                    )}
                />
            </div>
        )
    }
}


export default Product;
