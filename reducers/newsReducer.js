const newsReducer = (state = {all: null, sorted: null,}, action) => {
  switch (action.type) {
    case 'NEWS_ARE_CHANGED' :
      return {all: null, sorted: null,};
    case 'SHOW_NEWS' :
      return {all: action.news, sorted: null,};
    case 'SORT_NEWS' :
      return Object.assign({}, state, {sorted: action.sortedNews,});
    default :
      return state;
  };
};

export default newsReducer;
