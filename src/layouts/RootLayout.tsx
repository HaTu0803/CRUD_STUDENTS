import { Layout, theme } from 'antd';
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar/SideBar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

function RootLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
    {/* <MainLayout > */}
    <Layout>
      <SideBar />
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 420,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
    {/* </MainLayout> */}
    </>
  );
};

export default RootLayout;