import React, { useState } from 'react';
import { Layout, Carousel } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { List, Image, Row, Col, Divider, Button, Space } from 'antd';


function currencyFormat(num) {
  return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function DetailProduct() {
  const [wishlist, setWishlist] = useState(false);
  const product = useSelector((state) => state.product);
  // const dispatch = useDispatch();
  const { id } = useParams();
  const item = product.filter(x => x.id === Number(id))[0];
  return (
    <div style={{ padding: 10 }}>
      <h1>Detail Product</h1>
      <Image src={item.image} />
      <p className='title'>{item.title}</p>
      <p className='price'>{currencyFormat(item.price)}</p>
      <p className='cat'>{item.category}</p>
      <p className='desc'>{item.description}</p>
      <Row>
        {item.rating.rate}
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
                <p>No Review Yet</p>
        }
      </Row>
      {
        wishlist == true ?
          <HeartFilled onClick={() => setWishlist(false)} style={{ fontSize: '20px', color: '#FF69B4' }} />
          :
          <HeartOutlined onClick={() => setWishlist(true)} style={{ fontSize: '20px', color: '#FF69B4' }} />
      }
    </div>
  );
}

export default DetailProduct;