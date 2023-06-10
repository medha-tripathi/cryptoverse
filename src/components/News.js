import React, { useState } from 'react'
import { Select,Typography,Row,Col,Avatar,Card } from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from './Services/CryptoNewsApi';
import { useGetCryptosQuery } from './Services/CryptoApi';
import Loader from './Loader';

const {Text,Title}=Typography;
const {Option}=Select;

const demoImage='https://tse1.mm.bing.net/th?id=OIP.aMUpT-dp6Gzk9OZVrg5TygHaFY&pid=Api&P=0&h=180'

export default function News({simplified}) {
  const [newsCategory,setNewsCategory]=useState('cryptocurrency');
  const {data:cryptoNews}=useGetCryptoNewsQuery({newsCategory,count:simplified?6:12});
  const {data}=useGetCryptosQuery(50)

  if(!cryptoNews?.articles) return <Loader/>

  return (
    <Row gutter={[24,24]}>
    {!simplified && (
      <Col span={24}>
        <Select showSearch className='select-news' placeholder='Select a crypto' optionFilterProp='children' onChange={(value)=>setNewsCategory(value)
        } filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0}>
          <Option value='Cryptocurrency'>CryptoCurrency</Option>
          {data?.data?.coins.map((coin)=>{return <Option value={coin.name}>{coin.name}</Option>})}
        </Select>
      </Col>
    )}
      {cryptoNews.articles.map((news,i)=>{return (<Col xs={24} sm={12} lg={8} key={i}>
        <Card hoverable className='news-card'>
          <a href={news.url} target='_blank' rel='noreferrer'>
            <div className="news-image-container">
              <Title className='news-title' level={5}>{news.title>10?`${news.description.substring(0,10)}....`:news.title}</Title>
              <img style={{maxWidth:'200px',maxHeight:'100px'}} src={news.urlToImage || demoImage} alt="Money" />
            </div>
            <p>
              {news.description>100?`${news.description.substring(0,100)}....`:news.description}
            </p>
            <div className="provider-container">
              <div>
                <Avatar src={demoImage}/>
                <Text className='provider-name'>{news.author}</Text>
              </div>
              <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
            </div>
          </a>
        </Card>
      </Col>
      )})}
    </Row>
  )
}
