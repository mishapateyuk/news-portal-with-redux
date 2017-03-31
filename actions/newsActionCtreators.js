import {addArticle, getArticles, deleteArticle, editArticle} from '../models/articleModel';
import {newsAreChangedType, loadNewsType, applyFiltersType} from '../constants/constants.js';

const addNews = (dataInfo) =>
  (dispatch) => {
    dispatch({type: newsAreChangedType});
    addArticle(dataInfo)
      .then(() => dispatch(showNews()));
};

const showNews = () => (dispatch) => {
  return getArticles()
    .then(
        (response) => dispatch({
          type: loadNewsType,
          news: response,
        })
      );
};

const editNews = (dataInfo) =>
  (dispatch) => {
    dispatch({type: newsAreChangedType});
    editArticle(dataInfo)
      .then(() => dispatch(showNews()));
};

const removeNews = (id) =>
  (dispatch) => {
    dispatch({type: newsAreChangedType});
    deleteArticle(id)
      .then(() => dispatch(showNews()));
};

const filterNews = (author, tags, date) => ({
  type: applyFiltersType,
  filtersSettings: {
    author,
    date,
    tags,
  },
});

export {addNews, editNews, removeNews, showNews, filterNews};
