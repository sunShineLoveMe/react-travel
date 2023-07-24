import React from "react";
import { Footer, Header } from "../../components";
import styles from './MainLayout.module.css';

interface PropsType {
    children: React.ReactNode;
}

export const MainLayout: React.FC<PropsType> = ({children}) => {
    return (
        <>
            <Header/>
            <div className={styles["page-content"]}>{children}</div>    
            <Footer/>
        </>
    )
}