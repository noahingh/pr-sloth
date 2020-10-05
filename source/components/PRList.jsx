import React from 'react';
import PropTypes from 'prop-types';
import { List, Row, Col } from 'antd';
import { PullRequestOutlined } from '@ant-design/icons';

export default class PRList extends React.Component {
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
                    defaultPageSize: 3,
                    total: this.props.totalCount,
                    onChange: (page, pageSize) => {
                        this.onPagination(page, pageSize);
                    },
                }}
                dataSource={this.props.pullRequests}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <div>
                                    <PullRequestOutlined style={{ fontSize: 16, color: "green" }} />
                                    <a style={{ color: "gray" }} href="https://ant.design">{item.fullName}</a>&nbsp;&nbsp;
                                    <a style={{ color: "black" }} href="https://ant.design">{item.title}</a>
                                </div>
                            }
                            // TODO: Change into fields.
                            description={<p>#3962 opened 27 days ago by ....</p>}
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
     * Array of objects.
     */
    pullRequests: PropTypes.arrayOf(PropTypes.exact({
        fullName: PropTypes.string,
        title: PropTypes.string,
    })),
    /**
     * Function of onChange of pagniation.
     */
    onPagination: PropTypes.func,
}
