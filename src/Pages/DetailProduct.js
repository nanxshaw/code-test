import React, { useEffect, useState } from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Image, Row, Col } from 'antd';
import DocumentMeta from 'react-document-meta';
import { UPDATE_WISHLIST } from '../Redux/Actions/actions';


function currencyFormat(num) {
  return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function DetailProduct() {
  //initial state
  const [wishlist, setWishlist] = useState(false);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = product.filter(x => x.id === Number(id))[0];

  //meta data detail product
  const meta = {
    title: item.title,
    description: item.description,
    meta: {
      charset: 'utf-8',
      name: {
        keywords: item.title + ',' + item.category + ',' + item.description
      }
    }
  };

  useEffect(() => {
      setWishlist(item.wishlist);
  },[]);

  //toggle wishlist
  function setWishlistData(bol, item) {
    //to state
    setWishlist(bol);
    //to state redux
    dispatch(UPDATE_WISHLIST(bol, item))
  }

  return (
    <DocumentMeta {...meta}>
      <div style={{ padding: 10 }}>
        <h1>Detail Product</h1>
        <Row>
          <Col className='margin-right'>
            <Image src={item.image} width={200} height={200} />
          </Col>
          <Col style={{paddingLeft:10}}>
            <p className='title'>{item.title}</p>
            <p className='price'>{currencyFormat(item.price)}</p>
            <p className='cat'>{item.category}</p>
            <p className='desc'>{item.description}</p>
            <Row style={{alignItems:"center"}}>
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
                 <p style={{fontSize:12,marginLeft:5}}>({item.rating.review})</p>
                  :
                  <p style={{fontSize:12,marginLeft:5}}>No Review Yet</p>
              }
            </Row>
            {
              wishlist === true ?
                <HeartFilled onClick={() => setWishlistData(false, item)} style={{ fontSize: '20px', color: '#FF69B4' }} />
                :
                <HeartOutlined onClick={() => setWishlistData(true, item)} style={{ fontSize: '20px', color: '#FF69B4' }} />
            }
          </Col>
        </Row>
      </div>
    </DocumentMeta>
  );
}

export default DetailProduct;