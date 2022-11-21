import React, { useEffect } from 'react';
import { UPDATE_USER, FILTER_PRODUCT, UPDATE_PRODUCT } from '../Redux/Actions/actions';
import { List, Button, Space, Select, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import Product from '../Component/Product';


function ListProduct() {
    //dispatch redux
    const dispatch = useDispatch();

    //get state reducers
    const products = useSelector((state) => state.product);
    const data_products = useSelector((state) => state.data_product);

    //meta data document
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

    //filter rating lebih dari 1 / 2 / 3 / 4 / 5
    function filterRating(item) {
        const arr = [];
        for (let i = 0; i < data_products.length; i++) {
            if (data_products[i].rating.rate > item)
                arr.push(data_products[i]);
        }
        dispatch(UPDATE_PRODUCT(arr))
    }

    return (
        <DocumentMeta {...meta}>
            <div style={{ padding: 10 }}>
                <Row>
                    <Col span={12}>
                        <Space>
                            <Button danger type="primary" onClick={() => dispatch(FILTER_PRODUCT('asc'))} >Filter by Price (ASC)</Button>
                            <Button danger type="primary" onClick={()  => dispatch(FILTER_PRODUCT('desc'))} >Filter by Price (DESC)</Button>
                        </Space>
                    </Col>
                    <Col span={12} style={{textAlign:"right"}} className="align-right">
                        <Space align="end" >
                            <Button danger onClick={() => dispatch(UPDATE_USER(null))} >log Out</Button>
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
                                ]}
                            />
                        </Space>
                    </Col>
                </Row>
                <h2>List Product</h2>
                <List
                    pagination
                    dataSource={products}
                    renderItem={item => (
                        <Product item={item} />
                    )}
                />
            </div>
        </DocumentMeta>
    )
}
export default ListProduct;
