import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Placeholder, { Line, Media } from "rn-placeholder";

import ImageService from '../../Services/image.service';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { YELLOW, TEXT_SECONDARY } from '../../Theme/colors';
import PlaceholderCustomAnimation from '../../Config/placeholderCustomAnimation.config';


class ImageCarousel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            index: 1
        }
    }

    RenderItem = ({ item }) => {
        return (
            <Image
                style={{ width: wp('100%'), height: hp('60%'), resizeMode: 'cover', }}
                source={{ uri: item.image_url }}
            />
        )
    }

    renderComponent = () => {
        return (
            <View style={{ height: hp('40%') }} >
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.images}
                    renderItem={this.RenderItem}
                    sliderWidth={wp('100%')}
                    itemWidth={wp('100%')}
                    hasParallaxImages={true}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    firstItem={1}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ index })}
                />
                <Pagination
                    dotsLength={this.props.images.length}
                    activeDotIndex={this.state.index}
                    containerStyle={styles.paginationContainer}
                    dotColor={YELLOW}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={TEXT_SECONDARY}
                    inactiveDotOpacity={0.9}
                    inactiveDotScale={1.2}
                    carouselRef={this._carousel}
                    tappableDots={!!this._carousel}
                />
            </View>
        )
    }


    render() {
        return (
            <Placeholder
                customAnimation={PlaceholderCustomAnimation}
                isReady={!this.props.loading}
                whenReadyRender={this.renderComponent}
            >
                <Line
                    style={{
                        width: '100%',
                        height: hp('40%'),
                        backgroundColor: 'transparent'
                    }}
                />
            </Placeholder>
        )
    }
}

const styles = StyleSheet.create({
    paginationContainer: {
        paddingVertical: 8,
        marginTop: -30
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 4,
        marginHorizontal: 8
    }
})

export default ImageCarousel;
