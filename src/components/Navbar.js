import React, { useEffect, useState } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import {HomeOutlined,MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [activeMenu,setActiveMenu]=useState(true);
  const [screenSize,setScreenSize]=useState(null);

  useEffect(()=>{
    const handleResize=()=>{setScreenSize(window.innerWidth);}

    window.addEventListener('resize',handleResize)
    handleResize();
    return ()=>window.addEventListener('resize',handleResize)
  },[]);

  useEffect(()=>{
    if(screenSize<768){
      setActiveMenu(false);
    }else{
      setActiveMenu(true)
    }
  },[screenSize])
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src="https://tse4.mm.bing.net/th?id=OIP.UfHPCCuvAwzXBfU6wmbIiwHaD4&pid=Api&P=0&h=180" size="large"/>
        <Typography.Title level={2} className='logo'>
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button className='menu-control-container' onClick={()=>setActiveMenu(!activeMenu)}>
          <MenuOutlined/>
        </Button>
      </div>
      {activeMenu && (<Menu theme='dark'>
        <Menu.Item icon={<HomeOutlined/>}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined/>}>
          <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined/>}>
          <Link to='/'>Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined/>}>
          <Link to='/news'>News</Link>
        </Menu.Item>
      </Menu>)}
    </div>
  )
}
