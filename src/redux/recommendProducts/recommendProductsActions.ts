import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START =
    "FETCH_RECOMMEND_PRODUCTS_START"; // 正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
    "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; // 推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL =
    "FETCH_RECOMMEND_PRODUCTS_FAIL"; // 推荐信息api调用失败

interface FetchRecommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
    payload: any;
}

interface FetchRecommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
    payload: any;
}

export type RecommendProductAction =
    FetchRecommendProductStartAction | FetchRecommendProductSuccessAction | FetchRecommendProductFailAction;

export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const fetchRecommendProductSuccessActionCreator = (data): FetchRecommendProductSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}

/**
 * @description:
 *  thunk 可以返回一个函数，而不一定是js对象
 *  在一个thunk action中，可以完成一系列连续的action操作,并且可以处理异步逻辑
 *  业务逻辑从ui层面搬运到这里，代码分层会更加清晰
 *  
 * @returns 
 */
export const giveMeDataActionCreator = ():
    ThunkAction<void, RootState, unknown, RecommendProductAction> =>
    async (dispatch, getState) => {
        dispatch(fetchRecommendProductStartActionCreator());
        try {
            const { data } = await axios.get(
                "http://123.56.149.216:8080/api/productCollections");
            dispatch(fetchRecommendProductSuccessActionCreator(data));
        } catch (error) {
            dispatch(fetchRecommendProductFailActionCreator(error instanceof Error ? error.message : "未知错误"));
        }
    }