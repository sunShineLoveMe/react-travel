import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Button, Dropdown, Input, Layout, Menu, Typography } from 'antd';
import { GlobalOutlined } from "@ant-design/icons"
import { RouteComponentProps, withRouter } from "../../helpers/withRouter";
import store from "../../redux/store";
import { LanguageState } from "../../redux/languageReducer";

interface State extends LanguageState{}

class HeaderComponent extends React.Component<RouteComponentProps, State> {

  constructor(props) {
    super(props)
    const storeState = store.getState();
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList,
    }
    store.subscribe(this.handleStoreChange);
  }

  handleStoreChange = () => {
    const storeState = store.getState()
    this.setState({
      language: storeState.language,
      languageList: storeState.languageList,
    })
  }

  menuClickHandler = (e) => {
    if (e.key === "new") {
      const action = {
        type: "add_language",
        payload: { code: "new_lang", name: "新语言" },
      }
      store.dispatch(action);
    } else {
      const action = {
        type: "change_language",
        payload: e.key,
      };
      store.dispatch(action);
    }
  }

  render(): React.ReactNode {
    const { navigate } = this.props;
    return (
      <div className={styles["app-header"]}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>
              让旅游更幸福
            </Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu
                  onClick={this.menuClickHandler}
                  items={[
                    ...this.state.languageList.map((l) => {
                    return { key: l.code, label: l.name}
                  }), 
                    { key: "new", label: "添加新语言" },
                  ]}
                />
              }
              icon={<GlobalOutlined />}
            >
             { this.state.language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => navigate("/register")}>注册</Button>
              <Button onClick={() => navigate("/signin")}>登录</Button>
            </Button.Group>
          </div>

        </div>
        <Layout.Header className={styles["main-header"]}>
          <span onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className={styles["App-logo"]} />
            <Typography.Title level={3} className={styles.title}>
              React旅游网
            </Typography.Title>
          </span>
          <Input.Search
            className={styles["search-input"]}
            placeholder={'请输入旅游目的地、主题、或关键字'} />
        </Layout.Header>
        <Menu className={styles['main-menu']}
          mode={"horizontal"}
          items={[
            { key: "1", label: "旅游首页" },
            { key: "2", label: "周末游" },
            { key: "3", label: "跟团游" },
            { key: "4", label: "自由行" },
            { key: "5", label: "私家团" },
            { key: "6", label: "邮轮" },
            { key: "7", label: "酒店+景点" },
            { key: "8", label: "当地玩乐" },
            { key: "9", label: "主题游" },
            { key: "10", label: "定制游" },
            { key: "11", label: "游学" },
            { key: "12", label: "签证" },
            { key: "13", label: "企业游" },
            { key: "14", label: "高端游" },
            { key: "15", label: "爱玩户外" },
            { key: "16", label: "保险" },
          ]}
        />
      </div>
    );
  }
}

export const Header = withRouter(HeaderComponent);