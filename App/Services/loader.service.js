import Loading from 'react-native-loader-overlay';

class Loader {
    static start() {
        this.loading = Loading.show({
            color: '#FFFFFF',
            size: 20,
            overlayColor: 'rgba(0,0,0,0.5)',
            closeOnTouch: false,
            loadingType: 'Spinner', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
        });
    }

    static stop() {
        Loading.hide(this.loading);
    }
}

export default Loader;
