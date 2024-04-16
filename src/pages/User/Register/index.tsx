import Footer from '@/components/Footer';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Helmet} from '@umijs/max';
import {Alert, message, Tabs} from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, {useState} from 'react';
import {userRegisterUsingPost} from "@/services/wuapi-backend/userController";
import {Link} from "@@/exports";


const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });


  const {status, type: loginType} = userLoginState;

  // 编程时路由跳转

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          登录页 - {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="Api接口开放平台"
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          subTitle={
            <>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p>
                <b>一个丰富的API开放调用平台</b>
              </p>
            </>
          }
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            const res = await userRegisterUsingPost(values as API.UserRegisterRequest);
            if (res.code === 0 && res.message === 'ok') {
              message.success("注册成功，请去登陆");
              setTimeout(() => {
                window.location.replace("/user/login")
              }, 400)
            } else {
              message.error("注册失败");
            }
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账号密码注册',
              }
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'}/>
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'账号：账号应大于3个字小于16个字'}
                rules={[
                  {
                    required: true,
                    pattern:/^.{3,16}$/,
                    message: '账号必须大于3个字符并且小于16个字符！',
                  },
                ]}
              />
              <ProFormText.Password
                id='userPassword'
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    pattern:/^.{3,16}$/,
                    message: '密码必须大于3个字符并且小于16个字符！',
                  },
                ]}
              />
              <ProFormText.Password
                id='checkPassword'
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'确认密码'}
                rules={[
                  {
                    required: true,
                    pattern:/^.{3,16}$/,
                    message: '两次密码必须一致！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
              float: "right",
            }}
          >
            <Link
              to={{pathname: '/user/login'}}
            >
              返回登录
            </Link>
            {/*<a*/}
            {/*  style={{*/}
            {/*    float: 'right',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  忘记密码*/}
            {/*</a>*/}
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  )
    ;
};

export default Login;
