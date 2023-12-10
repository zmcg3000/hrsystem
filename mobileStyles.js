import { StyleSheet, Dimensions } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

// Constants for logo and navbar dimensions
export const logoHeight = Dimensions.get('window').width * 0.25;
export const navbarHeight = Dimensions.get('window').height * 0.08;

// Color scheme for the app
const colors = {
    roiRed: '#941a1d',
    roiCharcoal: '#262626',
    roiGrey: '#595959',
    white: '#ffffff',
    roiBurntOrange: '#c64c38',
    roiLightOrange: '#cb6d4f',
    roiMidGrey: '#3b3b3b',
    roiLightGrey: '#D9D9D9',
};

// Common text styles used throughout the app
const textStyles = {
    title: {
        fontSize: RFValue(21),
        color: colors.roiCharcoal,
        textAlign: 'right',
        fontFamily: 'Arial',
    },
    subtitle: {
        fontSize: RFValue(13),
        color: colors.roiCharcoal,
        textAlign: 'right',
        fontFamily: 'Arial',
    },
    heading1: {
        fontSize: RFValue(16),
        color: colors.roiRed,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },
    heading2: {
        fontSize: RFValue(10),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    heading3: {
        fontSize: RFValue(12),
        color: colors.roiGrey,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },
    normalText: {
        fontSize: RFValue(10),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    footer: {
        fontSize: RFValue(13),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    listItem: {
        fontSize: RFValue(16),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    profileText: {
        fontSize: RFValue(16),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
        marginBottom: 10,
    },
    tabButtonText: {
        fontSize: RFValue(16),
        color: colors.roiCharcoal,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        marginTop: RFPercentage(2),
    },
    topBar: {
        height: logoHeight,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topBarPlaceholder: {

    },
    topBarSpacer: {
        width: 50,
    },
    topBarText: {
        fontSize: RFValue(24),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    topBarLogo: {
        width: RFPercentage(18),
        height: logoHeight,
        paddingBottom: RFPercentage(1),
    },
    topBarLogoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    topBarIcon: {
        position: 'absolute',
        paddingRight: 20,
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        elevation: 20,
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20,
    },
};

// Layout related styles for various components
const layoutStyles = {
    container: {
        flex: 1,
        paddingHorizontal: RFPercentage(2),
        paddingBottom: RFPercentage(2) + navbarHeight,
        backgroundColor: colors.white,
    },
    searchBar: {
        borderWidth: 1,
        borderColor: colors.roiMidGrey,
        borderRadius: 5,
        padding: RFPercentage(2),
        marginBottom: RFPercentage(2),
        marginTop: RFPercentage(2),
        fontFamily: 'Arial',
        elevation: 2,
    },
    list: {
        flex: 1,
    },
    listItem: {
        paddingVertical: RFPercentage(3),
        paddingHorizontal: RFPercentage(2),
        borderBottomWidth: 1,
        borderBottomColor: colors.roiLightGrey,
    },
    button: {
        backgroundColor: colors.roiRed,
        paddingVertical: RFPercentage(2),
        paddingHorizontal: RFPercentage(2),
        borderRadius: 5,
        elevation: 2,
        marginHorizontal: RFPercentage(1),
    },
    buttonText: {
        color: colors.white,
        fontSize: RFValue(14),
        fontFamily: 'Arial',
        textAlign: 'center',
    },
    fixedActionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: RFPercentage(2),
        paddingBottom: RFPercentage(2),
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: RFPercentage(2) + navbarHeight,
        marginTop: 1,
        marginLeft: RFPercentage(1),
        marginRight: RFPercentage(1),
    },
    profileSection: {
        padding: RFPercentage(2),
        borderBottomWidth: 1,
        borderBottomColor: colors.roiLightGrey,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: RFPercentage(2),
    },
    input: {
        borderWidth: 1,
        borderColor: colors.roiMidGrey,
        borderRadius: 5,
        padding: RFPercentage(1),
        marginBottom: RFPercentage(0.5),
        marginTop: RFPercentage(0.5),
        fontFamily: 'Arial',
        fontSize: RFValue(14),
        color: colors.roiCharcoal,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: RFPercentage(2),
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: RFPercentage(1),
        backgroundColor: 'transparent',
        borderTopWidth: 1,
        borderTopColor: colors.roiMidGrey,
        height: navbarHeight,
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: RFPercentage(0.5),
        height: '100%',
        flex: 1,
    },
    safeArea: {
        height: 15,
        flex: 0,
        backgroundColor: 'transparent',
    },
};

// Combining text styles and layout styles into one exportable object
export const styles = StyleSheet.create({
    ...textStyles,
    ...layoutStyles,
    // Additional styles specific to components
    topBarLogoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: logoHeight,
        marginRight: 50,
    },
    topBarLogoContainerWithBack: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -30,
        flex: 1,
    },
    iconContainer: {
        paddingLeft: 15,
        paddingRight: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        position: 'absolute',
        right: 10,
        height: logoHeight,
    },
    topBarLogo: {
        width: RFPercentage(18),
        height: logoHeight,
        resizeMode: 'contain',
        marginLeft: RFPercentage(47),
    },
    list: {
        flex: 1,
    },
});
