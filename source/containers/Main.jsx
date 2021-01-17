import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'

import PRList from '../components/PRList';
import SearchByTabs from '../components/SearchByTabs';
import { signin, pulls, global } from '../core/adapters/redux';

const { actions, types } = pulls;
const { LoadingStatus, Role } = global;

const searchBys = [
  {
    display: 'Created',
    value: Role.Author,
  },
  {
    display: 'Assigned',
    value: Role.Assignee,
  },
  {
    display: 'Mentioned',
    value: Role.Mentions,
  },
  {
    display: 'Review requests',
    value: Role.ReviewRequested,
  },
];


export class Main extends React.Component {
  componentDidMount() {
    this.props.init();
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
          loading={this.props.loading}
          total={this.props.total}
          page={this.props.page}
          pageSize={3}
          items={this.props.items}
          onPagination={this.props.setPage}
        />
      </section>
    )
  }
}

function mapStateToProps(state) {
  const { loading, items, total, page, q} = state.pulls;

  return {
    loading: (loading == LoadingStatus.Loading) ? true : false,
    q,
    total,
    page,
    items: items.map(item => {
      return {
        number: item.number,
        title: item.title,
        body: item.body,
        htmlUrl: item.htmlUrl,
        creator: item.creator,
        createdAt: item.createdAt,
        repo: {
          fullName: item.repo.fullName,
          htmlUrl: item.repo.htmlUrl
        }
      }
    })
  };
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => {
      dispatch(actions.init());
      dispatch(actions.fetchPullRequests());
    },
    setSearchBy: (role) => {
      dispatch(actions.setRole({ role }));
      dispatch(actions.resetPage());
      dispatch(actions.fetchPullRequests());
    },
    setPage: (page) => {
      dispatch(actions.setPage({ page }));
      dispatch(actions.fetchPullRequests());
    },
    signout: () => {
      dispatch(signin.actions.signout());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
