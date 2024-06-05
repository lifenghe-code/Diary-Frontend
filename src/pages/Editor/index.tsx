import ReactQuill, {Quill} from 'react-quill';
import {ImageDrop} from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css';
import React, {useEffect, useState} from "react";
import {Button, Flex, Input, message, Modal, Radio} from 'antd';
import {Diary} from "@/pages/Editor/data";
import {findSavedDiary, publishDiary, saveDiary} from "@/pages/Editor/service";
import {notification} from 'antd';
import type { NotificationArgsProps } from 'antd';
import { App } from 'antd';
// 在quiil中注册quill-image-drop-module
Quill.register('modules/imageDrop', ImageDrop);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
    ['link', 'image'],
    ['clean'],
  ],
  imageDrop: true,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formats = [
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'clean'
];

type NotificationPlacement = NotificationArgsProps['placement'];
const Context = React.createContext({
  name: 'Default',
});
// 当修改文本框的内容时，会自动调用onQuillChange函数
const Editor: React.FC = () => {

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');


  const [notificationApi, contextHolderNotification] = notification.useNotification();
  const [messageApi, contextHolderMessage] = message.useMessage();
  const [diaryType, setDiaryType] = useState(0);

  const selectDiaryType = (e: RadioChangeEvent) => {
    setDiaryType(e.target.value);
  };
  const openNotification = (placement: NotificationPlacement) => {
    notificationApi.info({
      message: `Notification!!!`,
      description: <Context.Consumer>{({ name }) => `完成后请记得保存或直接发布!`}</Context.Consumer>,
      placement,
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: '标题和内容不能为空！',
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const diary:Diary = {title:title,content:content,type:diaryType}
    const result =  await publishDiary(diary);
    console.log(diary);
    if (result.data === 1) {
      setTitle("");
      setContent("");
      message.success("发布成功！");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async function () {
      openNotification('topRight');
      const re = await findSavedDiary();
      setTitle(re.data.title);
      setContent(re.data.content);
    })();
  }, []);


  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    //console.log('Change:', e.target.value);
  };
  const onContentChange = (value: string) => {
    //console.log("富文本的值：", value);
    setContent(value);
  };
  // setTitle(diary.data.title);
  // setValue(diary.data.content);
  const save = async () => {
    const myDiary: Diary = {
      title: title,
      content: content
    };
    const result = await saveDiary(myDiary);
    if (result.data === 1) {
      message.success("保存成功！");
    }
  }

  const publish = async () => {
    if (title.length === 0 || content.length === 0){
      warning();
      return;
    }
    showModal();
    // modal.warning({
    //   title: 'This is a warning message',
    //   content: 'some messages...some messages...',
    // });
  }

  return (

    <div
    >
      {contextHolderNotification}
      {contextHolderMessage}
      请输入标题
      <p></p>
      <Input value={title} showCount maxLength={20} onChange={onTitleChange}/>
      <p></p>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={onContentChange}
        value={content}
        //placeholder="Please Input"
      />
      <p></p>
      <Flex
        direction="column" // 设置为垂直方向
        align="middle" // 水平居中
        justify="center" // 垂直居中
        gap={20}
      >
        <Button onClick={publish} type="primary" size="middle">发布</Button>
        <Button onClick={save}>保存</Button>
      </Flex>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Radio.Group id="selectType" onChange={selectDiaryType} value={diaryType}>
          <Radio value={0}>公开</Radio>
          <Radio value={1}>私有</Radio>
        </Radio.Group>
      </Modal>
    </div>

  )
}
export default Editor;
