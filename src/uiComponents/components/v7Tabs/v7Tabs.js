import React from 'react';
import { Tabs, Tab } from "react-materialize";
import './v7Tabs.scss';

const getTabs = (tabs, backGray) => {
  let resultTabs = tabs.map((item, i) => {
    return (
      <Tab
        title={item.title}
        active={item.active}
        key={i}>
        <section className={ (backGray) ? 'vol7er-tabs__backGray' : 'vol7er-tabs__backTransparent' }>
          {item.item}
        </section>
      </Tab>
    )
  });
  return resultTabs;
};

const V7Tabs = (props) => {
  return (
    <section className="vol7er-tabs">
      <Tabs>
        {getTabs(props.tabs, props.backGray)}
      </Tabs>
    </section>
  )
}

export default V7Tabs;