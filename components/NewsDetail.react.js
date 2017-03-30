import React from 'react';
import Loading from '../components/Loading.react';
import {connect} from 'react-redux';
import {showNews} from '../actions/newsActionCtreators';

const mapStateToProps = ({news}) => ({
  news: news.all,
});

const mapDispatchToProps = (dispatch) => ({
  showNews: () => dispatch(showNews()),
});

class NewsDetails extends React.Component {

  componentDidMount() {
    if (this.props.news === null) {
      console.log('show me news');
      this.props.showNews();
    } else {
      return;
    };
  };

  render() {
    const id = this.props.params.id;
    const {news} = this.props;
    if (news === null) {
      return (
        <div className="news-wrapper clearfix">
          <Loading />
        </div>
      );
    } else {
      const currentNews = this.props.news.find((item) => item.id == id);
      return (
        <div className="newsWrapper">
          <p>
            <b>Title: </b>{currentNews.title}
          </p>
          <p>
            <b>Author: </b>{currentNews.author}
          </p>
          <p>
            <b>Date: </b>{currentNews.publishDate}
          </p>
          <p>
            <b>Tags: </b>{currentNews.tags.join(', ')}
          </p>
          <p>
            <b>Description: </b>{currentNews.fullDescription}
          </p>
        </div>
      );
    };
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetails);
