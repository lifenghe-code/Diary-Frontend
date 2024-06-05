import { LikeOutlined, MessageFilled, StarTwoTone } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { List, Tag } from 'antd';
import React from 'react';
import type { ListItemDataType } from '../../data.d';
import {queryUserDiary} from '../../service';
import ArticleListContent from '../ArticleListContent';
import useStyles from './index.style';
import {useModel} from "@@/exports";
const Articles: React.FC = () => {
  const { styles } = useStyles();
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );

  const { initialState } = useModel('@@initialState');
  const currentUser = initialState.currentUser;
  // 获取tab列表数据
  const {data: listData } = useRequest(async () => {
    const diary = await queryUserDiary(currentUser.userId);
    return diary
  });
  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={listData || []}
      renderItem={(item) => (
        <List.Item
          key={item.diaryId}
          actions={[
            <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
            <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
            <IconText key="message" icon={<MessageFilled />} text={item.message} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.avatar}>
                {item.title}
              </a>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};
export default Articles;
