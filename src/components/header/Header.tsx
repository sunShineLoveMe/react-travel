import React, { useEffect, useState } from "react";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Button, Dropdown, Input, Layout, Menu, Typography } from 'antd';
import { GlobalOutlined } from "@ant-design/icons"
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator
} from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode'
import { use } from "i18next";
import { userSlice } from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const jwt = useSelector((state) => state.user.token)
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  }, [jwt])

  const menuClickHandler = (e) => {
    if (e.key === 'new') {
      dispatch(addLanguageActionCreator('新语言', 'new_lang'))
    } else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }

  const onLogout = () => {
    dispatch(userSlice.actions.logOut())
    navigate("/")
  }

  return (
    <div className={styles["app-header"]}>
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text> {t("header.slogan")} </Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                })}
                <Menu.Item key={"new"}>
                  {t("header.add_new_language")}
                </Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>
          {
            jwt ?
              <Button.Group className={styles["button-group"]}>
                <span>{t("header.welcome")}
                  <Typography.Text strong>{username}</Typography.Text>
                </span>
                <Button onClick={() => navigate("/shoppingCart")}>{t("header.shoppingCart")}</Button>
                <Button onClick={onLogout}>{t("header.signOut")}</Button>
              </Button.Group>
              :
              <Button.Group className={styles["button-group"]}>
                <Button onClick={() => navigate("/register")}>{t("header.register")}</Button>
                <Button onClick={() => navigate("/signin")}>{t("header.signin")}</Button>
              </Button.Group>
          }
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>
        <Input.Search
          className={styles["search-input"]}
          placeholder={'请输入旅游目的地、主题、或关键字'}
          onSearch={(keyword) => navigate(`/search/${keyword}`)}
        />
      </Layout.Header>
      <Menu className={styles['main-menu']}
        mode={"horizontal"}
        items={[
          { key: "1", label: t("header.home_page") },
          { key: "2", label: t("header.weekend") },
          { key: "3", label: t("header.group") },
          { key: "4", label: t("header.backpack") },
          { key: "5", label: t("header.private") },
          { key: "6", label: t("header.cruise") },
          { key: "7", label: t("header.hotel") },
          { key: "8", label: t("header.local") },
          { key: "9", label: t("header.theme") },
          { key: "10", label: t("header.custom") },
          { key: "11", label: t("header.study") },
          { key: "12", label: t("header.visa") },
          { key: "13", label: t("header.enterprise") },
          { key: "14", label: t("header.high_end") },
          { key: "15", label: t("header.outdoor") },
          { key: "16", label: t("header.insurance") },
        ]}
      />
    </div>
  );
}