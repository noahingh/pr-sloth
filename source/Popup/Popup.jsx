import React from 'react';
// import browser from 'webextension-polyfill';
import { Row, Col } from 'antd';
import PRList from '../components/PRList';
import SearchByTabs from '../components/SearchByTabs';

// function openWebPage(url) {
//   return browser.tabs.create({ url });
// }

class Popup extends React.Component {
  render() {
    return (
      <section>
        <Row style={{marginBottom: "5px"}}>
          <Col>
            <SearchByTabs
              searchBys={this.props.searchBys}
              onChange={this.props.onSearchByChange}
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

export { Popup };
