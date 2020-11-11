import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Row, Col } from 'antd';
import TextEllipsis from 'react-text-ellipsis';

export default class PRPopover extends React.Component {
    render() {
        const content = <PRContent
            title={this.props.title}
            number={this.props.number}
            description={this.props.description}
        />;

        return (
            <Popover
                content={content}
                trigger="hover"
            >
                {this.props.children}
            </Popover>
        );
    }
}

class PRContent extends React.Component {
    render() {
        return (
            <div style={{ width: '350px', padding: '10px' }}>
                <div>
                    <b>{this.props.title}</b> <span style={{ color: 'gray' }}>#{this.props.number}</span>
                </div>
                <TextEllipsis
                    lines={3}
                    tag={'p'}
                    ellipsisChars={'...'}
                    style={{ color: 'gray' }}
                >
                    <span style={{ color: 'gray' }}>{this.props.description}</span>
                </TextEllipsis>
            </div>
        );
    }
}

PRPopover.propTypes = {
    /**
     * The title of pull request.
     */
    title: PropTypes.string,

    /**
     * The number of pull request.
     */
    number: PropTypes.number,

    /**
     * The description of pull request. The ellipsis replaces characters over 3rd line.
     */
    description: PropTypes.string,
}
