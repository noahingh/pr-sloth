import React from 'react';
import { List, Row, Col, Button } from 'antd';
import { PullRequestOutlined } from '@ant-design/icons';
import { browser } from 'webextension-polyfill-ts';
import moment from 'moment';
import PRPopover from './PRPopover';

type Props = {
    total: number;
    page: number;
    perPage: number;
    onPagination(page: number, perPage?: number): void;
    pullRequests: Array<PullRequest>;
}

type PullRequest = {
    number: number;
    title: string;
    body: string;
    htmlUrl: string
    repoFullName: string;
    repoHtmlUrl: string;
    creator: string;
    createdAt: Date;
}

export default class PRList extends React.Component<Props> {
    openWebPage(url: string) {
        browser.tabs.create({ url, active: false });
    }

    getFromNow(date: Date) {
        return moment(date).fromNow();
    }

    render() {
        const header =
            <Row>
                <Col><PullRequestOutlined style={{ fontSize: 16 }} /> {this.props.total} Opened</Col>
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
                    total: this.props.total,
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
                                    <PRPopover
                                        title={item.title}
                                        number={item.number}
                                        description={item.body}
                                    >
                                        <Button
                                            style={{ color: 'black' }}
                                            type="link"
                                            onClick={() => { this.openWebPage(item.htmlUrl) }}
                                        >
                                            {item.title}
                                        </Button>
                                    </PRPopover>
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

