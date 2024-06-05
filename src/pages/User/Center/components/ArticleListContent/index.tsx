import { Avatar } from 'antd';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import useStyles from './index.style';
import {queryUser} from "@/pages/User/Center/service";
import { Tag } from 'antd';

const ArticleListContent: ({
                             data: {
                               content,
                               publishTime,
                               authorId,
                               type
                             }
                           }: { data: { content: any; publishTime: any; authorId: any; type: any } }) => void = ({
  data: { content, publishTime, authorId ,type},
}) => {

  const [author,setAuthor] = useState(0);
  useEffect(() => {
    (async function () {
      const response = await queryUser({userId: authorId, account: null});
      setAuthor(response.data);
    })();
  }, []);

  function Item({ type }) {
    if (type === 0) {
      return <Tag bordered={false} color="success">公开</Tag>;
    }
    else if (type === 1){
      return <Tag bordered={false} color="error">仅自己可见</Tag>;
    }
    else return <Tag bordered={false} color="processing">未发表</Tag>;
  }
  const { styles } = useStyles();
  return (
    <div>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={styles.extra}>
        <Avatar src={author.avatar} size="small" />
        <span> </span>
        <a >{author.username}</a>
        <em>{dayjs(publishTime).format('YYYY-MM-DD HH:mm')}</em>
      </div>
      <p></p>
      <Item type={type}></Item>
    </div>

  );
};
export default ArticleListContent;
