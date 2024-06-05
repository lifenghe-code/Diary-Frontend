import {Button, Flex, Image, Segmented} from 'antd';
import type {FlexProps, SegmentedProps} from 'antd';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import {message} from 'antd';
import React, {useState} from 'react';
import {createStyles} from "antd-style";
import {register} from "@/services/ant-design-pro/api";
import {history} from "@@/core/history";

const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const useStyles = createStyles(({token}) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};



export default () => {
  const {styles} = useStyles();
  const Components = {
    ProForm,
  };
  const [type, setType] = useState<keyof typeof Components>('ProForm');

  const FormComponents = Components[type as 'ProForm'];
  return (
    <div
      className={styles.container}
    >
      <Flex gap="middle" align="center" vertical>
        <img width={70} src="/logo.svg" alt="/logo.svg"></img>
        从模仿开始 到大师为止
        <FormComponents
          onFinish={async (values: any) => {
            values.gender = 0 ? values.gender === "男"  : 1;
            await register(values);
            console.log(values);
            message.success('提交成功');
            history.push('/user/login');
          }}
        >
          <div
            style={{
              marginTop: 50,
              marginLeft: 80,
              float: "left"
            }}
          >
            <ProFormText
              width="md"
              name="account"
              label="用户账号"
              tooltip="最长为 8 位"
              placeholder="请输入账户"
            />
            <ProFormText
              width="md"
              name="username"
              label="用户昵称"
              tooltip="最长为 8 位"
              placeholder="请输入用户昵称"
            />
            <ProFormText.Password
              width="md"
              name="password"
              label="用户密码"
              tooltip="最长为 8 位"
              placeholder="请输入密码"
            />
            <ProFormText.Password
              width="md"
              name="checkPassword"
              label="再次确认密码"
              tooltip="和上次输入的密码相同"
              placeholder="再次输入密码"
            />
          </div>

          <div
            style={{
              marginTop: 50,
              marginRight: 80,
              float: "right"
            }}
          >
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 0,
                  label: '男',
                },
                {
                  value: 1,
                  label: '女',
                },
              ]}
              name="gender"
              label="性别"
            />
            <ProFormText
              width="md"
              name="phone"
              label="联系方式"
              tooltip="请输入 11 位手机号"
              placeholder="输入手机号"
            />
            <ProFormText
              width="md"
              name="email"
              label="电子邮箱"
              //tooltip="请输入 11 位手机号"
              placeholder="请输入e-mail"
            />
            <ProFormUploadButton
              title="点击上传"
              name="avatar"
              label="头像"
              max={1}
              fieldProps={{
                name: 'file',
              }}
              action="/upload.do"
            />
          </div>
        </FormComponents>
      </Flex>

    </div>
  );
};
