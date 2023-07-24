import styles from './SearchPage.module.css'
import React, { useEffect} from 'react'
import { Header, Footer, FilterArea, ProductList } from '../../components'
import { useParams, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { searchProduct } from '../../redux/productSearch/slice'
import { useSelector, useAppDispatch } from '../../redux/hooks'

type MatchParams = {
    keywords: string;
}

export const SearchPage: React.FC = () => {
    const { keywords } = useParams<MatchParams>();

    const loading = useSelector(state => state.productSearch.loading);
    const error = useSelector(state => state.productSearch.error);
    const pagination = useSelector(state => state.productSearch.pagination);
    const productList = useSelector(state => state.productSearch.data);

    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if(keywords) {
            dispatch(searchProduct({ keywords, nextPage: 1, pageSize: 10 }));
        } else {
            dispatch(searchProduct({ keywords: '', nextPage: 1, pageSize: 10 }));
        }
    }, [location])

    const onPageChange = (nextPage, pageSize) => {
        if(keywords) {
            dispatch(searchProduct({ nextPage, pageSize, keywords }));
        } else {
            dispatch(searchProduct({ nextPage, pageSize, keywords: '' }));
        }
    }

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                }}
            />
        )
    }

    if (error) {
        return <div>网站出错：{error}</div>
    }

    return (
        <>
            <Header/>
            <div className={styles["page-content"]}>
                {/* 分类过滤器 */}
                <div className={styles["product-list-container"]}>
                    <FilterArea />
                </div>
                {/* 产品列表 */}
                <div className={styles["product-list-container"]}>
                    <ProductList
                        data={productList}
                        paging={pagination}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>    
            <Footer/>
        </>
    )
    
}