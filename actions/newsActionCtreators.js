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

const sortNews = (author, date, tags, allNews) => (dispatch) => {
  const sortedNews = getSortedNews(author, date, tags,allNews);
  return dispatch({type: 'SORT_NEWS', sortedNews})
};

const getSortedNews = (author, tags, date, allNews) => {
  return allNews.filter(
    (article) => (
      sortByAuthor(article, author) &&
      sortByTag(article, tags) &&
      sortByDate(article, date)
    )
  );
};

const sortByAuthor = (article, author) => {
  if (!author) {
    return true;
  }
  return article.author == author.value ? true : false;
};

const sortByDate = (article, date) => {
  const articleDate = (new Date(article.publishDate)).valueOf();
  const dateFrom = date.from;
  const dateTo = date.to ? date.to : Infinity;
  return articleDate >= dateFrom && articleDate <= dateTo;
};

const sortByTag = (article, tags) => {
  if (!tags.length) {
    return true;
  }
  return article.tags.some((articleTag) => tags.includes(articleTag));
};

export {addNews, editNews, removeNews, showNews, sortNews};
