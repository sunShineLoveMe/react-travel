import React from "react";
import styles from './shoppingCart.module.css'
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col, Affix } from 'antd'
import { ProductList } from "../../components";

export const ShoppingCartPage: React.FC = () => {
    return (
        <MainLayout>
            <Row>
                {/* 购物车清单 */}
                <Col span={16}></Col>
                {/* 支付卡组件 */}
                <Col span={8}></Col>
            </Row>
        </MainLayout>
    )
}