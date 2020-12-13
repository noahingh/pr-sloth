import React from 'react';
import { List, Row, Col, Button } from 'antd';
import { PullRequestOutlined } from '@ant-design/icons';
import { browser } from 'webextension-polyfill-ts';
import moment from 'moment';
import PRPopover from './PRPopover';

export type PRListProps = {
    total: number;
    page: number;
    perPage: number;
    onPagination(page: number, perPage?: number): void;
    items: Array<PRItemProps>;
}

export default class PRList extends React.Component<PRListProps> {
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
                pagination={{
                    current: this.props.page,
                    pageSize: this.props.perPage,
                    total: this.props.total,
                    onChange: (page, pageSize) => {
                        this.props.onPagination(page, pageSize);
                    },
                }}
                dataSource={this.props.items}
                renderItem={item => (
                    <PRItem {...item} />
                )}
            />
        );
    }
}

type PRItemProps = {
    number: number;
    title: string;
    body: string;
    htmlUrl: string
    creator: string;
    createdAt: Date;
    repo: {
        fullName: string;
        htmlUrl: string;
    },
}

class PRItem extends React.Component<PRItemProps> {
    openWebPage(url: string) {
        browser.tabs.create({ url, active: false });
    }

    getFromNow(date: Date) {
        return moment(date).fromNow();
    }

    render() {
        const title = (
            <div>
                <PullRequestOutlined style={{ fontSize: 16, color: "green" }} />
                <Button
                    style={{ color: 'gray', padding: '4px 1px' }}
                    type="link"
                    onClick={() => { this.openWebPage(this.props.repo.htmlUrl) }}
                >
                    {this.props.repo.fullName}
                </Button>
                <PRPopover
                    title={this.props.title}
                    number={this.props.number}
                    description={this.props.body}
                >
                    <Button
                        style={{ color: 'black' }}
                        type="link"
                        onClick={() => { this.openWebPage(this.props.htmlUrl) }}
                    >
                        {this.props.title}
                    </Button>
                </PRPopover>
            </div>
        )
        return (
            <List.Item>
                <List.Item.Meta
                    title={title}
                    description={
                        '#' + this.props.number.toString() + ' opened ' + this.getFromNow(this.props.createdAt) + ' by ' + this.props.creator + '.'
                    }
                />
            </List.Item>

        )
    }
}
