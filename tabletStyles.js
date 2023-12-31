import { StyleSheet, Dimensions } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

// Use a base width for scaling calculations
const baseWidth = 768;
const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / baseWidth;

// Constants for logo dimensions
const logoWidth = 424; // Add this line
const logoHeight = deviceWidth * 0.1;
const navbarHeight = Dimensions.get('window').height * 0.03;

// Color scheme for the app, same as mobileStyles.js
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

// Scale up text sizes proportionally
const textStyles = {
    title: {
        fontSize: RFValue(21 * scale),
        color: colors.roiCharcoal,
        textAlign: 'right',
        fontFamily: 'Arial',
    },
    subtitle: {
        fontSize: RFValue(13 * scale),
        color: colors.roiCharcoal,
        textAlign: 'right',
        fontFamily: 'Arial',
    },
    heading1: {
        fontSize: RFValue(16 * scale),
        color: colors.roiRed,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },
    heading2: {
        fontSize: RFValue(10 * scale),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    heading3: {
        fontSize: RFValue(12 * scale),
        color: colors.roiGrey,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },
    normalText: {
        fontSize: RFValue(10 * scale),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    footer: {
        fontSize: RFValue(13 * scale),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    listItem: {
        fontSize: RFValue(16 * scale),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    profileText: {
        fontSize: RFValue(16 * scale),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
        marginBottom: 10,
    },
    tabButtonText: {
        fontSize: RFValue(16 * scale),
        color: colors.roiCharcoal,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        marginTop: RFPercentage(2 * scale),
    },
    topBar: {
        height: logoHeight,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: RFPercentage(2),
    },
    logoContainerStyle: {
        paddingLeft: RFPercentage(50),
    },
    topBarPlaceholder: {

    },
    topBarSpacer: {
        flex: 1,
    },
    topBarText: {
        fontSize: RFValue(24),
        color: colors.roiCharcoal,
        fontFamily: 'Arial',
    },
    topBarLogoImage: {
        width: RFPercentage(18),
        height: logoHeight,
    },
    topBarLogoFirstPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: RFPercentage(50),
    },
    topBarLogoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: RFPercentage(49.5),
    },
    topBarLogoContainerWithBack: {
        flexShrink: 1,
        flexGrow: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: RFPercentage(35),
    },
    gearIconContainer: {
        position: 'absolute',
        right: RFPercentage(-49),
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    gearIconContainerWithBack: {
        position: 'absolute',
        right: RFPercentage(-40),
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    gearIcon: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
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
        width: '50%',
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

// Scale up layout styles proportionally
const layoutStyles = {
    container: {
        flex: 1,
        paddingHorizontal: RFPercentage(2 * scale),
        paddingBottom: RFPercentage(2 * scale) + navbarHeight,
        backgroundColor: colors.white,
    },
    searchBar: {
        borderWidth: 1,
        borderColor: colors.roiMidGrey,
        borderRadius: 5,
        padding: RFPercentage(2 * scale),
        marginBottom: RFPercentage(2 * scale),
        marginTop: RFPercentage(2 * scale),
        fontFamily: 'Arial',
        elevation: 2,
    },
    list: {
        flex: 1,
    },
    listItem: {
        paddingVertical: RFPercentage(3 * scale),
        paddingHorizontal: RFPercentage(2 * scale),
        borderBottomWidth: 1,
        borderBottomColor: colors.roiLightGrey,
    },
    button: {
        backgroundColor: colors.roiRed,
        paddingVertical: RFPercentage(2 * scale),
        paddingHorizontal: RFPercentage(2 * scale),
        borderRadius: 5,
        elevation: 2,
        marginHorizontal: RFPercentage(1 * scale),
    },
    buttonText: {
        color: colors.white,
        fontSize: RFValue(14 * scale),
        fontFamily: 'Arial',
        textAlign: 'center',
    },
    fixedActionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: RFPercentage(2 * scale),
        paddingBottom: RFPercentage(2 * scale),
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: RFPercentage(2 * scale) + navbarHeight,
        marginTop: 1,
        marginLeft: RFPercentage(1 * scale),
        marginRight: RFPercentage(1 * scale),
    },
    profileSection: {
        padding: RFPercentage(2 * scale),
        borderBottomWidth: 1,
        borderBottomColor: colors.roiLightGrey,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: RFPercentage(2 * scale),
    },
    input: {
        borderWidth: 1,
        borderColor: colors.roiMidGrey,
        borderRadius: 5,
        padding: RFPercentage(1 * scale),
        marginBottom: RFPercentage(0.5 * scale),
        marginTop: RFPercentage(0.5 * scale),
        fontFamily: 'Arial',
        fontSize: RFValue(14 * scale),
        color: colors.roiCharcoal,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: RFPercentage(2 * scale),
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: RFPercentage(1 * scale),
        backgroundColor: 'transparent',
        borderTopWidth: 1,
        borderTopColor: colors.roiMidGrey,
        height: navbarHeight,
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: RFPercentage(0.5 * scale),
        height: '100%',
        flex: 1,
    },
    safeArea: {
        flex: 0,
        backgroundColor: 'transparent',
        paddingBottom: 50,
    },
};


// Combining text styles and layout styles into one exportable object
const styles = StyleSheet.create({
    ...textStyles,
    ...layoutStyles,
});

export default styles;