/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/DeepLinkIntoMDKApp/i18n/i18n.properties":
/*!*******************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/i18n/i18n.properties ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "PRODUCT_NAME=PRODUCT_NAME\nPRODUCT_CATEGORY=PRODUCT_CATEGORY\nPRODUCT_SHORT_DESCRIPTION=PRODUCT_SHORT_DESCRIPTION\nPRODUCT_LONG_DESCRIPTION=PRODUCT_LONG_DESCRIPTION\nPRODUCT_PRICE=PRODUCT_PRICE\nPRODUCT_WEIGHT=PRODUCT_WEIGHT\nPRODUCT_HEIGHT=PRODUCT_HEIGHT\nPRODUCT_DEPTH=PRODUCT_DEPTH\nPRODUCT_WIDTH=PRODUCT_WIDTH\nPRODUCT_TYPE=PRODUCT_TYPE\nPRODUCT_TYPES=PRODUCT_TYPES\nPRODUCT_PRODUCT_ID=PRODUCT_PRODUCT_ID\nPRODUCT_UNIT=PRODUCT_UNIT\nPRODUCT_WEIGHT_UNIT=PRODUCT_WEIGHT_UNIT\nPRODUCT_QUANTITY_UNIT=PRODUCT_QUANTITY_UNIT\nPRODUCT_CATEGORY_NAME=PRODUCT_CATEGORY_NAME\nPRODUCT_CURENCY_CODE=PRODUCT_CURENCY_CODE\nPRODUCT_PICTURE_URL=PRODUCT_PICTURE_URL\nPRODUCT_SUPPLIER_ID=PRODUCT_SUPPLIER_ID\nPRODUCT_UPDATE_TIMESTAMP=PRODUCT_UPDATE_TIMESTAMP\n"

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/AppUpdateFailure.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Application/AppUpdateFailure.js ***!
  \************************************************************************************/
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
        "Name": "/DeepLinkIntoMDKApp/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/AppUpdateSuccess.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Application/AppUpdateSuccess.js ***!
  \************************************************************************************/
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
                "Name": "/DeepLinkIntoMDKApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/DeepLinkIntoMDKApp/Actions/Application/AppUpdateSuccessMessage.action",
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/ClientIsMultiUserMode.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Application/ClientIsMultiUserMode.js ***!
  \*****************************************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/GetClientSupportVersions.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Application/GetClientSupportVersions.js ***!
  \********************************************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/GetClientVersion.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Application/GetClientVersion.js ***!
  \************************************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/OnWillUpdate.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Application/OnWillUpdate.js ***!
  \********************************************************************************/
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
    return clientAPI.executeAction('/DeepLinkIntoMDKApp/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/DeepLinkIntoMDKApp/Actions/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/ResetAppSettingsAndLogout.js":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \*********************************************************************************************/
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
        return clientAPI.getPageProxy().executeAction('/DeepLinkIntoMDKApp/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
    context.count('/DeepLinkIntoMDKApp/Services/SampleServiceV4.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/DeepLinkIntoMDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/LinkDataReceived.js":
/*!************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/LinkDataReceived.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkDataReceived)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} context
*/

function LinkDataReceived(context) {
    context.getLogger().log(`Link Data Received Triggered`,'Info');
    let linkData = context.getAppEventData();
    let data;

    try {
        data = JSON.parse(linkData);
    } catch (error) {
        return null;
    }

    let splitURL = data.URL.split('/');
    let action = splitURL[3];
    let entity = splitURL.length > 4 ? splitURL[4] : '';

    switch (action) {
        case 'search':
            if (entity === 'product') {
                return openProductListWithFilter(context, data.Parameters);
            }
            break;
        case 'product':
            if (data.Parameters && data.Parameters.id) {
                return openProductByID(context, data.Parameters.id);
            }
            break;
        default:
            context.getLogger().log(`Unrecognized Link Path ${data.URL}`,'Error');
            break;
    }
}

function openProductByID(context, id) {
    context.getLogger().log(`ID: ${id}`,'Debug');
    return context.read('/DeepLinkIntoMDKApp/Services/SampleServiceV4.service', `Products(${id})`, [], null).then(function (result) {
        if (result.length) {
            context.getPageProxy().setActionBinding(result.getItem(0));
            return context.getPageProxy().executeAction('/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_Detail.action');
        }
    });
}

function openProductListWithFilter(context, parametersObj) {
    let pageData = context.getPageProxy().getPageDefinition('/DeepLinkIntoMDKApp/Pages/Products/Products_List.page');
    var filterQO = '$filter=';
    for (var key in parametersObj) {
        var value = parametersObj[key];
        filterQO += `${key} eq '${value}' and `;
    }
    if (filterQO.slice(-5) === ' and ') {
        filterQO = filterQO.slice(0, filterQO.length - 5);
    }
    context.getLogger().log(`${filterQO}`,'Debug');
    pageData.Controls[0].Sections[0].Target.QueryOptions = filterQO;
    return context.getPageProxy().executeAction({
        "Name": '/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_List.action',
        "Properties": {
            "PageMetadata": pageData
        }
    });
}


/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/LogLevels.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/LogLevels.js ***!
  \*************************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/SetTraceCategories.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/SetTraceCategories.js ***!
  \**********************************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/SetUserLogLevel.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/SetUserLogLevel.js ***!
  \*******************************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/ToggleLogging.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/ToggleLogging.js ***!
  \*****************************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/TraceCategories.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/TraceCategories.js ***!
  \*******************************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/UserLogSetting.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/UserLogSetting.js ***!
  \******************************************************************************/
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

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let deeplinkintomdkapp_actions_application_appupdate_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/AppUpdate.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdate.action")
let deeplinkintomdkapp_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdateFailureMessage.action")
let deeplinkintomdkapp_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdateProgressBanner.action")
let deeplinkintomdkapp_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdateSuccessMessage.action")
let deeplinkintomdkapp_actions_application_logout_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/Logout.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/Logout.action")
let deeplinkintomdkapp_actions_application_navtoabout_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/NavToAbout.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/NavToAbout.action")
let deeplinkintomdkapp_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/NavToActivityLog.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/NavToActivityLog.action")
let deeplinkintomdkapp_actions_application_navtosupport_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/NavToSupport.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/NavToSupport.action")
let deeplinkintomdkapp_actions_application_onwillupdate_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/OnWillUpdate.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/OnWillUpdate.action")
let deeplinkintomdkapp_actions_application_reset_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/Reset.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/Reset.action")
let deeplinkintomdkapp_actions_application_resetmessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/ResetMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/ResetMessage.action")
let deeplinkintomdkapp_actions_application_usermenupopover_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Application/UserMenuPopover.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/UserMenuPopover.action")
let deeplinkintomdkapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/CloseModalPage_Cancel.action")
let deeplinkintomdkapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/CloseModalPage_Complete.action")
let deeplinkintomdkapp_actions_closepage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/ClosePage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/ClosePage.action")
let deeplinkintomdkapp_actions_customers_navtocustomers_detail_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_Detail.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_Detail.action")
let deeplinkintomdkapp_actions_customers_navtocustomers_list_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_List.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_List.action")
let deeplinkintomdkapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let deeplinkintomdkapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let deeplinkintomdkapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
let deeplinkintomdkapp_actions_genericbannermessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/GenericBannerMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/GenericBannerMessage.action")
let deeplinkintomdkapp_actions_genericmessagebox_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/GenericMessageBox.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/GenericMessageBox.action")
let deeplinkintomdkapp_actions_genericnavigation_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/GenericNavigation.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/GenericNavigation.action")
let deeplinkintomdkapp_actions_generictoastmessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/GenericToastMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/GenericToastMessage.action")
let deeplinkintomdkapp_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Logging/LogUploadFailure.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/LogUploadFailure.action")
let deeplinkintomdkapp_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/LogUploadSuccessful.action")
let deeplinkintomdkapp_actions_logging_uploadlog_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Logging/UploadLog.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/UploadLog.action")
let deeplinkintomdkapp_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Logging/UploadLogProgress.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/UploadLogProgress.action")
let deeplinkintomdkapp_actions_products_navtoproducts_detail_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Products/NavToProducts_Detail.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_Detail.action")
let deeplinkintomdkapp_actions_products_navtoproducts_list_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Products/NavToProducts_List.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_List.action")
let deeplinkintomdkapp_actions_purchaseorderitems_navtopurchaseorderitems_detail_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action")
let deeplinkintomdkapp_actions_salesorderheaders_navtosalesorderheaders_detail_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action")
let deeplinkintomdkapp_actions_salesorderitems_navtosalesorderitems_detail_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action")
let deeplinkintomdkapp_actions_service_closeoffline_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/CloseOffline.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/CloseOffline.action")
let deeplinkintomdkapp_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/CloseOfflineFailureMessage.action")
let deeplinkintomdkapp_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/CloseOfflineSuccessMessage.action")
let deeplinkintomdkapp_actions_service_downloadoffline_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/DownloadOffline.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/DownloadOffline.action")
let deeplinkintomdkapp_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/DownloadStartedMessage.action")
let deeplinkintomdkapp_actions_service_initializeoffline_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/InitializeOffline.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/InitializeOffline.action")
let deeplinkintomdkapp_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineFailureMessage.action")
let deeplinkintomdkapp_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineSuccessMessage.action")
let deeplinkintomdkapp_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/SyncFailureMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/SyncFailureMessage.action")
let deeplinkintomdkapp_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/SyncStartedMessage.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/SyncStartedMessage.action")
let deeplinkintomdkapp_actions_service_uploadoffline_action = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Actions/Service/UploadOffline.action */ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/UploadOffline.action")
let deeplinkintomdkapp_globals_application_appdefinition_version_global = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Globals/Application/AppDefinition_Version.global */ "./build.definitions/DeepLinkIntoMDKApp/Globals/Application/AppDefinition_Version.global")
let deeplinkintomdkapp_globals_application_applicationname_global = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Globals/Application/ApplicationName.global */ "./build.definitions/DeepLinkIntoMDKApp/Globals/Application/ApplicationName.global")
let deeplinkintomdkapp_globals_application_supportemail_global = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Globals/Application/SupportEmail.global */ "./build.definitions/DeepLinkIntoMDKApp/Globals/Application/SupportEmail.global")
let deeplinkintomdkapp_globals_application_supportphone_global = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Globals/Application/SupportPhone.global */ "./build.definitions/DeepLinkIntoMDKApp/Globals/Application/SupportPhone.global")
let deeplinkintomdkapp_i18n_i18n_properties = __webpack_require__(/*! ./DeepLinkIntoMDKApp/i18n/i18n.properties */ "./build.definitions/DeepLinkIntoMDKApp/i18n/i18n.properties")
let deeplinkintomdkapp_jsconfig_json = __webpack_require__(/*! ./DeepLinkIntoMDKApp/jsconfig.json */ "./build.definitions/DeepLinkIntoMDKApp/jsconfig.json")
let deeplinkintomdkapp_pages_application_about_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/Application/About.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/Application/About.page")
let deeplinkintomdkapp_pages_application_support_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/Application/Support.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/Application/Support.page")
let deeplinkintomdkapp_pages_application_useractivitylog_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/Application/UserActivityLog.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/Application/UserActivityLog.page")
let deeplinkintomdkapp_pages_customers_customers_detail_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/Customers/Customers_Detail.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/Customers/Customers_Detail.page")
let deeplinkintomdkapp_pages_customers_customers_list_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/Customers/Customers_List.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/Customers/Customers_List.page")
let deeplinkintomdkapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
let deeplinkintomdkapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_List.page")
let deeplinkintomdkapp_pages_main_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/Main.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/Main.page")
let deeplinkintomdkapp_pages_products_products_detail_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/Products/Products_Detail.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/Products/Products_Detail.page")
let deeplinkintomdkapp_pages_products_products_list_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/Products/Products_List.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/Products/Products_List.page")
let deeplinkintomdkapp_pages_purchaseorderitems_purchaseorderitems_detail_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page")
let deeplinkintomdkapp_pages_salesorderheaders_salesorderheaders_detail_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page")
let deeplinkintomdkapp_pages_salesorderitems_salesorderitems_detail_page = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page */ "./build.definitions/DeepLinkIntoMDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page")
let deeplinkintomdkapp_rules_application_appupdatefailure_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Application/AppUpdateFailure.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/AppUpdateFailure.js")
let deeplinkintomdkapp_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/AppUpdateSuccess.js")
let deeplinkintomdkapp_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/ClientIsMultiUserMode.js")
let deeplinkintomdkapp_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/GetClientSupportVersions.js")
let deeplinkintomdkapp_rules_application_getclientversion_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Application/GetClientVersion.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/GetClientVersion.js")
let deeplinkintomdkapp_rules_application_onwillupdate_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Application/OnWillUpdate.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/OnWillUpdate.js")
let deeplinkintomdkapp_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Application/ResetAppSettingsAndLogout.js")
let deeplinkintomdkapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let deeplinkintomdkapp_rules_linkdatareceived_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/LinkDataReceived.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/LinkDataReceived.js")
let deeplinkintomdkapp_rules_logging_loglevels_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Logging/LogLevels.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/LogLevels.js")
let deeplinkintomdkapp_rules_logging_settracecategories_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Logging/SetTraceCategories.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/SetTraceCategories.js")
let deeplinkintomdkapp_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/SetUserLogLevel.js")
let deeplinkintomdkapp_rules_logging_togglelogging_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Logging/ToggleLogging.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/ToggleLogging.js")
let deeplinkintomdkapp_rules_logging_tracecategories_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Logging/TraceCategories.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/TraceCategories.js")
let deeplinkintomdkapp_rules_logging_userlogsetting_js = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Rules/Logging/UserLogSetting.js */ "./build.definitions/DeepLinkIntoMDKApp/Rules/Logging/UserLogSetting.js")
let deeplinkintomdkapp_services_sampleservicev4_service = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Services/SampleServiceV4.service */ "./build.definitions/DeepLinkIntoMDKApp/Services/SampleServiceV4.service")
let deeplinkintomdkapp_styles_styles_css = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Styles/Styles.css */ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.css")
let deeplinkintomdkapp_styles_styles_less = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Styles/Styles.less */ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.less")
let deeplinkintomdkapp_styles_styles_light_css = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Styles/Styles.light.css */ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.light.css")
let deeplinkintomdkapp_styles_styles_light_json = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Styles/Styles.light.json */ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.light.json")
let deeplinkintomdkapp_styles_styles_light_nss = __webpack_require__(/*! ./DeepLinkIntoMDKApp/Styles/Styles.light.nss */ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	deeplinkintomdkapp_actions_application_appupdate_action : deeplinkintomdkapp_actions_application_appupdate_action,
	deeplinkintomdkapp_actions_application_appupdatefailuremessage_action : deeplinkintomdkapp_actions_application_appupdatefailuremessage_action,
	deeplinkintomdkapp_actions_application_appupdateprogressbanner_action : deeplinkintomdkapp_actions_application_appupdateprogressbanner_action,
	deeplinkintomdkapp_actions_application_appupdatesuccessmessage_action : deeplinkintomdkapp_actions_application_appupdatesuccessmessage_action,
	deeplinkintomdkapp_actions_application_logout_action : deeplinkintomdkapp_actions_application_logout_action,
	deeplinkintomdkapp_actions_application_navtoabout_action : deeplinkintomdkapp_actions_application_navtoabout_action,
	deeplinkintomdkapp_actions_application_navtoactivitylog_action : deeplinkintomdkapp_actions_application_navtoactivitylog_action,
	deeplinkintomdkapp_actions_application_navtosupport_action : deeplinkintomdkapp_actions_application_navtosupport_action,
	deeplinkintomdkapp_actions_application_onwillupdate_action : deeplinkintomdkapp_actions_application_onwillupdate_action,
	deeplinkintomdkapp_actions_application_reset_action : deeplinkintomdkapp_actions_application_reset_action,
	deeplinkintomdkapp_actions_application_resetmessage_action : deeplinkintomdkapp_actions_application_resetmessage_action,
	deeplinkintomdkapp_actions_application_usermenupopover_action : deeplinkintomdkapp_actions_application_usermenupopover_action,
	deeplinkintomdkapp_actions_closemodalpage_cancel_action : deeplinkintomdkapp_actions_closemodalpage_cancel_action,
	deeplinkintomdkapp_actions_closemodalpage_complete_action : deeplinkintomdkapp_actions_closemodalpage_complete_action,
	deeplinkintomdkapp_actions_closepage_action : deeplinkintomdkapp_actions_closepage_action,
	deeplinkintomdkapp_actions_customers_navtocustomers_detail_action : deeplinkintomdkapp_actions_customers_navtocustomers_detail_action,
	deeplinkintomdkapp_actions_customers_navtocustomers_list_action : deeplinkintomdkapp_actions_customers_navtocustomers_list_action,
	deeplinkintomdkapp_actions_errorarchive_errorarchive_syncfailure_action : deeplinkintomdkapp_actions_errorarchive_errorarchive_syncfailure_action,
	deeplinkintomdkapp_actions_errorarchive_navtoerrorarchive_detail_action : deeplinkintomdkapp_actions_errorarchive_navtoerrorarchive_detail_action,
	deeplinkintomdkapp_actions_errorarchive_navtoerrorarchive_list_action : deeplinkintomdkapp_actions_errorarchive_navtoerrorarchive_list_action,
	deeplinkintomdkapp_actions_genericbannermessage_action : deeplinkintomdkapp_actions_genericbannermessage_action,
	deeplinkintomdkapp_actions_genericmessagebox_action : deeplinkintomdkapp_actions_genericmessagebox_action,
	deeplinkintomdkapp_actions_genericnavigation_action : deeplinkintomdkapp_actions_genericnavigation_action,
	deeplinkintomdkapp_actions_generictoastmessage_action : deeplinkintomdkapp_actions_generictoastmessage_action,
	deeplinkintomdkapp_actions_logging_loguploadfailure_action : deeplinkintomdkapp_actions_logging_loguploadfailure_action,
	deeplinkintomdkapp_actions_logging_loguploadsuccessful_action : deeplinkintomdkapp_actions_logging_loguploadsuccessful_action,
	deeplinkintomdkapp_actions_logging_uploadlog_action : deeplinkintomdkapp_actions_logging_uploadlog_action,
	deeplinkintomdkapp_actions_logging_uploadlogprogress_action : deeplinkintomdkapp_actions_logging_uploadlogprogress_action,
	deeplinkintomdkapp_actions_products_navtoproducts_detail_action : deeplinkintomdkapp_actions_products_navtoproducts_detail_action,
	deeplinkintomdkapp_actions_products_navtoproducts_list_action : deeplinkintomdkapp_actions_products_navtoproducts_list_action,
	deeplinkintomdkapp_actions_purchaseorderitems_navtopurchaseorderitems_detail_action : deeplinkintomdkapp_actions_purchaseorderitems_navtopurchaseorderitems_detail_action,
	deeplinkintomdkapp_actions_salesorderheaders_navtosalesorderheaders_detail_action : deeplinkintomdkapp_actions_salesorderheaders_navtosalesorderheaders_detail_action,
	deeplinkintomdkapp_actions_salesorderitems_navtosalesorderitems_detail_action : deeplinkintomdkapp_actions_salesorderitems_navtosalesorderitems_detail_action,
	deeplinkintomdkapp_actions_service_closeoffline_action : deeplinkintomdkapp_actions_service_closeoffline_action,
	deeplinkintomdkapp_actions_service_closeofflinefailuremessage_action : deeplinkintomdkapp_actions_service_closeofflinefailuremessage_action,
	deeplinkintomdkapp_actions_service_closeofflinesuccessmessage_action : deeplinkintomdkapp_actions_service_closeofflinesuccessmessage_action,
	deeplinkintomdkapp_actions_service_downloadoffline_action : deeplinkintomdkapp_actions_service_downloadoffline_action,
	deeplinkintomdkapp_actions_service_downloadstartedmessage_action : deeplinkintomdkapp_actions_service_downloadstartedmessage_action,
	deeplinkintomdkapp_actions_service_initializeoffline_action : deeplinkintomdkapp_actions_service_initializeoffline_action,
	deeplinkintomdkapp_actions_service_initializeofflinefailuremessage_action : deeplinkintomdkapp_actions_service_initializeofflinefailuremessage_action,
	deeplinkintomdkapp_actions_service_initializeofflinesuccessmessage_action : deeplinkintomdkapp_actions_service_initializeofflinesuccessmessage_action,
	deeplinkintomdkapp_actions_service_syncfailuremessage_action : deeplinkintomdkapp_actions_service_syncfailuremessage_action,
	deeplinkintomdkapp_actions_service_syncstartedmessage_action : deeplinkintomdkapp_actions_service_syncstartedmessage_action,
	deeplinkintomdkapp_actions_service_uploadoffline_action : deeplinkintomdkapp_actions_service_uploadoffline_action,
	deeplinkintomdkapp_globals_application_appdefinition_version_global : deeplinkintomdkapp_globals_application_appdefinition_version_global,
	deeplinkintomdkapp_globals_application_applicationname_global : deeplinkintomdkapp_globals_application_applicationname_global,
	deeplinkintomdkapp_globals_application_supportemail_global : deeplinkintomdkapp_globals_application_supportemail_global,
	deeplinkintomdkapp_globals_application_supportphone_global : deeplinkintomdkapp_globals_application_supportphone_global,
	deeplinkintomdkapp_i18n_i18n_properties : deeplinkintomdkapp_i18n_i18n_properties,
	deeplinkintomdkapp_jsconfig_json : deeplinkintomdkapp_jsconfig_json,
	deeplinkintomdkapp_pages_application_about_page : deeplinkintomdkapp_pages_application_about_page,
	deeplinkintomdkapp_pages_application_support_page : deeplinkintomdkapp_pages_application_support_page,
	deeplinkintomdkapp_pages_application_useractivitylog_page : deeplinkintomdkapp_pages_application_useractivitylog_page,
	deeplinkintomdkapp_pages_customers_customers_detail_page : deeplinkintomdkapp_pages_customers_customers_detail_page,
	deeplinkintomdkapp_pages_customers_customers_list_page : deeplinkintomdkapp_pages_customers_customers_list_page,
	deeplinkintomdkapp_pages_errorarchive_errorarchive_detail_page : deeplinkintomdkapp_pages_errorarchive_errorarchive_detail_page,
	deeplinkintomdkapp_pages_errorarchive_errorarchive_list_page : deeplinkintomdkapp_pages_errorarchive_errorarchive_list_page,
	deeplinkintomdkapp_pages_main_page : deeplinkintomdkapp_pages_main_page,
	deeplinkintomdkapp_pages_products_products_detail_page : deeplinkintomdkapp_pages_products_products_detail_page,
	deeplinkintomdkapp_pages_products_products_list_page : deeplinkintomdkapp_pages_products_products_list_page,
	deeplinkintomdkapp_pages_purchaseorderitems_purchaseorderitems_detail_page : deeplinkintomdkapp_pages_purchaseorderitems_purchaseorderitems_detail_page,
	deeplinkintomdkapp_pages_salesorderheaders_salesorderheaders_detail_page : deeplinkintomdkapp_pages_salesorderheaders_salesorderheaders_detail_page,
	deeplinkintomdkapp_pages_salesorderitems_salesorderitems_detail_page : deeplinkintomdkapp_pages_salesorderitems_salesorderitems_detail_page,
	deeplinkintomdkapp_rules_application_appupdatefailure_js : deeplinkintomdkapp_rules_application_appupdatefailure_js,
	deeplinkintomdkapp_rules_application_appupdatesuccess_js : deeplinkintomdkapp_rules_application_appupdatesuccess_js,
	deeplinkintomdkapp_rules_application_clientismultiusermode_js : deeplinkintomdkapp_rules_application_clientismultiusermode_js,
	deeplinkintomdkapp_rules_application_getclientsupportversions_js : deeplinkintomdkapp_rules_application_getclientsupportversions_js,
	deeplinkintomdkapp_rules_application_getclientversion_js : deeplinkintomdkapp_rules_application_getclientversion_js,
	deeplinkintomdkapp_rules_application_onwillupdate_js : deeplinkintomdkapp_rules_application_onwillupdate_js,
	deeplinkintomdkapp_rules_application_resetappsettingsandlogout_js : deeplinkintomdkapp_rules_application_resetappsettingsandlogout_js,
	deeplinkintomdkapp_rules_errorarchive_errorarchive_checkforsyncerror_js : deeplinkintomdkapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	deeplinkintomdkapp_rules_linkdatareceived_js : deeplinkintomdkapp_rules_linkdatareceived_js,
	deeplinkintomdkapp_rules_logging_loglevels_js : deeplinkintomdkapp_rules_logging_loglevels_js,
	deeplinkintomdkapp_rules_logging_settracecategories_js : deeplinkintomdkapp_rules_logging_settracecategories_js,
	deeplinkintomdkapp_rules_logging_setuserloglevel_js : deeplinkintomdkapp_rules_logging_setuserloglevel_js,
	deeplinkintomdkapp_rules_logging_togglelogging_js : deeplinkintomdkapp_rules_logging_togglelogging_js,
	deeplinkintomdkapp_rules_logging_tracecategories_js : deeplinkintomdkapp_rules_logging_tracecategories_js,
	deeplinkintomdkapp_rules_logging_userlogsetting_js : deeplinkintomdkapp_rules_logging_userlogsetting_js,
	deeplinkintomdkapp_services_sampleservicev4_service : deeplinkintomdkapp_services_sampleservicev4_service,
	deeplinkintomdkapp_styles_styles_css : deeplinkintomdkapp_styles_styles_css,
	deeplinkintomdkapp_styles_styles_less : deeplinkintomdkapp_styles_styles_less,
	deeplinkintomdkapp_styles_styles_light_css : deeplinkintomdkapp_styles_styles_light_css,
	deeplinkintomdkapp_styles_styles_light_json : deeplinkintomdkapp_styles_styles_light_json,
	deeplinkintomdkapp_styles_styles_light_nss : deeplinkintomdkapp_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.css":
/*!****************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.css ***!
  \****************************************************************/
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
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.less":
/*!*****************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.less ***!
  \*****************************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.light.css":
/*!**********************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.light.css ***!
  \**********************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.light.nss":
/*!**********************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.light.nss ***!
  \**********************************************************************/
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

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/Application/About.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/Application/About.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/DeepLinkIntoMDKApp/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/DeepLinkIntoMDKApp/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/DeepLinkIntoMDKApp/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/DeepLinkIntoMDKApp/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DeepLinkIntoMDKApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/Application/Support.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/Application/Support.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/DeepLinkIntoMDKApp/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/DeepLinkIntoMDKApp/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/DeepLinkIntoMDKApp/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/DeepLinkIntoMDKApp/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DeepLinkIntoMDKApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/Application/UserActivityLog.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/Application/UserActivityLog.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/DeepLinkIntoMDKApp/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/DeepLinkIntoMDKApp/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/DeepLinkIntoMDKApp/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/DeepLinkIntoMDKApp/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/DeepLinkIntoMDKApp/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/DeepLinkIntoMDKApp/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/DeepLinkIntoMDKApp/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/DeepLinkIntoMDKApp/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/Customers/Customers_Detail.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/Customers/Customers_Detail.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customer Detail","DesignTimeTarget":{"Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{FirstName}","Subhead":"{City}","BodyText":"","Footnote":"{CustomerID}","Description":"{Country}","StatusText":"{DateOfBirth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{EmailAddress}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"City","Value":"{City}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"CustomerID","Value":"{CustomerID}"},{"KeyName":"DateOfBirth","Value":"{DateOfBirth}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"FirstName","Value":"{FirstName}"},{"KeyName":"HouseNumber","Value":"{HouseNumber}"},{"KeyName":"LastName","Value":"{LastName}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"PostalCode","Value":"{PostalCode}"},{"KeyName":"Street","Value":"{Street}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Address"},"KeyAndValues":[{"KeyName":"HouseNumber","Value":"{Address/HouseNumber}"},{"KeyName":"Street","Value":"{Address/Street}"},{"KeyName":"City","Value":"{Address/City}"},{"KeyName":"Country","Value":"{Address/Country}"},{"KeyName":"PostalCode","Value":"{Address/PostalCode}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValueAddress","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"SalesOrders"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerID}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}","OnPress":"/DeepLinkIntoMDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrders","Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/Customers/Customers_List.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/Customers/Customers_List.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customers","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{Country}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_Detail.action","StatusImage":"","Title":"{FirstName}","Footnote":"{CustomerID}","PreserveIconStackSpacing":false,"StatusText":"{DateOfBirth}","Subhead":"{City}","SubstatusText":"{EmailAddress}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Customers","Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!******************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"None","OnPress":"/DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/Main.page":
/*!**************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/Main.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_List.action","Alignment":"Center","Title":"Customers","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_List.action","Alignment":"Center","Title":"Products","ButtonType":"Text","Semantic":"Tint"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DeepLinkIntoMDKApp/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/Products/Products_Detail.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/Products/Products_Detail.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PRODUCT_TYPE)","DesignTimeTarget":{"Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service/{@odata.readLink}/Picture","HeadlineText":"{Name}","Subhead":"{Category}","BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductID","Value":"{ProductID}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierID","Value":"{SupplierID}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"PurchaseOrderItems"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderID}","OnPress":"/DeepLinkIntoMDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/PurchaseOrderItems","Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"SalesOrderItems"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/DeepLinkIntoMDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrderItems","Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["PurchaseOrderItems","SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/Products/Products_List.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/Products/Products_List.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PRODUCT_TYPES)","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{CategoryName}","AvatarStack":{"Avatars":[{"Image":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service/{@odata.readLink}/Picture"}],"ImageIsCircular":false},"Icons":[],"OnPress":"/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Products","Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductID}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{ItemNumber}","Description":"{GrossAmount}","StatusText":"{NetAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PurchaseOrderID}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductID","Value":"{ProductID}"},{"KeyName":"PurchaseOrderID","Value":"{PurchaseOrderID}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{LifeCycleStatusName}","Subhead":"{CreatedAt}","BodyText":"","Footnote":"{CustomerID}","Description":"{CurrencyCode}","StatusText":"{GrossAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{LifeCycleStatus}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CreatedAt","Value":"{CreatedAt}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"CustomerID","Value":"{CustomerID}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"LifeCycleStatus","Value":"{LifeCycleStatus}"},{"KeyName":"LifeCycleStatusName","Value":"{LifeCycleStatusName}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"SalesOrderID","Value":"{SalesOrderID}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/DeepLinkIntoMDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderItem Detail","DesignTimeTarget":{"Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductID}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{GrossAmount}","Description":"{DeliveryDate}","StatusText":"{ItemNumber}","StatusImage":"","SubstatusImage":"","SubstatusText":"{NetAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DeliveryDate","Value":"{DeliveryDate}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductID","Value":"{ProductID}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"SalesOrderID","Value":"{SalesOrderID}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"DeepLinkIntoMDKApp","Version":"/DeepLinkIntoMDKApp/Globals/Application/AppDefinition_Version.global","MainPage":"/DeepLinkIntoMDKApp/Pages/Main.page","OnLaunch":["/DeepLinkIntoMDKApp/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/DeepLinkIntoMDKApp/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/DeepLinkIntoMDKApp/Actions/Service/InitializeOffline.action","Styles":"/DeepLinkIntoMDKApp/Styles/Styles.css","Localization":"/DeepLinkIntoMDKApp/i18n/i18n.properties","_SchemaVersion":"23.12","StyleSheets":{"Styles":{"css":"/DeepLinkIntoMDKApp/Styles/Styles.light.css","ios":"/DeepLinkIntoMDKApp/Styles/Styles.light.nss","android":"/DeepLinkIntoMDKApp/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/DeepLinkIntoMDKApp/Styles/Styles.light.nss","android":"/DeepLinkIntoMDKApp/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdate.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdate.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/DeepLinkIntoMDKApp/Rules/Application/AppUpdateFailure.js","OnSuccess":"/DeepLinkIntoMDKApp/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdateFailureMessage.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdateFailureMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdateProgressBanner.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdateProgressBanner.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/DeepLinkIntoMDKApp/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdateSuccessMessage.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/AppUpdateSuccessMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/Logout.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/Logout.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/NavToAbout.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/NavToAbout.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/DeepLinkIntoMDKApp/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/NavToActivityLog.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/NavToActivityLog.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/DeepLinkIntoMDKApp/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/NavToSupport.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/NavToSupport.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/DeepLinkIntoMDKApp/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/OnWillUpdate.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/OnWillUpdate.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/Reset.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/Reset.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/ResetMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/ResetMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/DeepLinkIntoMDKApp/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Application/UserMenuPopover.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Application/UserMenuPopover.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/DeepLinkIntoMDKApp/Actions/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/DeepLinkIntoMDKApp/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/DeepLinkIntoMDKApp/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/DeepLinkIntoMDKApp/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/DeepLinkIntoMDKApp/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/DeepLinkIntoMDKApp/Actions/Application/Logout.action","Title":"Logout","Visible":"/DeepLinkIntoMDKApp/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/CloseModalPage_Cancel.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/CloseModalPage_Cancel.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/CloseModalPage_Complete.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/CloseModalPage_Complete.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/ClosePage.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/ClosePage.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_Detail.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_Detail.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DeepLinkIntoMDKApp/Pages/Customers/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_List.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Customers/NavToCustomers_List.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DeepLinkIntoMDKApp/Pages/Customers/Customers_List.page"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DeepLinkIntoMDKApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/GenericBannerMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/GenericBannerMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/GenericMessageBox.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/GenericMessageBox.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/GenericNavigation.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/GenericNavigation.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/DeepLinkIntoMDKApp/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/GenericToastMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/GenericToastMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/LogUploadFailure.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/LogUploadFailure.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/LogUploadSuccessful.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/LogUploadSuccessful.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/UploadLog.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/UploadLog.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/DeepLinkIntoMDKApp/Actions/Logging/LogUploadFailure.action","OnSuccess":"/DeepLinkIntoMDKApp/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/UploadLogProgress.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Logging/UploadLogProgress.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/DeepLinkIntoMDKApp/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_Detail.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_Detail.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DeepLinkIntoMDKApp/Pages/Products/Products_Detail.page"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_List.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Products/NavToProducts_List.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DeepLinkIntoMDKApp/Pages/Products/Products_List.page"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DeepLinkIntoMDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DeepLinkIntoMDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DeepLinkIntoMDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/CloseOffline.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/CloseOffline.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/DeepLinkIntoMDKApp/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/DeepLinkIntoMDKApp/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/CloseOfflineFailureMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/CloseOfflineFailureMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/CloseOfflineSuccessMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/DownloadOffline.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/DownloadOffline.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/DeepLinkIntoMDKApp/Actions/Service/SyncFailureMessage.action","OnSuccess":"/DeepLinkIntoMDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/DownloadStartedMessage.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/DownloadStartedMessage.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/DeepLinkIntoMDKApp/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/InitializeOffline.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/InitializeOffline.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineFailureMessage.action":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/SyncFailureMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/SyncFailureMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/SyncStartedMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/SyncStartedMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/DeepLinkIntoMDKApp/Actions/Service/UploadOffline.action","OnFailure":"/DeepLinkIntoMDKApp/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Actions/Service/UploadOffline.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Actions/Service/UploadOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DeepLinkIntoMDKApp/Services/SampleServiceV4.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/DeepLinkIntoMDKApp/Actions/Service/DownloadStartedMessage.action","OnFailure":"/DeepLinkIntoMDKApp/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Globals/Application/AppDefinition_Version.global":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Globals/Application/AppDefinition_Version.global ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Globals/Application/ApplicationName.global":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Globals/Application/ApplicationName.global ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Globals/Application/SupportEmail.global":
/*!**************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Globals/Application/SupportEmail.global ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Globals/Application/SupportPhone.global":
/*!**************************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Globals/Application/SupportPhone.global ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Services/SampleServiceV4.service":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Services/SampleServiceV4.service ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV4","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"OfflineOptions":{"StoreParameters":{}},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "webpack/container/entry/bundle.js":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ "./build.definitions/application-index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.light.json":
/*!***********************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/Styles/Styles.light.json ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/DeepLinkIntoMDKApp/jsconfig.json":
/*!************************************************************!*\
  !*** ./build.definitions/DeepLinkIntoMDKApp/jsconfig.json ***!
  \************************************************************/
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
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
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/bundle.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map