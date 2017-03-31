import React from 'react';
import Loading from '../components/Loading.react';
import {connect} from 'react-redux';
import NewsItem from '../components/NewsItem.react';
import {showModal} from '../actions/modalActionCreators';
import {showNews} from '../actions/newsActionCtreators';
import {getFilteredNews} from '../services/filterNews';

const mapStateToProps = ({news}) => ({
  news: news.filtersSettings === null ? news.all : getFilteredNews(news.filtersSettings, news.all),
});

const mapDispatchToProps = (dispatch) => ({
  showModal: () => dispatch(showModal('FILTERS')),
  showNews: () => dispatch(showNews()),
});

class NewsList extends React.PureComponent {
  componentDidMount() {
    if (this.props.news === null) {
      this.props.showNews();
    } else {
      return;
    };
  };

  render() {
    if (this.props.news === null) {
      return (
        <div className="news-wrapper clearfix">
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="news-wrapper clearfix">
          <div className="buttons-wrapper">
            <span className="button add-news" onClick={this.props.showModal}>
              Filters
            </span>
          </div>
          {this.props.news.map((news, index) => <NewsItem newsData={news} key={index} />)}
        </div>
      );
    };
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
