import React, { Component } from 'react';
import Quill from "quill";
require("quill/dist/quill.snow.css");
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'dva';

// 图片伸缩  需要安装
// import ImageResize from "quill-image-resize-module";
// Quill.register("modules/imageResize", ImageResize);

import { AppConstants } from "../../constants/AppConstants";
import Prefix from "../../constants/Prefix";

/*富文本编辑图片上传配置   */
const uploadConfig = {
  action: Prefix("UPLOAD") + "/file/common/upload/v1", // 必填参数 图片上传地址
  methods: "POST", // 必填参数 图片上传方式
  token: AppConstants.TOKEN, // 可选参数 如果需要token验证
  name: "file", // 必填参数 文件的参数名
  size: 500, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon" // 可选 可上传的图片格式
};

/* 头部功能显示 */
const titleConfig = {
  "ql-bold": "加粗",
  "ql-color": "字体颜色",
  "ql-font": "字体",
  "ql-code": "插入代码",
  "ql-italic": "斜体",
  "ql-link": "添加链接",
  "ql-background": "背景颜色",
  "ql-size": "字体大小",
  "ql-strike": "删除线",
  "ql-script": "上标/下标",
  "ql-underline": "下划线",
  "ql-blockquote": "引用",
  "ql-header": "标题",
  "ql-indent": "缩进",
  "ql-list": "列表",
  "ql-align": "文本对齐",
  "ql-direction": "文本方向",
  "ql-code-block": "代码块",
  "ql-formula": "公式",
  "ql-image": "图片",
  "ql-video": "视频",
  "ql-clean": "清除字体样式"
};

/*图片上传   */
const handlers = {
  image: function image() {
    var self = this;
    var fileInput = this.container.querySelector("input.ql-image[type=file]");
    if (fileInput === null) {
      fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute("name", uploadConfig.name);
      }
      // 可设置上传图片的格式
      fileInput.setAttribute("accept", uploadConfig.accept);
      fileInput.classList.add("ql-image");
      // 监听选择文件
      fileInput.addEventListener("change", function() {
        // 创建formData
        var formData = new FormData();
        formData.append(uploadConfig.name, fileInput.files[0]);

        formData.append("uploadType", 7);

        // 图片上传
        var xhr = new XMLHttpRequest();
        xhr.open(uploadConfig.methods, uploadConfig.action, true);
        xhr.setRequestHeader("token", AppConstants.TOKEN);
        // 上传数据成功，会触发
        xhr.onload = function(e) {
          if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            let length = self.quill.getSelection(true).index;
            //图片上传成功后，服务器返回的图片链接。
            self.quill.insertEmbed(length, "image", res.data.url);
            self.quill.setSelection(length + 1);
          }
          fileInput.value = "";
        };
        // 开始上传数据
        xhr.upload.onloadstart = function(e) {
          fileInput.value = "";
        };
        // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        xhr.upload.onerror = function(e) {};
        // 上传数据完成（成功或者失败）时会触发
        xhr.upload.onloadend = function(e) {
          // console.log('上传结束')
        };
        xhr.send(formData);
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  }
};
@connect(({ systemNotice }) => ({
  details: systemNotice.details,
}))

class QuillRichText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      value:''
    };
  }

  componentDidMount = () => {
    this.initEditor();
    this.addQuillTitle();
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemNotice/updateState',
      payload: {
        details: {
          title: '',
          content: '',
        },
      },
    });
  }

  //初始化编辑器
  initEditor = () => {
    let that = this;
    // Add fonts to whitelist
    /*----自定义字体 ----*/
    //1.需先引入需要展示的字体样式  然后加入到字体白名单里
    const Font = Quill.import('formats/font');
    // We do not add Aref Ruqaa since it is the default
    const fonts = [
      'SimSun',
      'SimHei',
      // 'Microsoft-YaHei',
      'KaiTi',
      'FangSong',
      'Arial',
      // 'Times-New-Roman',
      'monospace',
      'serif',
      'consolas'
    ];
    Font.whitelist = fonts; //将字体加入到白名单
    Quill.register(Font, true);
    const toolbarOptions = [
      ['bold', 'italic', 'underline', "strike"],        // toggled buttons
      [{ 'list': 'bullet' }],
      [{ 'align': [] }],
      ["image"],              // 可添加 "link"
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': fonts}],     // 可添加 'video'

    ];
    //   "SimSun","SimHei","Microsoft-YaHei","KaiTi","FangSong","Arial","Times New Roman","sans-serif"
    const config = {
      debug: 'info',
      modules: {
        toolbar: {
          container: toolbarOptions ,
          handlers: handlers, // 事件重写
        }
      },
      placeholder: '请输入内容...',
      readOnly: false,
      theme: 'snow'
    };
    this.editor = new Quill('#editor', config);// 初始化编辑器
    Quill.debug("error");//只开启error提示  默认的console还是会打印 没有找到更好的解决办法
    const toolbar = this.editor.getModule('toolbar');
    const { details } = this.props;
    this.editor.container.firstChild.innerHTML = details.content; //赋值富文本  此处用于父组件传值给子组件quill（主要用于编辑页面，只做添加页面此处可忽略）
    this.editor.on('text-change', this.handleChange.bind(this));
  };

  /*鼠标移入头部功能区域 显示功能提示   */
  addQuillTitle = () => {
    const oToolBar = document.querySelector(".ql-toolbar"),
      aButton = oToolBar.querySelectorAll("button"),
      aSelect = oToolBar.querySelectorAll("select"),
      aSpan = oToolBar.querySelectorAll("span");
    aButton.forEach(item => {
      if (item.className === "ql-script") {
        item.value === "sub" ? (item.title = "下标") : (item.title = "上标");
      } else if (item.className === "ql-indent") {
        item.value === "+1"
          ? (item.title = "向右缩进")
          : (item.title = "向左缩进");
      } else if (item.className === "ql-list") {
        item.value === "ordered"
          ? (item.title = "有序列表")
          : (item.title = "无序列表");
      } else if (item.className === "ql-header") {
        item.value === "1" ? (item.title = "标题H1") : (item.title = "标题H2");
      } else {
        item.title = titleConfig[item.classList[0]];
      }
    });
    aSelect.forEach(item => {
      if (item.className != "ql-color" && item.className != "ql-background") {
        item.parentNode.title = titleConfig[item.classList[0]];
      }
    });
    aSpan.forEach(item => {
      if (item.classList[0] === "ql-color") {
        item.title = titleConfig[item.classList[0]];
      } else if (item.classList[0] === "ql-background") {
        item.title = titleConfig[item.classList[0]];
      }
    });
  }

  handleChange () {
    const { details } = this.props;
    this.setState({
      value: this.editor.root.innerHTML,
      isUpdate: true,
    });
    details.content = this.editor.root.innerHTML;
  }

  render() {
    const { value }  = this.state;
    return (
      <div className="quillRich">
        <div id="editor" ref="editor"
             value={ value }
        >
        </div>
      </div>
    );
  }
}

export default QuillRichText;
