import axios from 'axios';
import {
  GET_ALL_ARTICLES,
  GETTING_FAILED,
  BEGIN_GETTING_ARTICLES,
} from '../types';

export const beginFetchingArticles = () => ({
  type: BEGIN_GETTING_ARTICLES,
});

export const getArticlesSuccess = response => ({
  type: GET_ALL_ARTICLES,
  payload: response.data.results,
  count: response.data.count,
  next: response.data.next,
  previous: response.data.previous,
});

export const gettingArticlesFail = error => ({
  type: GETTING_FAILED,
  payload: {
    status: false,
    error: error.response.status,
  },
});

const getAllArticles = (articlePageUrl) => (dispatch) => {
  dispatch(beginFetchingArticles());
  let url = 'https://ah-backend-realers-staging.herokuapp.com/api/articles/?limit=6&offset=0';

  if (articlePageUrl) {
    url = articlePageUrl;
  }
  return axios.get(url)
    .then(response => dispatch(getArticlesSuccess(response)))
    .catch((error) => {
      dispatch(gettingArticlesFail(error));
    });
};

export default getAllArticles;
