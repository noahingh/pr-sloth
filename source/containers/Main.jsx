import React from 'react';
// import browser from 'webextension-polyfill';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined, LogoutOutlined } from '@ant-design/icons';
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


export class Main extends React.Component {
  componentDidMount() {
    this.props.setPage(1);
  }

  render() {
    return (
      <section style={{ minWidth: '750px', padding: '30px 20px' }}>
        <Row style={{ marginBottom: "5px" }}>
          <Col >
            <SearchByTabs
              searchBys={searchBys}
              onSearchByChange={this.props.setSearchBy}
            />
          </Col>
          <Col offset="1">
            <Input
              disabled={true}
              value={this.props.q}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col >
            &nbsp; 
            <Button
              icon={<LogoutOutlined />}
              onClick={this.props.signout}
            />
          </Col>
        </Row>
        <PRList
          totalCount={this.props.totalCount}
          page={this.props.page}
          perPage={this.props.perPage}
          pullRequests={this.props.pullRequests}
          onPagination={this.props.setPage}
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
    setSearchBy: (value) => {
      dispatch(actions.setSearchBy(value));
      dispatch(actions.fetchPullRequests(1));
    },
    setPage: (page) => dispatch(actions.fetchPullRequests(page)),
    signout: () => {
      dispatch(actions.signout())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
