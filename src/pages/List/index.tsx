import { GridContent } from '@ant-design/pro-components';
import { Avatar, Card, Col,  Row,} from 'antd';
import React, { useState } from 'react';
import useStyles from './Center.style';
import Articles from './components/Articles';
import type { tabKeyType} from './data.d';
import {useModel} from "@@/exports";


const operationTabList = [
  {
    key: 'articles',
    label: (
      <span>
        Diary{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          {/*(8)*/}
        </span>
      </span>
    ),
  },
];
const Center: React.FC = () => {
  const { styles } = useStyles();
  const [tabKey, setTabKey] = useState<tabKeyType>('articles');

  //  获取用户信息
  //  const { initialState } = useModel('@@initialState');
  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    // if (tabValue === 'projects') {
    //   return <Projects />;
    // }
    // if (tabValue === 'applications') {
    //   return <Applications />;
    // }
    if (tabValue === 'articles') {
      return <Articles />;
    }
    return null;
  };
  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
