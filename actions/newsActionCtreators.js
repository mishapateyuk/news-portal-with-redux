import {addArticle, getArticles, deleteArticle, editArticle} from '../models/articleModel';

const addNews = (dataInfo) =>
  (dispatch) => {
    addArticle(dataInfo);
    return dispatch({type: 'NEWS_ARE_CHANGED'});
};

const showNews = () => (dispatch) => {
  return getArticles()
    .then((response) => dispatch({type: 'SHOW_NEWS', news: response}));
};

const editNews = (dataInfo) =>
  (dispatch) => {
    editArticle(dataInfo);
    return dispatch({type: 'NEWS_ARE_CHANGED'});
};

const removeNews = (id) =>
  (dispatch) => {
    deleteArticle(id);
    return dispatch({type: 'NEWS_ARE_CHANGED'});
};

const filterNews = (author, tags, date) => ({
  type: 'APPLY_FILTERS',
  filtersSettings: {
    author,
    date,
    tags,
  },
});

export {addNews, editNews, removeNews, showNews, filterNews};
