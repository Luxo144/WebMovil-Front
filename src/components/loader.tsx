import React,{FC} from "react";  
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native'

const Loader:FC = () => {
    return(
        <View style={[StyleSheet.absoluteFillObject,styles.container]}>
            <LottieView source={require('../../assets/loader1.json')} autoPlay loop style={{ width: 200, height: 200 }}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        zIndex:1
    }
})

export default Loader;