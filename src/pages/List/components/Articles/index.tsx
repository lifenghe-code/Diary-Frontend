import {LikeOutlined, MessageFilled, StarOutlined, StarTwoTone} from '@ant-design/icons';
import {useRequest} from '@umijs/max';
import {Avatar, Button, List, message} from 'antd';
import React, {useState} from 'react';
import type {ListItemDataType} from '../../data.d';
import {queryAllDiary} from '../../service';
import ArticleListContent from '../ArticleListContent';
import {Input} from 'antd';
import useStyles from './index.style';
import {useModel} from "@@/exports";




const Articles: React.FC = () => {

  const {styles} = useStyles();

  // const {initialState} = useModel('@@initialState');
  // const currentUser = initialState.currentUser;
  // 获取tab列表数据
  const {data: listData} = useRequest(async () => {
    return await queryAllDiary()
  });

  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={listData || []}
      renderItem={(item) => (
        <div>
          <List.Item key={item.diaryId}>
            <List.Item.Meta //列表中的内容
              title={
                <a className={styles.listItemMetaTitle}>
                  {item.title}
                </a>
              }
            />
            <ArticleListContent data={item}/>
          </List.Item>

          <hr/>
        </div>
      )}></List>
  );
};
export default Articles;
