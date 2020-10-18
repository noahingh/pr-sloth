import React from 'react';
import PropTypes from 'prop-types';
import { List, Row, Col, Button } from 'antd';
import { PullRequestOutlined } from '@ant-design/icons';
import browser from 'webextension-polyfill';
import moment from 'moment'

export default class PRList extends React.Component {
    openWebPage(url) {
        browser.tabs.create({ url });
    }

    getFromNow(date) {
        return moment(date).fromNow();
    }

    render() {
        const header =
            <Row>
                <Col><PullRequestOutlined style={{ fontSize: 16 }} /> {this.props.totalCount} Opened</Col>
            </Row>
        return (
            <List
                style={{ borderRadius: "5px" }}
                bordered={true}
                header={header}
                itemLayout="horizontal"
                // size="large"
                pagination={{
                    current: this.props.page,
                    pageSize: this.props.perPage,
                    total: this.props.totalCount,
                    onChange: (page, pageSize) => {
                        this.props.onPagination(page, pageSize);
                    },
                }}
                dataSource={this.props.pullRequests}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <div>
                                    <PullRequestOutlined style={{ fontSize: 16, color: "green" }} />
                                    <Button
                                        style={{ color: 'gray', padding: '4px 1px' }}
                                        type="link"
                                        onClick={() => { this.openWebPage(item.repoHtmlUrl) }}
                                    >
                                        {item.repoFullName}
                                    </Button>
                                    <Button
                                        style={{ color: 'black' }}
                                        type="link"
                                        onClick={() => { this.openWebPage(item.htmlUrl) }}
                                    >
                                        {item.title}
                                    </Button>
                                </div>
                            }
                            description={
                                '#' + item.number.toString() + ' opened ' + this.getFromNow(item.createdAt) + ' by ' + item.creator + '.'
                            }
                        />
                    </List.Item>
                )}
            />
        );
    }
}

PRList.propTypes = {
    /**
     * Size of items.
     */
    totalCount: PropTypes.number,
    /**
     * Current page number.
     */
    page: PropTypes.number,
    /**
     * Number of items per page.
     */
    perPage: PropTypes.number,
    /**
     * Array of objects.
     */
    pullRequests: PropTypes.arrayOf(PropTypes.exact({
        // pull request.
        number: PropTypes.number,
        title: PropTypes.string,
        htmlUrl: PropTypes.string,
        creator: PropTypes.string,
        createdAt: PropTypes.object,
        // repository.
        repoFullName: PropTypes.string,
        repoHtmlUrl: PropTypes.string,
    })),
    /**
     * Function of onChange of pagniation.
     */
    onPagination: PropTypes.func,
}
