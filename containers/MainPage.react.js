import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import Header from './Header.react';
import Footer from '../components/Footer.react';
import ModalWrapper from './ModalWrapper.react';
import {showNews} from '../actions/newsActionCtreators';

const mapStateToProps = (state) => ({
  user: state.userData.user,
});

const mapDispatchToProps = (dispatch) => ({
  showNews: () => dispatch(showNews()),
});

class MainPage extends React.Component {

  showButton() {
    if (this.props.user !== 'Guest') {
      return <Link to="/add" className="button add-news">Add news</Link>;
    } else {
      return null;
    };
  };

  render() {
    this.props.showNews();
    return (
      <div>
        <ModalWrapper />
        <div className="wrapper">
          <Header />
          <div className="buttons-wrapper">
            {this.showButton()}
            <Link to="/" className="button add-news">Show news</Link>
          </div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
