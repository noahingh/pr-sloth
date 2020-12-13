import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'

import PRList from '../components/PRList';
import SearchByTabs from '../components/SearchByTabs';
import { signin, pulls } from '../core/adapters/redux';

const { actions, types } = pulls;

const searchBys = [
  {
    display: 'Created',
    value: types.Role.Author,
  },
  {
    display: 'Assigned',
    value: types.Role.Assignee,
  },
  {
    display: 'Mentioned',
    value: types.Role.Mentions,
  },
  {
    display: 'Review requests',
    value: types.Role.ReviewRequested,
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
          total={this.props.total}
          page={this.props.page}
          perPage={this.props.perPage}
          pullRequests={this.props.items}
          onPagination={this.props.setPage}
        />
      </section>
    )
  }
}

function mapStateToProps(state) {
  const { list, query } = state.pulls;
  const { total, page, perPage, items } = list;
  const { q } = query;

  return {
    q,
    total,
    page,
    perPage,
    items: items.map(item => {
      return {
        number: item.number,
        title: item.title,
        body: item.body,
        htmlUrl: item.htmlUrl,
        creator: item.creator,
        createdAt: item.createdAt,
      }
    })
  };
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => {
      dispatch(actions.setPage(1));
      dispatch(actions.setRole(types.Role.Author));
      dispatch(actions.fetchPullRequests());
    },
    setSearchBy: (value) => {
      dispatch(actions.setRole(value));
      dispatch(actions.fetchPullRequests());
    },
    setPage: (page) => {
      dispatch(actions.setPage(page));
      dispatch(actions.fetchPullRequests());
    },
    signout: () => {
      dispatch(signin.actions.signout());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
