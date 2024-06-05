import {Avatar, Button, Flex, Input, List, message} from 'antd';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import useStyles from './index.style';
import {queryUser} from "@/pages/User/Center/service";
import {useModel} from "@@/exports";
import {LikeOutlined, MessageFilled, StarOutlined} from "@ant-design/icons";
import {comment, queryAllComment} from "@/pages/List/service";

const {TextArea} = Input;
const IconText: React.FC<{
  icon?: React.ReactNode; // 接口
  text?: React.ReactNode;
  onClick?:  void; // 点击事件处理函数
}> = ({icon, text, onClick}) => {
  const style = {
    cursor: 'pointer',
    // 你可以在这里添加更多的样式
  };
  return (
    <span style={style} onClick={onClick}>
       {icon} {text}
      </span>
  )
};


const ArticleListContent: ({
                             data: {
                               diaryId,
                               content,
                               publishTime,
                               authorId,
                               type
                             }
                           }: { data: { diaryId: any, content: any; publishTime: any; authorId: any; type: any } })
  => void = ({
               data: {diaryId, content, publishTime, authorId},
             }) => {


  const {initialState} = useModel('@@initialState');
  const currentUser = initialState.currentUser;

  const [expandComment, setExpandComment] = useState(false);
  const [author, setAuthor] = useState(currentUser);
  const [commentValue, setCommentValue] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [refreshDate,setRefreshDate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 假设 queryUser 是一个异步函数，需要 await 等待结果
        const au = await queryUser({ account: null, userId: authorId });
        setAuthor(au.data);
        // 在这里处理获取到的 author 数据
        // 例如，你可能需要更新组件的状态或执行其他操作
      } catch (error) {
        console.error('Failed to fetch author:', error);
        // 处理错误，例如显示错误消息或执行其他错误处理操作
      }
    };

    fetchData();
  }, [authorId]); // 仅在 authorId 变化时重新执行副作用函数

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };
  function launchComment (diaryId) {
    const fetchComments = async (diaryId) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const comments = await getComments(diaryId);
        setDataSource(comments); // 确保这里传递的是一个数组

      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
      return;
    };
    fetchComments(diaryId);
    setExpandComment(!expandComment)
    return;
  }

  const addComment = (diaryId) => {
    const authorId: number = currentUser.userId;
    const com: { diaryId: number; authorId: number; content: string } = {
      content: commentValue,
      authorId: authorId,
      diaryId: diaryId
    };
    comment(com).then(re => {
      if (re.data === 1) {
        message.success("评论成功！")
        setCommentValue("");
        launchComment (diaryId);
        setRefreshDate(new Date().getTime()); // 使用时间戳作为新的 key
        setExpandComment(true);
      }
    }).catch(err => {
      message.error("评论失败！")
    })
    return;
  }

  async function getComments(diaryId) {
    const comments = await queryAllComment(diaryId);
    const result = await Promise.all(comments.data.map(async (item) => {
      const authorId = item.authorId;
      const au = await queryUser({ account: null, userId: authorId });
      return {
        authorId: authorId,
        avatar: au.data.avatar,
        authorName: au.data.username,
        content: item.content,
        updateTime: item.updateTime,
      };
    }));
    return result;
  }


  const {styles} = useStyles();
  return (
    <div>
      <div className={styles.description} dangerouslySetInnerHTML={{__html: content}}/>
      <div className={styles.extra}>
        <Avatar src={author.avatar} size="small"/>
        <span> </span>
        <a>{author.username}</a>
        <em>{dayjs(author.createTime).format('YYYY-MM-DD HH:mm')}</em>
      </div>
      <p></p>
      <Flex horizontal gap="middle" align="center">
        <IconText key="star" icon={<StarOutlined/>} text={"1"}/>
        <IconText key="like" icon={<LikeOutlined/>} text={"1"}/>
        <IconText key="message" icon={<MessageFilled/>} onClick={() =>launchComment(diaryId)}/>
      </Flex>
      <br></br>
      {expandComment && (
        <span style={{fontSize: '6px'}}>
            <Flex horizontal gap="small" align="center">
              <Avatar src={currentUser.avatar} size="middle"/>
               <TextArea
                 showCount
                 maxLength={100}
                 onChange={onChange}
                 // onChange={onChange}
                 placeholder="disable resize"
                 style={{height: 60, resize: 'none', width: 400}}
                 value={commentValue}
               />
              <Button onClick={() => addComment(diaryId)}>发表评论</Button>
            </Flex>
            <br></br>
            <List
              //ToDo dataSource的刷新问题，
              itemLayout="horizontal"
              dataSource={dataSource}
              renderItem={(item, index) => (
                <List.Item key={item.diaryId + refreshDate}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar}/>}
                    title={item.authorName}
                    description = {item.content}
                  />
                </List.Item>
              )}
            />
          </span>
      )}
    </div>

  );
};
export default ArticleListContent;
