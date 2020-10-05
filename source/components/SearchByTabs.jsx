import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

export default class SearchByTabs extends React.Component {
    state = { currentValue: (this.props.items.length > 0 ? this.props.items[0].value : "") };

    render() {
        const { currentValue } = this.state;
        return (
            <Radio.Group
                onChange={e => {
                    this.setState({ currentValue: e.target.value });
                    this.props.onChange(e.target.value);
                }}
                value={currentValue}
                style={{ marginBottom: 8, borderRadius: "6px" }}>
                {
                    this.props.items.map((item => {
                        return <Radio.Button value={item.value}>{item.display}</Radio.Button>
                    }))
                }
            </Radio.Group>
        )
    }
}

SearchByTabs.propTypes = {
    /**
     * Array of objects.
     */
    items: PropTypes.arrayOf(PropTypes.exact({
        display: PropTypes.string,
        value: PropTypes.string,
    })),
    /**
     * Function of onChange.
     */
    onChange: PropTypes.func,
}
