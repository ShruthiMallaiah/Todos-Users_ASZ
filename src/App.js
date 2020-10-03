import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Home from './components/Home';

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header>
        <h2 style={{ color: 'white' }}>Todos and Users Listing</h2>
      </Header>
      <Content>
        <Home />
      </Content>
      <Footer>
        <strong>Submitted By</strong>
        <a href="https://shruthiportfolio.netlify.app/" target="_blank">
          <strong> Shruthi.M</strong>
        </a>
      </Footer>
    </Layout>
  )
}

export default App;
