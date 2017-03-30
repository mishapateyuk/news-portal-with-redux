import React from 'react';
import { getUsers } from '../models/authorizationModel.js';
import { getTags } from '../models/tagsModel.js';
import FromToDatepicker from '../components/FromToDatepicker.react';
import Select from '../components/Select.react';
import {connect} from 'react-redux';
import {hideModal} from '../actions/modalActionCreators.js';
import {filterNews} from '../actions/newsActionCtreators';

const mapStateToProps = ({news}) => ({
  news: news.all,
});

const mapActionsToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal()),
  applyFilter: (author, date, tags) => dispatch(filterNews(author, date, tags)),
});

class Filters extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      author: null,
      tags: [],
      fromDate: null,
      toDate: Infinity,
    };
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onChangeDateFrom = this.onChangeDateFrom.bind(this);
    this.onChangeDateTo = this.onChangeDateTo.bind(this);
  };

  onChangeAuthor(value) {
    this.setState({
      author: value,
    });
  };

  onChangeTags(value) {
    this.setState({
      tags: value,
    });
  };

  onChangeDateFrom(moment) {
    const fromDate = moment ? new Date(moment._d.toLocaleDateString()).valueOf() : 0;
    this.setState({
      fromDate: fromDate,
    });
  };

  onChangeDateTo(moment) {
    const toDate = moment ? new Date(moment._d.toLocaleDateString()).valueOf() + 3 * 3600000: Infinity;
    this.setState({
      toDate: toDate,
    });
  };

  render() {
    const authorsOptions = getUsers().map((user) => {
      return {value: user, label:user};
    });
    const tagsOptions = getTags().map((tag) => {
      return {value: tag, label:tag};
    });
    const author = this.state.author;
    const tags = this.state.tags && this.state.tags.map((tag)=> tag.value);
    const date = {
      from: this.state.fromDate || null,
      to: this.state.toDate || Infinity,
    };
    return (
      <div>
        <h2>News filter</h2>
        Author:
        <Select
          options={authorsOptions}
          className="modal-select"
          onChange={this.onChangeAuthor}
          value={this.state.author}
        />
        Date:
        <div className="modal-select">
          <FromToDatepicker
            onChangeDateTo={this.onChangeDateTo}
            onChangeDateFrom={this.onChangeDateFrom}
          />
        </div>
        Tag:
        <Select
          options={tagsOptions}
          multi
          className="modal-select"
          onChange={this.onChangeTags}
          value={this.state.tags}
        />
        <button
        onClick={
            () => {
              this.props.applyFilter(author, tags, date);
              this.props.hideModal();
            }
          }
          className="button"
        >
          Show sorted news
        </button>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Filters);
