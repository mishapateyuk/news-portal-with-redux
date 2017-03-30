import React from 'react';
import Loading from '../components/Loading.react';
import {connect} from 'react-redux';
import NewsItem from '../components/NewsItem.react';
import {showModal} from '../actions/modalActionCreators';
import {showNews} from '../actions/newsActionCtreators';
import {getFilteredNews} from '../services/filterNews';

const mapStateToProps = ({news}) => ({
  all: news.all,
  filtersSettings: news.filtersSettings,
});

const mapDispatchToProps = (dispatch) => ({
  showModal: () => dispatch(showModal('FILTERS')),
  showNews: () => dispatch(showNews()),
});

class NewsList extends React.PureComponent {
  componentDidMount() {
    if (this.props.all === null) {
      this.props.showNews();
    } else {
      return;
    };
  };

  render() {
    if (this.props.all === null) {
      return (
        <div className="news-wrapper clearfix">
          <Loading />
        </div>
      );
    } else {
      const {all, filtersSettings} = this.props;
      const newsToRender = filtersSettings === null ? all : getFilteredNews(filtersSettings, all);
      return (
        <div className="news-wrapper clearfix">
          <div className="buttons-wrapper">
            <span className="button add-news" onClick={this.props.showModal}>
              Filters
            </span>
          </div>
          {newsToRender.map((news, index) => <NewsItem newsData={news} key={index} />)}
        </div>
      );
    };
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
