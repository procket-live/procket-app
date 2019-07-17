import React, { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ alignItems: 'center' }}
                {...this.props}
            />
        )
    }
}

export default Listing;
