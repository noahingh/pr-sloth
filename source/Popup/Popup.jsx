import React from 'react';
// import browser from 'webextension-polyfill';
import { Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PRList from '../components/PRList';
import SearchByTabs from '../components/SearchByTabs';
import { actions } from '../core/adapters/redux';
import { connect } from 'react-redux'

// function openWebPage(url) {
//   return browser.tabs.create({ url });
// }

const searchBys = [
  {
    display: 'Created',
    value: actions.searchByAuthor,
  },
  {
    display: 'Assigned',
    value: actions.searchByAssignee,
  },
  {
    display: 'Mentioned',
    value: actions.searchByMention,
  },
  {
    display: 'Review requests',
    value: actions.searchByReviewRequested,
  },
];

export class Popup extends React.Component {
  componentDidMount() {
    this.props.onPagination(1);
  }

  render() {
    return (
      <section style={{ minWidth: '750px', padding: '30px 20px' }}>
        <Row style={{ marginBottom: "5px" }}>
          <Col >
            <SearchByTabs
              searchBys={searchBys}
              onSearchByChange={this.props.onSearchByChange}
            />
          </Col>
          <Col offset="1">
            <Input
              disabled={true}
              value={this.props.q}
              prefix={<SearchOutlined />}
            />
          </Col>
        </Row>
        <PRList
          totalCount={this.props.totalCount}
          page={this.props.page}
          perPage={this.props.perPage}
          pullRequests={this.props.pullRequests}
          onPagination={this.props.onPagination}
        />
      </section>
    )
  }
}

function mapStateToProps(state) {
  const { search, list } = state;
  const { q } = search;
  const { totalCount, page, perPage, pullRequests } = list;

  return {
    q,
    totalCount,
    page,
    perPage,
    pullRequests: pullRequests.map(pr => {
      return {
        repoFullName: pr.repo.fullName,
        pullRequestTitle: pr.title,
      }
    })
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchByChange: (value) => dispatch(actions.setSearchBy(value)),
    onPagination: (page) => dispatch(actions.fetchPullRequests(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
