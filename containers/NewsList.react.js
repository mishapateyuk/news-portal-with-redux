import React from 'react';
import Loading from '../components/Loading.react';
import {connect} from 'react-redux';
import NewsItem from '../components/NewsItem.react';
import {showModal} from '../actions/modalActionCreators';

const mapStateToProps = ({news}) => ({
  all: news.all,
  sorted: news.sorted,
});

const mapDispatchToProps = (dispatch) => ({
  showModal: () => dispatch(showModal('FILTERS')),
});

 class NewsList extends React.Component {
  render() {
    if (this.props.all === null) {
      return (
        <div className="news-wrapper clearfix">
          <Loading />
        </div>
      );
    } else {
      const {all, sorted} = this.props;
      const newsToRender = sorted === null ? all : sorted;
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
