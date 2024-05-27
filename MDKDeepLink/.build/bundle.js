(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MDKDeepLink/i18n/i18n.properties":
/*!************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/i18n/i18n.properties ***!
  \************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Application/AppUpdateFailure.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Application/AppUpdateFailure.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/MDKDeepLink/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Application/AppUpdateSuccess.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Application/AppUpdateSuccess.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDKDeepLink/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDKDeepLink/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Application/ClientIsMultiUserMode.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Application/ClientIsMultiUserMode.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Application/GetClientSupportVersions.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Application/GetClientSupportVersions.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Application/GetClientVersion.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Application/GetClientVersion.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Application/OnWillUpdate.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Application/OnWillUpdate.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/MDKDeepLink/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Application/ResetAppSettingsAndLogout.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/MDKDeepLink/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Logging/LogLevels.js":
/*!******************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Logging/LogLevels.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Logging/SetTraceCategories.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Logging/SetTraceCategories.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Logging/SetUserLogLevel.js":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Logging/SetUserLogLevel.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Logging/ToggleLogging.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Logging/ToggleLogging.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Logging/TraceCategories.js":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Logging/TraceCategories.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/Logging/UserLogSetting.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/Logging/UserLogSetting.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/OpenSAPMobileCards.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/OpenSAPMobileCards.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenSAPMobileCards)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function OpenSAPMobileCards(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;
    // Get the Nativescript Platform Module
    const platformModule = clientAPI.nativescript.platformModule;
    return clientAPI.executeAction('/MDKDeepLink/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            //This will open SAP Mobile Cards app
            if (platformModule.isIOS) {
                return utilsModule.openUrl("com.sap.content2go://");
            } else if (platformModule.isAndroid) {
                return utilsModule.openUrl("https://mobileservices.cloud.sap/mobilecards");
            }

        } else {
            return Promise.reject('User Deferred');
        }
    });
}


/***/ }),

/***/ "./build.definitions/MDKDeepLink/Rules/OpenSAPcom.js":
/*!***********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Rules/OpenSAPcom.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenSAPcom)
/* harmony export */ });
/**
 * Describe this function...
* @param {IClientAPI} clientAPI
*/
function OpenSAPcom(clientAPI) {
    // Get the Nativescript Utils Module
    const utilsModule = clientAPI.nativescript.utilsModule;
    return clientAPI.executeAction('/MDKDeepLink/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            //This will open SAP.com website
            return utilsModule.openUrl("https://www.sap.com");
        } else {
            return Promise.reject('User Deferred');
        }
    });
}


/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let mdkdeeplink_actions_application_appupdate_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/AppUpdate.action */ "./build.definitions/MDKDeepLink/Actions/Application/AppUpdate.action")
let mdkdeeplink_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/MDKDeepLink/Actions/Application/AppUpdateFailureMessage.action")
let mdkdeeplink_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/MDKDeepLink/Actions/Application/AppUpdateProgressBanner.action")
let mdkdeeplink_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/MDKDeepLink/Actions/Application/AppUpdateSuccessMessage.action")
let mdkdeeplink_actions_application_logout_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/Logout.action */ "./build.definitions/MDKDeepLink/Actions/Application/Logout.action")
let mdkdeeplink_actions_application_navtoabout_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/NavToAbout.action */ "./build.definitions/MDKDeepLink/Actions/Application/NavToAbout.action")
let mdkdeeplink_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/NavToActivityLog.action */ "./build.definitions/MDKDeepLink/Actions/Application/NavToActivityLog.action")
let mdkdeeplink_actions_application_navtosupport_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/NavToSupport.action */ "./build.definitions/MDKDeepLink/Actions/Application/NavToSupport.action")
let mdkdeeplink_actions_application_onwillupdate_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/OnWillUpdate.action */ "./build.definitions/MDKDeepLink/Actions/Application/OnWillUpdate.action")
let mdkdeeplink_actions_application_reset_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/Reset.action */ "./build.definitions/MDKDeepLink/Actions/Application/Reset.action")
let mdkdeeplink_actions_application_resetmessage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/ResetMessage.action */ "./build.definitions/MDKDeepLink/Actions/Application/ResetMessage.action")
let mdkdeeplink_actions_application_usermenupopover_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Application/UserMenuPopover.action */ "./build.definitions/MDKDeepLink/Actions/Application/UserMenuPopover.action")
let mdkdeeplink_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDKDeepLink/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDKDeepLink/Actions/CloseModalPage_Complete.action")
let mdkdeeplink_actions_closepage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/ClosePage.action */ "./build.definitions/MDKDeepLink/Actions/ClosePage.action")
let mdkdeeplink_actions_confirmation_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Confirmation.action */ "./build.definitions/MDKDeepLink/Actions/Confirmation.action")
let mdkdeeplink_actions_genericbannermessage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/GenericBannerMessage.action */ "./build.definitions/MDKDeepLink/Actions/GenericBannerMessage.action")
let mdkdeeplink_actions_genericmessagebox_action = __webpack_require__(/*! ./MDKDeepLink/Actions/GenericMessageBox.action */ "./build.definitions/MDKDeepLink/Actions/GenericMessageBox.action")
let mdkdeeplink_actions_genericnavigation_action = __webpack_require__(/*! ./MDKDeepLink/Actions/GenericNavigation.action */ "./build.definitions/MDKDeepLink/Actions/GenericNavigation.action")
let mdkdeeplink_actions_generictoastmessage_action = __webpack_require__(/*! ./MDKDeepLink/Actions/GenericToastMessage.action */ "./build.definitions/MDKDeepLink/Actions/GenericToastMessage.action")
let mdkdeeplink_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Logging/LogUploadFailure.action */ "./build.definitions/MDKDeepLink/Actions/Logging/LogUploadFailure.action")
let mdkdeeplink_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/MDKDeepLink/Actions/Logging/LogUploadSuccessful.action")
let mdkdeeplink_actions_logging_uploadlog_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Logging/UploadLog.action */ "./build.definitions/MDKDeepLink/Actions/Logging/UploadLog.action")
let mdkdeeplink_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./MDKDeepLink/Actions/Logging/UploadLogProgress.action */ "./build.definitions/MDKDeepLink/Actions/Logging/UploadLogProgress.action")
let mdkdeeplink_globals_application_appdefinition_version_global = __webpack_require__(/*! ./MDKDeepLink/Globals/Application/AppDefinition_Version.global */ "./build.definitions/MDKDeepLink/Globals/Application/AppDefinition_Version.global")
let mdkdeeplink_globals_application_applicationname_global = __webpack_require__(/*! ./MDKDeepLink/Globals/Application/ApplicationName.global */ "./build.definitions/MDKDeepLink/Globals/Application/ApplicationName.global")
let mdkdeeplink_globals_application_supportemail_global = __webpack_require__(/*! ./MDKDeepLink/Globals/Application/SupportEmail.global */ "./build.definitions/MDKDeepLink/Globals/Application/SupportEmail.global")
let mdkdeeplink_globals_application_supportphone_global = __webpack_require__(/*! ./MDKDeepLink/Globals/Application/SupportPhone.global */ "./build.definitions/MDKDeepLink/Globals/Application/SupportPhone.global")
let mdkdeeplink_i18n_i18n_properties = __webpack_require__(/*! ./MDKDeepLink/i18n/i18n.properties */ "./build.definitions/MDKDeepLink/i18n/i18n.properties")
let mdkdeeplink_jsconfig_json = __webpack_require__(/*! ./MDKDeepLink/jsconfig.json */ "./build.definitions/MDKDeepLink/jsconfig.json")
let mdkdeeplink_pages_application_about_page = __webpack_require__(/*! ./MDKDeepLink/Pages/Application/About.page */ "./build.definitions/MDKDeepLink/Pages/Application/About.page")
let mdkdeeplink_pages_application_support_page = __webpack_require__(/*! ./MDKDeepLink/Pages/Application/Support.page */ "./build.definitions/MDKDeepLink/Pages/Application/Support.page")
let mdkdeeplink_pages_application_useractivitylog_page = __webpack_require__(/*! ./MDKDeepLink/Pages/Application/UserActivityLog.page */ "./build.definitions/MDKDeepLink/Pages/Application/UserActivityLog.page")
let mdkdeeplink_pages_main_page = __webpack_require__(/*! ./MDKDeepLink/Pages/Main.page */ "./build.definitions/MDKDeepLink/Pages/Main.page")
let mdkdeeplink_rules_application_appupdatefailure_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Application/AppUpdateFailure.js */ "./build.definitions/MDKDeepLink/Rules/Application/AppUpdateFailure.js")
let mdkdeeplink_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/MDKDeepLink/Rules/Application/AppUpdateSuccess.js")
let mdkdeeplink_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/MDKDeepLink/Rules/Application/ClientIsMultiUserMode.js")
let mdkdeeplink_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/MDKDeepLink/Rules/Application/GetClientSupportVersions.js")
let mdkdeeplink_rules_application_getclientversion_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Application/GetClientVersion.js */ "./build.definitions/MDKDeepLink/Rules/Application/GetClientVersion.js")
let mdkdeeplink_rules_application_onwillupdate_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Application/OnWillUpdate.js */ "./build.definitions/MDKDeepLink/Rules/Application/OnWillUpdate.js")
let mdkdeeplink_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/MDKDeepLink/Rules/Application/ResetAppSettingsAndLogout.js")
let mdkdeeplink_rules_logging_loglevels_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Logging/LogLevels.js */ "./build.definitions/MDKDeepLink/Rules/Logging/LogLevels.js")
let mdkdeeplink_rules_logging_settracecategories_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Logging/SetTraceCategories.js */ "./build.definitions/MDKDeepLink/Rules/Logging/SetTraceCategories.js")
let mdkdeeplink_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/MDKDeepLink/Rules/Logging/SetUserLogLevel.js")
let mdkdeeplink_rules_logging_togglelogging_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Logging/ToggleLogging.js */ "./build.definitions/MDKDeepLink/Rules/Logging/ToggleLogging.js")
let mdkdeeplink_rules_logging_tracecategories_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Logging/TraceCategories.js */ "./build.definitions/MDKDeepLink/Rules/Logging/TraceCategories.js")
let mdkdeeplink_rules_logging_userlogsetting_js = __webpack_require__(/*! ./MDKDeepLink/Rules/Logging/UserLogSetting.js */ "./build.definitions/MDKDeepLink/Rules/Logging/UserLogSetting.js")
let mdkdeeplink_rules_opensapcom_js = __webpack_require__(/*! ./MDKDeepLink/Rules/OpenSAPcom.js */ "./build.definitions/MDKDeepLink/Rules/OpenSAPcom.js")
let mdkdeeplink_rules_opensapmobilecards_js = __webpack_require__(/*! ./MDKDeepLink/Rules/OpenSAPMobileCards.js */ "./build.definitions/MDKDeepLink/Rules/OpenSAPMobileCards.js")
let mdkdeeplink_styles_styles_css = __webpack_require__(/*! ./MDKDeepLink/Styles/Styles.css */ "./build.definitions/MDKDeepLink/Styles/Styles.css")
let mdkdeeplink_styles_styles_json = __webpack_require__(/*! ./MDKDeepLink/Styles/Styles.json */ "./build.definitions/MDKDeepLink/Styles/Styles.json")
let mdkdeeplink_styles_styles_less = __webpack_require__(/*! ./MDKDeepLink/Styles/Styles.less */ "./build.definitions/MDKDeepLink/Styles/Styles.less")
let mdkdeeplink_styles_styles_nss = __webpack_require__(/*! ./MDKDeepLink/Styles/Styles.nss */ "./build.definitions/MDKDeepLink/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mdkdeeplink_actions_application_appupdate_action : mdkdeeplink_actions_application_appupdate_action,
	mdkdeeplink_actions_application_appupdatefailuremessage_action : mdkdeeplink_actions_application_appupdatefailuremessage_action,
	mdkdeeplink_actions_application_appupdateprogressbanner_action : mdkdeeplink_actions_application_appupdateprogressbanner_action,
	mdkdeeplink_actions_application_appupdatesuccessmessage_action : mdkdeeplink_actions_application_appupdatesuccessmessage_action,
	mdkdeeplink_actions_application_logout_action : mdkdeeplink_actions_application_logout_action,
	mdkdeeplink_actions_application_navtoabout_action : mdkdeeplink_actions_application_navtoabout_action,
	mdkdeeplink_actions_application_navtoactivitylog_action : mdkdeeplink_actions_application_navtoactivitylog_action,
	mdkdeeplink_actions_application_navtosupport_action : mdkdeeplink_actions_application_navtosupport_action,
	mdkdeeplink_actions_application_onwillupdate_action : mdkdeeplink_actions_application_onwillupdate_action,
	mdkdeeplink_actions_application_reset_action : mdkdeeplink_actions_application_reset_action,
	mdkdeeplink_actions_application_resetmessage_action : mdkdeeplink_actions_application_resetmessage_action,
	mdkdeeplink_actions_application_usermenupopover_action : mdkdeeplink_actions_application_usermenupopover_action,
	mdkdeeplink_actions_closemodalpage_complete_action : mdkdeeplink_actions_closemodalpage_complete_action,
	mdkdeeplink_actions_closepage_action : mdkdeeplink_actions_closepage_action,
	mdkdeeplink_actions_confirmation_action : mdkdeeplink_actions_confirmation_action,
	mdkdeeplink_actions_genericbannermessage_action : mdkdeeplink_actions_genericbannermessage_action,
	mdkdeeplink_actions_genericmessagebox_action : mdkdeeplink_actions_genericmessagebox_action,
	mdkdeeplink_actions_genericnavigation_action : mdkdeeplink_actions_genericnavigation_action,
	mdkdeeplink_actions_generictoastmessage_action : mdkdeeplink_actions_generictoastmessage_action,
	mdkdeeplink_actions_logging_loguploadfailure_action : mdkdeeplink_actions_logging_loguploadfailure_action,
	mdkdeeplink_actions_logging_loguploadsuccessful_action : mdkdeeplink_actions_logging_loguploadsuccessful_action,
	mdkdeeplink_actions_logging_uploadlog_action : mdkdeeplink_actions_logging_uploadlog_action,
	mdkdeeplink_actions_logging_uploadlogprogress_action : mdkdeeplink_actions_logging_uploadlogprogress_action,
	mdkdeeplink_globals_application_appdefinition_version_global : mdkdeeplink_globals_application_appdefinition_version_global,
	mdkdeeplink_globals_application_applicationname_global : mdkdeeplink_globals_application_applicationname_global,
	mdkdeeplink_globals_application_supportemail_global : mdkdeeplink_globals_application_supportemail_global,
	mdkdeeplink_globals_application_supportphone_global : mdkdeeplink_globals_application_supportphone_global,
	mdkdeeplink_i18n_i18n_properties : mdkdeeplink_i18n_i18n_properties,
	mdkdeeplink_jsconfig_json : mdkdeeplink_jsconfig_json,
	mdkdeeplink_pages_application_about_page : mdkdeeplink_pages_application_about_page,
	mdkdeeplink_pages_application_support_page : mdkdeeplink_pages_application_support_page,
	mdkdeeplink_pages_application_useractivitylog_page : mdkdeeplink_pages_application_useractivitylog_page,
	mdkdeeplink_pages_main_page : mdkdeeplink_pages_main_page,
	mdkdeeplink_rules_application_appupdatefailure_js : mdkdeeplink_rules_application_appupdatefailure_js,
	mdkdeeplink_rules_application_appupdatesuccess_js : mdkdeeplink_rules_application_appupdatesuccess_js,
	mdkdeeplink_rules_application_clientismultiusermode_js : mdkdeeplink_rules_application_clientismultiusermode_js,
	mdkdeeplink_rules_application_getclientsupportversions_js : mdkdeeplink_rules_application_getclientsupportversions_js,
	mdkdeeplink_rules_application_getclientversion_js : mdkdeeplink_rules_application_getclientversion_js,
	mdkdeeplink_rules_application_onwillupdate_js : mdkdeeplink_rules_application_onwillupdate_js,
	mdkdeeplink_rules_application_resetappsettingsandlogout_js : mdkdeeplink_rules_application_resetappsettingsandlogout_js,
	mdkdeeplink_rules_logging_loglevels_js : mdkdeeplink_rules_logging_loglevels_js,
	mdkdeeplink_rules_logging_settracecategories_js : mdkdeeplink_rules_logging_settracecategories_js,
	mdkdeeplink_rules_logging_setuserloglevel_js : mdkdeeplink_rules_logging_setuserloglevel_js,
	mdkdeeplink_rules_logging_togglelogging_js : mdkdeeplink_rules_logging_togglelogging_js,
	mdkdeeplink_rules_logging_tracecategories_js : mdkdeeplink_rules_logging_tracecategories_js,
	mdkdeeplink_rules_logging_userlogsetting_js : mdkdeeplink_rules_logging_userlogsetting_js,
	mdkdeeplink_rules_opensapcom_js : mdkdeeplink_rules_opensapcom_js,
	mdkdeeplink_rules_opensapmobilecards_js : mdkdeeplink_rules_opensapmobilecards_js,
	mdkdeeplink_styles_styles_css : mdkdeeplink_styles_styles_css,
	mdkdeeplink_styles_styles_json : mdkdeeplink_styles_styles_json,
	mdkdeeplink_styles_styles_less : mdkdeeplink_styles_styles_less,
	mdkdeeplink_styles_styles_nss : mdkdeeplink_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Styles/Styles.css":
/*!*********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Styles/Styles.css ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/MDKDeepLink/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKDeepLink/Styles/Styles.less":
/*!**********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Styles/Styles.less ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/MDKDeepLink/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKDeepLink/Styles/Styles.nss":
/*!*********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Styles/Styles.nss ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Pages/Application/About.page":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Pages/Application/About.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/MDKDeepLink/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/MDKDeepLink/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/MDKDeepLink/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/MDKDeepLink/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MDKDeepLink/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Pages/Application/Support.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Pages/Application/Support.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/MDKDeepLink/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/MDKDeepLink/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/MDKDeepLink/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/MDKDeepLink/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MDKDeepLink/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Pages/Application/UserActivityLog.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Pages/Application/UserActivityLog.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/MDKDeepLink/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/MDKDeepLink/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/MDKDeepLink/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/MDKDeepLink/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/MDKDeepLink/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/MDKDeepLink/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/MDKDeepLink/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/MDKDeepLink/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Pages/Main.page":
/*!*******************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Pages/Main.page ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"_Name":"SectionButton0","Title":"Open SAP Mobile Cards","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKDeepLink/Rules/OpenSAPMobileCards.js"},{"_Name":"SectionButton1","Title":"Open SAP.com pages","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKDeepLink/Rules/OpenSAPcom.js"}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MDKDeepLink/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/MDKDeepLink/Pages/Main.page","OnWillUpdate":"/MDKDeepLink/Rules/Application/OnWillUpdate.js","Styles":"/MDKDeepLink/Styles/Styles.less","Localization":"/MDKDeepLink/i18n/i18n.properties","_Name":"MDKDeepLink","_SchemaVersion":"23.12","StyleSheets":{"Styles":{"css":"/MDKDeepLink/Styles/Styles.css","ios":"/MDKDeepLink/Styles/Styles.nss","android":"/MDKDeepLink/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/AppUpdate.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/AppUpdate.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDKDeepLink/Rules/Application/AppUpdateFailure.js","OnSuccess":"/MDKDeepLink/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/AppUpdateFailureMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/AppUpdateFailureMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/AppUpdateProgressBanner.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/AppUpdateProgressBanner.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDKDeepLink/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/AppUpdateSuccessMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/AppUpdateSuccessMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/Logout.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/Logout.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/NavToAbout.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/NavToAbout.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/MDKDeepLink/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/NavToActivityLog.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/NavToActivityLog.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/MDKDeepLink/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/NavToSupport.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/NavToSupport.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/MDKDeepLink/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/OnWillUpdate.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/OnWillUpdate.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/Reset.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/Reset.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/ResetMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/ResetMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/MDKDeepLink/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Application/UserMenuPopover.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Application/UserMenuPopover.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/MDKDeepLink/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/MDKDeepLink/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/MDKDeepLink/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/MDKDeepLink/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/MDKDeepLink/Actions/Application/Logout.action","Title":"Logout","Visible":"/MDKDeepLink/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/CloseModalPage_Complete.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/CloseModalPage_Complete.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/ClosePage.action":
/*!****************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/ClosePage.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Confirmation.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Confirmation.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"Confirmation"},"Message":"Do you want to leave the current app?","Title":"Confirm","OKCaption":"OK","CancelCaption":"Cancel"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/GenericBannerMessage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/GenericBannerMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/GenericMessageBox.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/GenericMessageBox.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/GenericNavigation.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/GenericNavigation.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/MDKDeepLink/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/GenericToastMessage.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/GenericToastMessage.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Logging/LogUploadFailure.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Logging/LogUploadFailure.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Logging/LogUploadSuccessful.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Logging/LogUploadSuccessful.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Logging/UploadLog.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Logging/UploadLog.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/MDKDeepLink/Actions/Logging/LogUploadFailure.action","OnSuccess":"/MDKDeepLink/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Actions/Logging/UploadLogProgress.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Actions/Logging/UploadLogProgress.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/MDKDeepLink/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Globals/Application/AppDefinition_Version.global":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Globals/Application/AppDefinition_Version.global ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Globals/Application/ApplicationName.global":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Globals/Application/ApplicationName.global ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Globals/Application/SupportEmail.global":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Globals/Application/SupportEmail.global ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Globals/Application/SupportPhone.global":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Globals/Application/SupportPhone.global ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/MDKDeepLink/Styles/Styles.json":
/*!**********************************************************!*\
  !*** ./build.definitions/MDKDeepLink/Styles/Styles.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDKDeepLink/jsconfig.json":
/*!*****************************************************!*\
  !*** ./build.definitions/MDKDeepLink/jsconfig.json ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map