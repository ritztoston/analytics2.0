import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class LinearBuffer extends React.Component {
    state = {
        completed: 20,
        buffer: 100,
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 600);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed } = this.state;
        if (completed < 90) {
            const diff = Math.random() * 10;
            this.setState({ completed: completed + diff});
        }
    };

    render() {
        const { completed, buffer } = this.state;
        return <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} color="primary" style={{zIndex: 9999}}/>
    }
}

export default LinearBuffer;