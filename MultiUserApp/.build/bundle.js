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

/***/ "./build.definitions/MultiUserApp/i18n/i18n.properties":
/*!*************************************************************!*\
  !*** ./build.definitions/MultiUserApp/i18n/i18n.properties ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "PRODUCT_NAME=PRODUCT_NAME\nPRODUCT_CATEGORY=PRODUCT_CATEGORY\nPRODUCT_SHORT_DESCRIPTION=PRODUCT_SHORT_DESCRIPTION\nPRODUCT_LONG_DESCRIPTION=PRODUCT_LONG_DESCRIPTION\nPRODUCT_PRICE=PRODUCT_PRICE\nPRODUCT_WEIGHT=PRODUCT_WEIGHT\nPRODUCT_HEIGHT=PRODUCT_HEIGHT\nPRODUCT_DEPTH=PRODUCT_DEPTH\nPRODUCT_WIDTH=PRODUCT_WIDTH\nPRODUCT_TYPE=PRODUCT_TYPE\nPRODUCT_TYPES=PRODUCT_TYPES\nPRODUCT_PRODUCT_ID=PRODUCT_PRODUCT_ID\nPRODUCT_UNIT=PRODUCT_UNIT\nPRODUCT_WEIGHT_UNIT=PRODUCT_WEIGHT_UNIT\nPRODUCT_QUANTITY_UNIT=PRODUCT_QUANTITY_UNIT\nPRODUCT_CATEGORY_NAME=PRODUCT_CATEGORY_NAME\nPRODUCT_CURENCY_CODE=PRODUCT_CURENCY_CODE\nPRODUCT_PICTURE_URL=PRODUCT_PICTURE_URL\nPRODUCT_SUPPLIER_ID=PRODUCT_SUPPLIER_ID\nPRODUCT_UPDATE_TIMESTAMP=PRODUCT_UPDATE_TIMESTAMP\n"

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/Application/AppUpdateFailure.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Application/AppUpdateFailure.js ***!
  \******************************************************************************/
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
        "Name": "/MultiUserApp/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/Application/AppUpdateSuccess.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Application/AppUpdateSuccess.js ***!
  \******************************************************************************/
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
                "Name": "/MultiUserApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MultiUserApp/Actions/Application/AppUpdateSuccessMessage.action",
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

/***/ "./build.definitions/MultiUserApp/Rules/Application/ClientIsMultiUserMode.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Application/ClientIsMultiUserMode.js ***!
  \***********************************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Rules/Application/GetClientSupportVersions.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Application/GetClientSupportVersions.js ***!
  \**************************************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Rules/Application/GetClientVersion.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Application/GetClientVersion.js ***!
  \******************************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Rules/Application/OnWillUpdate.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Application/OnWillUpdate.js ***!
  \**************************************************************************/
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
    return clientAPI.executeAction('/MultiUserApp/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MultiUserApp/Actions/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/Application/ResetAppSettingsAndLogout.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \***************************************************************************************/
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
        return clientAPI.getPageProxy().executeAction('/MultiUserApp/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/Customers/Customers_DeleteConfirmation.js":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Customers/Customers_DeleteConfirmation.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MultiUserApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MultiUserApp/Actions/Customers/Customers_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \*********************************************************************************************/
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
    context.count('/MultiUserApp/Services/SampleServiceV4.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/MultiUserApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/Logging/LogLevels.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Logging/LogLevels.js ***!
  \*******************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Rules/Logging/SetTraceCategories.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Logging/SetTraceCategories.js ***!
  \****************************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Rules/Logging/SetUserLogLevel.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Logging/SetUserLogLevel.js ***!
  \*************************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Rules/Logging/ToggleLogging.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Logging/ToggleLogging.js ***!
  \***********************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Rules/Logging/TraceCategories.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Logging/TraceCategories.js ***!
  \*************************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Rules/Logging/UserLogSetting.js":
/*!************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Logging/UserLogSetting.js ***!
  \************************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Rules/Products/Products_CreateEntity.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Products/Products_CreateEntity.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    return clientAPI.executeAction({
        'Name': '/MultiUserApp/Actions/Products/Products_CreateEntity.action',
        'Properties': {
            'OnSuccess': ''
        }
    }).then((result) => {
        let newEntity = JSON.parse(result.data);
        return clientAPI.executeAction({
            'Name': '/MultiUserApp/Actions/Products/Products_UploadStream.action',
            'Properties': {
                'Target': {
                    'ReadLink': newEntity['@odata.readLink']
                }
            }
        });
    });
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/Products/Products_DeleteConfirmation.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/Products/Products_DeleteConfirmation.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MultiUserApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MultiUserApp/Actions/Products/Products_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MultiUserApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MultiUserApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MultiUserApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
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
let multiuserapp_actions_application_appupdate_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/AppUpdate.action */ "./build.definitions/MultiUserApp/Actions/Application/AppUpdate.action")
let multiuserapp_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/MultiUserApp/Actions/Application/AppUpdateFailureMessage.action")
let multiuserapp_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/MultiUserApp/Actions/Application/AppUpdateProgressBanner.action")
let multiuserapp_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/MultiUserApp/Actions/Application/AppUpdateSuccessMessage.action")
let multiuserapp_actions_application_logout_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/Logout.action */ "./build.definitions/MultiUserApp/Actions/Application/Logout.action")
let multiuserapp_actions_application_navtoabout_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/NavToAbout.action */ "./build.definitions/MultiUserApp/Actions/Application/NavToAbout.action")
let multiuserapp_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/NavToActivityLog.action */ "./build.definitions/MultiUserApp/Actions/Application/NavToActivityLog.action")
let multiuserapp_actions_application_navtosupport_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/NavToSupport.action */ "./build.definitions/MultiUserApp/Actions/Application/NavToSupport.action")
let multiuserapp_actions_application_onwillupdate_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/OnWillUpdate.action */ "./build.definitions/MultiUserApp/Actions/Application/OnWillUpdate.action")
let multiuserapp_actions_application_reset_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/Reset.action */ "./build.definitions/MultiUserApp/Actions/Application/Reset.action")
let multiuserapp_actions_application_resetmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/ResetMessage.action */ "./build.definitions/MultiUserApp/Actions/Application/ResetMessage.action")
let multiuserapp_actions_application_usermenupopover_action = __webpack_require__(/*! ./MultiUserApp/Actions/Application/UserMenuPopover.action */ "./build.definitions/MultiUserApp/Actions/Application/UserMenuPopover.action")
let multiuserapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MultiUserApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MultiUserApp/Actions/CloseModalPage_Cancel.action")
let multiuserapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MultiUserApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/MultiUserApp/Actions/CloseModalPage_Complete.action")
let multiuserapp_actions_closepage_action = __webpack_require__(/*! ./MultiUserApp/Actions/ClosePage.action */ "./build.definitions/MultiUserApp/Actions/ClosePage.action")
let multiuserapp_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MultiUserApp/Actions/CreateEntityFailureMessage.action")
let multiuserapp_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MultiUserApp/Actions/CreateEntitySuccessMessage.action")
let multiuserapp_actions_customers_customers_createentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/Customers_CreateEntity.action */ "./build.definitions/MultiUserApp/Actions/Customers/Customers_CreateEntity.action")
let multiuserapp_actions_customers_customers_createsalesorderheader_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/Customers_CreateSalesOrderHeader.action */ "./build.definitions/MultiUserApp/Actions/Customers/Customers_CreateSalesOrderHeader.action")
let multiuserapp_actions_customers_customers_deleteentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/Customers_DeleteEntity.action */ "./build.definitions/MultiUserApp/Actions/Customers/Customers_DeleteEntity.action")
let multiuserapp_actions_customers_customers_detailpopover_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/Customers_DetailPopover.action */ "./build.definitions/MultiUserApp/Actions/Customers/Customers_DetailPopover.action")
let multiuserapp_actions_customers_customers_updateentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/Customers_UpdateEntity.action */ "./build.definitions/MultiUserApp/Actions/Customers/Customers_UpdateEntity.action")
let multiuserapp_actions_customers_navtocustomers_create_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/NavToCustomers_Create.action */ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_Create.action")
let multiuserapp_actions_customers_navtocustomers_createsalesorderheader_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action */ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action")
let multiuserapp_actions_customers_navtocustomers_detail_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/NavToCustomers_Detail.action */ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_Detail.action")
let multiuserapp_actions_customers_navtocustomers_edit_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/NavToCustomers_Edit.action */ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_Edit.action")
let multiuserapp_actions_customers_navtocustomers_list_action = __webpack_require__(/*! ./MultiUserApp/Actions/Customers/NavToCustomers_List.action */ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_List.action")
let multiuserapp_actions_deleteconfirmation_action = __webpack_require__(/*! ./MultiUserApp/Actions/DeleteConfirmation.action */ "./build.definitions/MultiUserApp/Actions/DeleteConfirmation.action")
let multiuserapp_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MultiUserApp/Actions/DeleteEntityFailureMessage.action")
let multiuserapp_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MultiUserApp/Actions/DeleteEntitySuccessMessage.action")
let multiuserapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MultiUserApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/MultiUserApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let multiuserapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let multiuserapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
let multiuserapp_actions_genericbannermessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/GenericBannerMessage.action */ "./build.definitions/MultiUserApp/Actions/GenericBannerMessage.action")
let multiuserapp_actions_genericmessagebox_action = __webpack_require__(/*! ./MultiUserApp/Actions/GenericMessageBox.action */ "./build.definitions/MultiUserApp/Actions/GenericMessageBox.action")
let multiuserapp_actions_genericnavigation_action = __webpack_require__(/*! ./MultiUserApp/Actions/GenericNavigation.action */ "./build.definitions/MultiUserApp/Actions/GenericNavigation.action")
let multiuserapp_actions_generictoastmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/GenericToastMessage.action */ "./build.definitions/MultiUserApp/Actions/GenericToastMessage.action")
let multiuserapp_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./MultiUserApp/Actions/Logging/LogUploadFailure.action */ "./build.definitions/MultiUserApp/Actions/Logging/LogUploadFailure.action")
let multiuserapp_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./MultiUserApp/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/MultiUserApp/Actions/Logging/LogUploadSuccessful.action")
let multiuserapp_actions_logging_uploadlog_action = __webpack_require__(/*! ./MultiUserApp/Actions/Logging/UploadLog.action */ "./build.definitions/MultiUserApp/Actions/Logging/UploadLog.action")
let multiuserapp_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./MultiUserApp/Actions/Logging/UploadLogProgress.action */ "./build.definitions/MultiUserApp/Actions/Logging/UploadLogProgress.action")
let multiuserapp_actions_products_navtoproducts_create_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/NavToProducts_Create.action */ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_Create.action")
let multiuserapp_actions_products_navtoproducts_createpurchaseorderitem_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/NavToProducts_CreatePurchaseOrderItem.action */ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_CreatePurchaseOrderItem.action")
let multiuserapp_actions_products_navtoproducts_createsalesorderitem_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/NavToProducts_CreateSalesOrderItem.action */ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_CreateSalesOrderItem.action")
let multiuserapp_actions_products_navtoproducts_detail_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/NavToProducts_Detail.action */ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_Detail.action")
let multiuserapp_actions_products_navtoproducts_edit_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/NavToProducts_Edit.action */ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_Edit.action")
let multiuserapp_actions_products_navtoproducts_list_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/NavToProducts_List.action */ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_List.action")
let multiuserapp_actions_products_products_createentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/Products_CreateEntity.action */ "./build.definitions/MultiUserApp/Actions/Products/Products_CreateEntity.action")
let multiuserapp_actions_products_products_createpurchaseorderitem_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/Products_CreatePurchaseOrderItem.action */ "./build.definitions/MultiUserApp/Actions/Products/Products_CreatePurchaseOrderItem.action")
let multiuserapp_actions_products_products_createsalesorderitem_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/Products_CreateSalesOrderItem.action */ "./build.definitions/MultiUserApp/Actions/Products/Products_CreateSalesOrderItem.action")
let multiuserapp_actions_products_products_deleteentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/Products_DeleteEntity.action */ "./build.definitions/MultiUserApp/Actions/Products/Products_DeleteEntity.action")
let multiuserapp_actions_products_products_detailpopover_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/Products_DetailPopover.action */ "./build.definitions/MultiUserApp/Actions/Products/Products_DetailPopover.action")
let multiuserapp_actions_products_products_opendocument_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/Products_OpenDocument.action */ "./build.definitions/MultiUserApp/Actions/Products/Products_OpenDocument.action")
let multiuserapp_actions_products_products_updateentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/Products_UpdateEntity.action */ "./build.definitions/MultiUserApp/Actions/Products/Products_UpdateEntity.action")
let multiuserapp_actions_products_products_uploadstream_action = __webpack_require__(/*! ./MultiUserApp/Actions/Products/Products_UploadStream.action */ "./build.definitions/MultiUserApp/Actions/Products/Products_UploadStream.action")
let multiuserapp_actions_purchaseorderitems_navtopurchaseorderitems_detail_action = __webpack_require__(/*! ./MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action */ "./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action")
let multiuserapp_actions_purchaseorderitems_navtopurchaseorderitems_edit_action = __webpack_require__(/*! ./MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action */ "./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action")
let multiuserapp_actions_purchaseorderitems_purchaseorderitems_deleteentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action */ "./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action")
let multiuserapp_actions_purchaseorderitems_purchaseorderitems_updateentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action */ "./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action")
let multiuserapp_actions_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action")
let multiuserapp_actions_salesorderheaders_navtosalesorderheaders_detail_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action")
let multiuserapp_actions_salesorderheaders_navtosalesorderheaders_edit_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action")
let multiuserapp_actions_salesorderheaders_salesorderheaders_createsalesorderitem_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action")
let multiuserapp_actions_salesorderheaders_salesorderheaders_deleteentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action")
let multiuserapp_actions_salesorderheaders_salesorderheaders_detailpopover_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action")
let multiuserapp_actions_salesorderheaders_salesorderheaders_updateentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action")
let multiuserapp_actions_salesorderitems_navtosalesorderitems_detail_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action")
let multiuserapp_actions_salesorderitems_navtosalesorderitems_edit_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action")
let multiuserapp_actions_salesorderitems_salesorderitems_deleteentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action")
let multiuserapp_actions_salesorderitems_salesorderitems_updateentity_action = __webpack_require__(/*! ./MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action */ "./build.definitions/MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action")
let multiuserapp_actions_service_closeoffline_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/CloseOffline.action */ "./build.definitions/MultiUserApp/Actions/Service/CloseOffline.action")
let multiuserapp_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/MultiUserApp/Actions/Service/CloseOfflineFailureMessage.action")
let multiuserapp_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/MultiUserApp/Actions/Service/CloseOfflineSuccessMessage.action")
let multiuserapp_actions_service_downloadoffline_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/DownloadOffline.action */ "./build.definitions/MultiUserApp/Actions/Service/DownloadOffline.action")
let multiuserapp_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/MultiUserApp/Actions/Service/DownloadStartedMessage.action")
let multiuserapp_actions_service_initializeoffline_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/InitializeOffline.action */ "./build.definitions/MultiUserApp/Actions/Service/InitializeOffline.action")
let multiuserapp_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/MultiUserApp/Actions/Service/InitializeOfflineFailureMessage.action")
let multiuserapp_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/MultiUserApp/Actions/Service/InitializeOfflineSuccessMessage.action")
let multiuserapp_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/SyncFailureMessage.action */ "./build.definitions/MultiUserApp/Actions/Service/SyncFailureMessage.action")
let multiuserapp_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/SyncStartedMessage.action */ "./build.definitions/MultiUserApp/Actions/Service/SyncStartedMessage.action")
let multiuserapp_actions_service_uploadoffline_action = __webpack_require__(/*! ./MultiUserApp/Actions/Service/UploadOffline.action */ "./build.definitions/MultiUserApp/Actions/Service/UploadOffline.action")
let multiuserapp_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MultiUserApp/Actions/UpdateEntityFailureMessage.action")
let multiuserapp_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MultiUserApp/Actions/UpdateEntitySuccessMessage.action")
let multiuserapp_actions_uploadstreamfailuremessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/UploadStreamFailureMessage.action */ "./build.definitions/MultiUserApp/Actions/UploadStreamFailureMessage.action")
let multiuserapp_actions_uploadstreamsuccessmessage_action = __webpack_require__(/*! ./MultiUserApp/Actions/UploadStreamSuccessMessage.action */ "./build.definitions/MultiUserApp/Actions/UploadStreamSuccessMessage.action")
let multiuserapp_globals_application_appdefinition_version_global = __webpack_require__(/*! ./MultiUserApp/Globals/Application/AppDefinition_Version.global */ "./build.definitions/MultiUserApp/Globals/Application/AppDefinition_Version.global")
let multiuserapp_globals_application_applicationname_global = __webpack_require__(/*! ./MultiUserApp/Globals/Application/ApplicationName.global */ "./build.definitions/MultiUserApp/Globals/Application/ApplicationName.global")
let multiuserapp_globals_application_supportemail_global = __webpack_require__(/*! ./MultiUserApp/Globals/Application/SupportEmail.global */ "./build.definitions/MultiUserApp/Globals/Application/SupportEmail.global")
let multiuserapp_globals_application_supportphone_global = __webpack_require__(/*! ./MultiUserApp/Globals/Application/SupportPhone.global */ "./build.definitions/MultiUserApp/Globals/Application/SupportPhone.global")
let multiuserapp_i18n_i18n_properties = __webpack_require__(/*! ./MultiUserApp/i18n/i18n.properties */ "./build.definitions/MultiUserApp/i18n/i18n.properties")
let multiuserapp_jsconfig_json = __webpack_require__(/*! ./MultiUserApp/jsconfig.json */ "./build.definitions/MultiUserApp/jsconfig.json")
let multiuserapp_pages_application_about_page = __webpack_require__(/*! ./MultiUserApp/Pages/Application/About.page */ "./build.definitions/MultiUserApp/Pages/Application/About.page")
let multiuserapp_pages_application_support_page = __webpack_require__(/*! ./MultiUserApp/Pages/Application/Support.page */ "./build.definitions/MultiUserApp/Pages/Application/Support.page")
let multiuserapp_pages_application_useractivitylog_page = __webpack_require__(/*! ./MultiUserApp/Pages/Application/UserActivityLog.page */ "./build.definitions/MultiUserApp/Pages/Application/UserActivityLog.page")
let multiuserapp_pages_customers_customers_create_page = __webpack_require__(/*! ./MultiUserApp/Pages/Customers/Customers_Create.page */ "./build.definitions/MultiUserApp/Pages/Customers/Customers_Create.page")
let multiuserapp_pages_customers_customers_createsalesorderheader_page = __webpack_require__(/*! ./MultiUserApp/Pages/Customers/Customers_CreateSalesOrderHeader.page */ "./build.definitions/MultiUserApp/Pages/Customers/Customers_CreateSalesOrderHeader.page")
let multiuserapp_pages_customers_customers_detail_page = __webpack_require__(/*! ./MultiUserApp/Pages/Customers/Customers_Detail.page */ "./build.definitions/MultiUserApp/Pages/Customers/Customers_Detail.page")
let multiuserapp_pages_customers_customers_edit_page = __webpack_require__(/*! ./MultiUserApp/Pages/Customers/Customers_Edit.page */ "./build.definitions/MultiUserApp/Pages/Customers/Customers_Edit.page")
let multiuserapp_pages_customers_customers_list_page = __webpack_require__(/*! ./MultiUserApp/Pages/Customers/Customers_List.page */ "./build.definitions/MultiUserApp/Pages/Customers/Customers_List.page")
let multiuserapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MultiUserApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/MultiUserApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
let multiuserapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MultiUserApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/MultiUserApp/Pages/ErrorArchive/ErrorArchive_List.page")
let multiuserapp_pages_main_page = __webpack_require__(/*! ./MultiUserApp/Pages/Main.page */ "./build.definitions/MultiUserApp/Pages/Main.page")
let multiuserapp_pages_products_products_create_page = __webpack_require__(/*! ./MultiUserApp/Pages/Products/Products_Create.page */ "./build.definitions/MultiUserApp/Pages/Products/Products_Create.page")
let multiuserapp_pages_products_products_createpurchaseorderitem_page = __webpack_require__(/*! ./MultiUserApp/Pages/Products/Products_CreatePurchaseOrderItem.page */ "./build.definitions/MultiUserApp/Pages/Products/Products_CreatePurchaseOrderItem.page")
let multiuserapp_pages_products_products_createsalesorderitem_page = __webpack_require__(/*! ./MultiUserApp/Pages/Products/Products_CreateSalesOrderItem.page */ "./build.definitions/MultiUserApp/Pages/Products/Products_CreateSalesOrderItem.page")
let multiuserapp_pages_products_products_detail_page = __webpack_require__(/*! ./MultiUserApp/Pages/Products/Products_Detail.page */ "./build.definitions/MultiUserApp/Pages/Products/Products_Detail.page")
let multiuserapp_pages_products_products_edit_page = __webpack_require__(/*! ./MultiUserApp/Pages/Products/Products_Edit.page */ "./build.definitions/MultiUserApp/Pages/Products/Products_Edit.page")
let multiuserapp_pages_products_products_list_page = __webpack_require__(/*! ./MultiUserApp/Pages/Products/Products_List.page */ "./build.definitions/MultiUserApp/Pages/Products/Products_List.page")
let multiuserapp_pages_purchaseorderitems_purchaseorderitems_detail_page = __webpack_require__(/*! ./MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page */ "./build.definitions/MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page")
let multiuserapp_pages_purchaseorderitems_purchaseorderitems_edit_page = __webpack_require__(/*! ./MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page */ "./build.definitions/MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page")
let multiuserapp_pages_salesorderheaders_salesorderheaders_createsalesorderitem_page = __webpack_require__(/*! ./MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page */ "./build.definitions/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page")
let multiuserapp_pages_salesorderheaders_salesorderheaders_detail_page = __webpack_require__(/*! ./MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page */ "./build.definitions/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page")
let multiuserapp_pages_salesorderheaders_salesorderheaders_edit_page = __webpack_require__(/*! ./MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page */ "./build.definitions/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page")
let multiuserapp_pages_salesorderitems_salesorderitems_detail_page = __webpack_require__(/*! ./MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page */ "./build.definitions/MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page")
let multiuserapp_pages_salesorderitems_salesorderitems_edit_page = __webpack_require__(/*! ./MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page */ "./build.definitions/MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page")
let multiuserapp_rules_application_appupdatefailure_js = __webpack_require__(/*! ./MultiUserApp/Rules/Application/AppUpdateFailure.js */ "./build.definitions/MultiUserApp/Rules/Application/AppUpdateFailure.js")
let multiuserapp_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./MultiUserApp/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/MultiUserApp/Rules/Application/AppUpdateSuccess.js")
let multiuserapp_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./MultiUserApp/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/MultiUserApp/Rules/Application/ClientIsMultiUserMode.js")
let multiuserapp_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./MultiUserApp/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/MultiUserApp/Rules/Application/GetClientSupportVersions.js")
let multiuserapp_rules_application_getclientversion_js = __webpack_require__(/*! ./MultiUserApp/Rules/Application/GetClientVersion.js */ "./build.definitions/MultiUserApp/Rules/Application/GetClientVersion.js")
let multiuserapp_rules_application_onwillupdate_js = __webpack_require__(/*! ./MultiUserApp/Rules/Application/OnWillUpdate.js */ "./build.definitions/MultiUserApp/Rules/Application/OnWillUpdate.js")
let multiuserapp_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./MultiUserApp/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/MultiUserApp/Rules/Application/ResetAppSettingsAndLogout.js")
let multiuserapp_rules_customers_customers_deleteconfirmation_js = __webpack_require__(/*! ./MultiUserApp/Rules/Customers/Customers_DeleteConfirmation.js */ "./build.definitions/MultiUserApp/Rules/Customers/Customers_DeleteConfirmation.js")
let multiuserapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MultiUserApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/MultiUserApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let multiuserapp_rules_logging_loglevels_js = __webpack_require__(/*! ./MultiUserApp/Rules/Logging/LogLevels.js */ "./build.definitions/MultiUserApp/Rules/Logging/LogLevels.js")
let multiuserapp_rules_logging_settracecategories_js = __webpack_require__(/*! ./MultiUserApp/Rules/Logging/SetTraceCategories.js */ "./build.definitions/MultiUserApp/Rules/Logging/SetTraceCategories.js")
let multiuserapp_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./MultiUserApp/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/MultiUserApp/Rules/Logging/SetUserLogLevel.js")
let multiuserapp_rules_logging_togglelogging_js = __webpack_require__(/*! ./MultiUserApp/Rules/Logging/ToggleLogging.js */ "./build.definitions/MultiUserApp/Rules/Logging/ToggleLogging.js")
let multiuserapp_rules_logging_tracecategories_js = __webpack_require__(/*! ./MultiUserApp/Rules/Logging/TraceCategories.js */ "./build.definitions/MultiUserApp/Rules/Logging/TraceCategories.js")
let multiuserapp_rules_logging_userlogsetting_js = __webpack_require__(/*! ./MultiUserApp/Rules/Logging/UserLogSetting.js */ "./build.definitions/MultiUserApp/Rules/Logging/UserLogSetting.js")
let multiuserapp_rules_products_products_createentity_js = __webpack_require__(/*! ./MultiUserApp/Rules/Products/Products_CreateEntity.js */ "./build.definitions/MultiUserApp/Rules/Products/Products_CreateEntity.js")
let multiuserapp_rules_products_products_deleteconfirmation_js = __webpack_require__(/*! ./MultiUserApp/Rules/Products/Products_DeleteConfirmation.js */ "./build.definitions/MultiUserApp/Rules/Products/Products_DeleteConfirmation.js")
let multiuserapp_rules_purchaseorderitems_purchaseorderitems_deleteconfirmation_js = __webpack_require__(/*! ./MultiUserApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js */ "./build.definitions/MultiUserApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js")
let multiuserapp_rules_salesorderheaders_salesorderheaders_deleteconfirmation_js = __webpack_require__(/*! ./MultiUserApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js */ "./build.definitions/MultiUserApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js")
let multiuserapp_rules_salesorderitems_salesorderitems_deleteconfirmation_js = __webpack_require__(/*! ./MultiUserApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js */ "./build.definitions/MultiUserApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js")
let multiuserapp_services_sampleservicev4_service = __webpack_require__(/*! ./MultiUserApp/Services/SampleServiceV4.service */ "./build.definitions/MultiUserApp/Services/SampleServiceV4.service")
let multiuserapp_styles_styles_css = __webpack_require__(/*! ./MultiUserApp/Styles/Styles.css */ "./build.definitions/MultiUserApp/Styles/Styles.css")
let multiuserapp_styles_styles_json = __webpack_require__(/*! ./MultiUserApp/Styles/Styles.json */ "./build.definitions/MultiUserApp/Styles/Styles.json")
let multiuserapp_styles_styles_less = __webpack_require__(/*! ./MultiUserApp/Styles/Styles.less */ "./build.definitions/MultiUserApp/Styles/Styles.less")
let multiuserapp_styles_styles_nss = __webpack_require__(/*! ./MultiUserApp/Styles/Styles.nss */ "./build.definitions/MultiUserApp/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	multiuserapp_actions_application_appupdate_action : multiuserapp_actions_application_appupdate_action,
	multiuserapp_actions_application_appupdatefailuremessage_action : multiuserapp_actions_application_appupdatefailuremessage_action,
	multiuserapp_actions_application_appupdateprogressbanner_action : multiuserapp_actions_application_appupdateprogressbanner_action,
	multiuserapp_actions_application_appupdatesuccessmessage_action : multiuserapp_actions_application_appupdatesuccessmessage_action,
	multiuserapp_actions_application_logout_action : multiuserapp_actions_application_logout_action,
	multiuserapp_actions_application_navtoabout_action : multiuserapp_actions_application_navtoabout_action,
	multiuserapp_actions_application_navtoactivitylog_action : multiuserapp_actions_application_navtoactivitylog_action,
	multiuserapp_actions_application_navtosupport_action : multiuserapp_actions_application_navtosupport_action,
	multiuserapp_actions_application_onwillupdate_action : multiuserapp_actions_application_onwillupdate_action,
	multiuserapp_actions_application_reset_action : multiuserapp_actions_application_reset_action,
	multiuserapp_actions_application_resetmessage_action : multiuserapp_actions_application_resetmessage_action,
	multiuserapp_actions_application_usermenupopover_action : multiuserapp_actions_application_usermenupopover_action,
	multiuserapp_actions_closemodalpage_cancel_action : multiuserapp_actions_closemodalpage_cancel_action,
	multiuserapp_actions_closemodalpage_complete_action : multiuserapp_actions_closemodalpage_complete_action,
	multiuserapp_actions_closepage_action : multiuserapp_actions_closepage_action,
	multiuserapp_actions_createentityfailuremessage_action : multiuserapp_actions_createentityfailuremessage_action,
	multiuserapp_actions_createentitysuccessmessage_action : multiuserapp_actions_createentitysuccessmessage_action,
	multiuserapp_actions_customers_customers_createentity_action : multiuserapp_actions_customers_customers_createentity_action,
	multiuserapp_actions_customers_customers_createsalesorderheader_action : multiuserapp_actions_customers_customers_createsalesorderheader_action,
	multiuserapp_actions_customers_customers_deleteentity_action : multiuserapp_actions_customers_customers_deleteentity_action,
	multiuserapp_actions_customers_customers_detailpopover_action : multiuserapp_actions_customers_customers_detailpopover_action,
	multiuserapp_actions_customers_customers_updateentity_action : multiuserapp_actions_customers_customers_updateentity_action,
	multiuserapp_actions_customers_navtocustomers_create_action : multiuserapp_actions_customers_navtocustomers_create_action,
	multiuserapp_actions_customers_navtocustomers_createsalesorderheader_action : multiuserapp_actions_customers_navtocustomers_createsalesorderheader_action,
	multiuserapp_actions_customers_navtocustomers_detail_action : multiuserapp_actions_customers_navtocustomers_detail_action,
	multiuserapp_actions_customers_navtocustomers_edit_action : multiuserapp_actions_customers_navtocustomers_edit_action,
	multiuserapp_actions_customers_navtocustomers_list_action : multiuserapp_actions_customers_navtocustomers_list_action,
	multiuserapp_actions_deleteconfirmation_action : multiuserapp_actions_deleteconfirmation_action,
	multiuserapp_actions_deleteentityfailuremessage_action : multiuserapp_actions_deleteentityfailuremessage_action,
	multiuserapp_actions_deleteentitysuccessmessage_action : multiuserapp_actions_deleteentitysuccessmessage_action,
	multiuserapp_actions_errorarchive_errorarchive_syncfailure_action : multiuserapp_actions_errorarchive_errorarchive_syncfailure_action,
	multiuserapp_actions_errorarchive_navtoerrorarchive_detail_action : multiuserapp_actions_errorarchive_navtoerrorarchive_detail_action,
	multiuserapp_actions_errorarchive_navtoerrorarchive_list_action : multiuserapp_actions_errorarchive_navtoerrorarchive_list_action,
	multiuserapp_actions_genericbannermessage_action : multiuserapp_actions_genericbannermessage_action,
	multiuserapp_actions_genericmessagebox_action : multiuserapp_actions_genericmessagebox_action,
	multiuserapp_actions_genericnavigation_action : multiuserapp_actions_genericnavigation_action,
	multiuserapp_actions_generictoastmessage_action : multiuserapp_actions_generictoastmessage_action,
	multiuserapp_actions_logging_loguploadfailure_action : multiuserapp_actions_logging_loguploadfailure_action,
	multiuserapp_actions_logging_loguploadsuccessful_action : multiuserapp_actions_logging_loguploadsuccessful_action,
	multiuserapp_actions_logging_uploadlog_action : multiuserapp_actions_logging_uploadlog_action,
	multiuserapp_actions_logging_uploadlogprogress_action : multiuserapp_actions_logging_uploadlogprogress_action,
	multiuserapp_actions_products_navtoproducts_create_action : multiuserapp_actions_products_navtoproducts_create_action,
	multiuserapp_actions_products_navtoproducts_createpurchaseorderitem_action : multiuserapp_actions_products_navtoproducts_createpurchaseorderitem_action,
	multiuserapp_actions_products_navtoproducts_createsalesorderitem_action : multiuserapp_actions_products_navtoproducts_createsalesorderitem_action,
	multiuserapp_actions_products_navtoproducts_detail_action : multiuserapp_actions_products_navtoproducts_detail_action,
	multiuserapp_actions_products_navtoproducts_edit_action : multiuserapp_actions_products_navtoproducts_edit_action,
	multiuserapp_actions_products_navtoproducts_list_action : multiuserapp_actions_products_navtoproducts_list_action,
	multiuserapp_actions_products_products_createentity_action : multiuserapp_actions_products_products_createentity_action,
	multiuserapp_actions_products_products_createpurchaseorderitem_action : multiuserapp_actions_products_products_createpurchaseorderitem_action,
	multiuserapp_actions_products_products_createsalesorderitem_action : multiuserapp_actions_products_products_createsalesorderitem_action,
	multiuserapp_actions_products_products_deleteentity_action : multiuserapp_actions_products_products_deleteentity_action,
	multiuserapp_actions_products_products_detailpopover_action : multiuserapp_actions_products_products_detailpopover_action,
	multiuserapp_actions_products_products_opendocument_action : multiuserapp_actions_products_products_opendocument_action,
	multiuserapp_actions_products_products_updateentity_action : multiuserapp_actions_products_products_updateentity_action,
	multiuserapp_actions_products_products_uploadstream_action : multiuserapp_actions_products_products_uploadstream_action,
	multiuserapp_actions_purchaseorderitems_navtopurchaseorderitems_detail_action : multiuserapp_actions_purchaseorderitems_navtopurchaseorderitems_detail_action,
	multiuserapp_actions_purchaseorderitems_navtopurchaseorderitems_edit_action : multiuserapp_actions_purchaseorderitems_navtopurchaseorderitems_edit_action,
	multiuserapp_actions_purchaseorderitems_purchaseorderitems_deleteentity_action : multiuserapp_actions_purchaseorderitems_purchaseorderitems_deleteentity_action,
	multiuserapp_actions_purchaseorderitems_purchaseorderitems_updateentity_action : multiuserapp_actions_purchaseorderitems_purchaseorderitems_updateentity_action,
	multiuserapp_actions_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action : multiuserapp_actions_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action,
	multiuserapp_actions_salesorderheaders_navtosalesorderheaders_detail_action : multiuserapp_actions_salesorderheaders_navtosalesorderheaders_detail_action,
	multiuserapp_actions_salesorderheaders_navtosalesorderheaders_edit_action : multiuserapp_actions_salesorderheaders_navtosalesorderheaders_edit_action,
	multiuserapp_actions_salesorderheaders_salesorderheaders_createsalesorderitem_action : multiuserapp_actions_salesorderheaders_salesorderheaders_createsalesorderitem_action,
	multiuserapp_actions_salesorderheaders_salesorderheaders_deleteentity_action : multiuserapp_actions_salesorderheaders_salesorderheaders_deleteentity_action,
	multiuserapp_actions_salesorderheaders_salesorderheaders_detailpopover_action : multiuserapp_actions_salesorderheaders_salesorderheaders_detailpopover_action,
	multiuserapp_actions_salesorderheaders_salesorderheaders_updateentity_action : multiuserapp_actions_salesorderheaders_salesorderheaders_updateentity_action,
	multiuserapp_actions_salesorderitems_navtosalesorderitems_detail_action : multiuserapp_actions_salesorderitems_navtosalesorderitems_detail_action,
	multiuserapp_actions_salesorderitems_navtosalesorderitems_edit_action : multiuserapp_actions_salesorderitems_navtosalesorderitems_edit_action,
	multiuserapp_actions_salesorderitems_salesorderitems_deleteentity_action : multiuserapp_actions_salesorderitems_salesorderitems_deleteentity_action,
	multiuserapp_actions_salesorderitems_salesorderitems_updateentity_action : multiuserapp_actions_salesorderitems_salesorderitems_updateentity_action,
	multiuserapp_actions_service_closeoffline_action : multiuserapp_actions_service_closeoffline_action,
	multiuserapp_actions_service_closeofflinefailuremessage_action : multiuserapp_actions_service_closeofflinefailuremessage_action,
	multiuserapp_actions_service_closeofflinesuccessmessage_action : multiuserapp_actions_service_closeofflinesuccessmessage_action,
	multiuserapp_actions_service_downloadoffline_action : multiuserapp_actions_service_downloadoffline_action,
	multiuserapp_actions_service_downloadstartedmessage_action : multiuserapp_actions_service_downloadstartedmessage_action,
	multiuserapp_actions_service_initializeoffline_action : multiuserapp_actions_service_initializeoffline_action,
	multiuserapp_actions_service_initializeofflinefailuremessage_action : multiuserapp_actions_service_initializeofflinefailuremessage_action,
	multiuserapp_actions_service_initializeofflinesuccessmessage_action : multiuserapp_actions_service_initializeofflinesuccessmessage_action,
	multiuserapp_actions_service_syncfailuremessage_action : multiuserapp_actions_service_syncfailuremessage_action,
	multiuserapp_actions_service_syncstartedmessage_action : multiuserapp_actions_service_syncstartedmessage_action,
	multiuserapp_actions_service_uploadoffline_action : multiuserapp_actions_service_uploadoffline_action,
	multiuserapp_actions_updateentityfailuremessage_action : multiuserapp_actions_updateentityfailuremessage_action,
	multiuserapp_actions_updateentitysuccessmessage_action : multiuserapp_actions_updateentitysuccessmessage_action,
	multiuserapp_actions_uploadstreamfailuremessage_action : multiuserapp_actions_uploadstreamfailuremessage_action,
	multiuserapp_actions_uploadstreamsuccessmessage_action : multiuserapp_actions_uploadstreamsuccessmessage_action,
	multiuserapp_globals_application_appdefinition_version_global : multiuserapp_globals_application_appdefinition_version_global,
	multiuserapp_globals_application_applicationname_global : multiuserapp_globals_application_applicationname_global,
	multiuserapp_globals_application_supportemail_global : multiuserapp_globals_application_supportemail_global,
	multiuserapp_globals_application_supportphone_global : multiuserapp_globals_application_supportphone_global,
	multiuserapp_i18n_i18n_properties : multiuserapp_i18n_i18n_properties,
	multiuserapp_jsconfig_json : multiuserapp_jsconfig_json,
	multiuserapp_pages_application_about_page : multiuserapp_pages_application_about_page,
	multiuserapp_pages_application_support_page : multiuserapp_pages_application_support_page,
	multiuserapp_pages_application_useractivitylog_page : multiuserapp_pages_application_useractivitylog_page,
	multiuserapp_pages_customers_customers_create_page : multiuserapp_pages_customers_customers_create_page,
	multiuserapp_pages_customers_customers_createsalesorderheader_page : multiuserapp_pages_customers_customers_createsalesorderheader_page,
	multiuserapp_pages_customers_customers_detail_page : multiuserapp_pages_customers_customers_detail_page,
	multiuserapp_pages_customers_customers_edit_page : multiuserapp_pages_customers_customers_edit_page,
	multiuserapp_pages_customers_customers_list_page : multiuserapp_pages_customers_customers_list_page,
	multiuserapp_pages_errorarchive_errorarchive_detail_page : multiuserapp_pages_errorarchive_errorarchive_detail_page,
	multiuserapp_pages_errorarchive_errorarchive_list_page : multiuserapp_pages_errorarchive_errorarchive_list_page,
	multiuserapp_pages_main_page : multiuserapp_pages_main_page,
	multiuserapp_pages_products_products_create_page : multiuserapp_pages_products_products_create_page,
	multiuserapp_pages_products_products_createpurchaseorderitem_page : multiuserapp_pages_products_products_createpurchaseorderitem_page,
	multiuserapp_pages_products_products_createsalesorderitem_page : multiuserapp_pages_products_products_createsalesorderitem_page,
	multiuserapp_pages_products_products_detail_page : multiuserapp_pages_products_products_detail_page,
	multiuserapp_pages_products_products_edit_page : multiuserapp_pages_products_products_edit_page,
	multiuserapp_pages_products_products_list_page : multiuserapp_pages_products_products_list_page,
	multiuserapp_pages_purchaseorderitems_purchaseorderitems_detail_page : multiuserapp_pages_purchaseorderitems_purchaseorderitems_detail_page,
	multiuserapp_pages_purchaseorderitems_purchaseorderitems_edit_page : multiuserapp_pages_purchaseorderitems_purchaseorderitems_edit_page,
	multiuserapp_pages_salesorderheaders_salesorderheaders_createsalesorderitem_page : multiuserapp_pages_salesorderheaders_salesorderheaders_createsalesorderitem_page,
	multiuserapp_pages_salesorderheaders_salesorderheaders_detail_page : multiuserapp_pages_salesorderheaders_salesorderheaders_detail_page,
	multiuserapp_pages_salesorderheaders_salesorderheaders_edit_page : multiuserapp_pages_salesorderheaders_salesorderheaders_edit_page,
	multiuserapp_pages_salesorderitems_salesorderitems_detail_page : multiuserapp_pages_salesorderitems_salesorderitems_detail_page,
	multiuserapp_pages_salesorderitems_salesorderitems_edit_page : multiuserapp_pages_salesorderitems_salesorderitems_edit_page,
	multiuserapp_rules_application_appupdatefailure_js : multiuserapp_rules_application_appupdatefailure_js,
	multiuserapp_rules_application_appupdatesuccess_js : multiuserapp_rules_application_appupdatesuccess_js,
	multiuserapp_rules_application_clientismultiusermode_js : multiuserapp_rules_application_clientismultiusermode_js,
	multiuserapp_rules_application_getclientsupportversions_js : multiuserapp_rules_application_getclientsupportversions_js,
	multiuserapp_rules_application_getclientversion_js : multiuserapp_rules_application_getclientversion_js,
	multiuserapp_rules_application_onwillupdate_js : multiuserapp_rules_application_onwillupdate_js,
	multiuserapp_rules_application_resetappsettingsandlogout_js : multiuserapp_rules_application_resetappsettingsandlogout_js,
	multiuserapp_rules_customers_customers_deleteconfirmation_js : multiuserapp_rules_customers_customers_deleteconfirmation_js,
	multiuserapp_rules_errorarchive_errorarchive_checkforsyncerror_js : multiuserapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	multiuserapp_rules_logging_loglevels_js : multiuserapp_rules_logging_loglevels_js,
	multiuserapp_rules_logging_settracecategories_js : multiuserapp_rules_logging_settracecategories_js,
	multiuserapp_rules_logging_setuserloglevel_js : multiuserapp_rules_logging_setuserloglevel_js,
	multiuserapp_rules_logging_togglelogging_js : multiuserapp_rules_logging_togglelogging_js,
	multiuserapp_rules_logging_tracecategories_js : multiuserapp_rules_logging_tracecategories_js,
	multiuserapp_rules_logging_userlogsetting_js : multiuserapp_rules_logging_userlogsetting_js,
	multiuserapp_rules_products_products_createentity_js : multiuserapp_rules_products_products_createentity_js,
	multiuserapp_rules_products_products_deleteconfirmation_js : multiuserapp_rules_products_products_deleteconfirmation_js,
	multiuserapp_rules_purchaseorderitems_purchaseorderitems_deleteconfirmation_js : multiuserapp_rules_purchaseorderitems_purchaseorderitems_deleteconfirmation_js,
	multiuserapp_rules_salesorderheaders_salesorderheaders_deleteconfirmation_js : multiuserapp_rules_salesorderheaders_salesorderheaders_deleteconfirmation_js,
	multiuserapp_rules_salesorderitems_salesorderitems_deleteconfirmation_js : multiuserapp_rules_salesorderitems_salesorderitems_deleteconfirmation_js,
	multiuserapp_services_sampleservicev4_service : multiuserapp_services_sampleservicev4_service,
	multiuserapp_styles_styles_css : multiuserapp_styles_styles_css,
	multiuserapp_styles_styles_json : multiuserapp_styles_styles_json,
	multiuserapp_styles_styles_less : multiuserapp_styles_styles_less,
	multiuserapp_styles_styles_nss : multiuserapp_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Styles/Styles.css":
/*!**********************************************************!*\
  !*** ./build.definitions/MultiUserApp/Styles/Styles.css ***!
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
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/MultiUserApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MultiUserApp/Styles/Styles.less":
/*!***********************************************************!*\
  !*** ./build.definitions/MultiUserApp/Styles/Styles.less ***!
  \***********************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./build.definitions/MultiUserApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MultiUserApp/Styles/Styles.nss":
/*!**********************************************************!*\
  !*** ./build.definitions/MultiUserApp/Styles/Styles.nss ***!
  \**********************************************************/
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

/***/ "./build.definitions/MultiUserApp/Pages/Application/About.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Application/About.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/MultiUserApp/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/MultiUserApp/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/MultiUserApp/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/MultiUserApp/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MultiUserApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Application/Support.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Application/Support.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/MultiUserApp/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/MultiUserApp/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/MultiUserApp/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/MultiUserApp/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MultiUserApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Application/UserActivityLog.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Application/UserActivityLog.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/MultiUserApp/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/MultiUserApp/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/MultiUserApp/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/MultiUserApp/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/MultiUserApp/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/MultiUserApp/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/MultiUserApp/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/MultiUserApp/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Customers/Customers_Create.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Customers/Customers_Create.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MultiUserApp/Actions/Customers/Customers_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Customer Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"City","_Name":"City","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerID","KeyboardType":"Number","_Name":"CustomerID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"DateOfBirth","Caption":"DateOfBirth","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"EmailAddress","_Name":"EmailAddress","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Gender","_Name":"Gender","Segments":["Male","Female","Other","None","Unknown"],"_Type":"Control.Type.FormCell.SegmentedControl"},{"Caption":"FirstName","_Name":"FirstName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LastName","_Name":"LastName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Customers_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Customers/Customers_CreateSalesOrderHeader.page":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Customers/Customers_CreateSalesOrderHeader.page ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MultiUserApp/Actions/Customers/Customers_CreateSalesOrderHeader.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SalesOrderHeader","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerID}","ReturnValue":"{CustomerID}","Target":{"EntitySet":"Customers","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"_Name":"CustomerID","_Type":"Control.Type.FormCell.ListPicker","Value":"{CustomerID}"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","KeyboardType":"Number","_Name":"SalesOrderID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Customers_CreateSalesOrderHeader","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Customers/Customers_Detail.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Customers/Customers_Detail.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customer Detail","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/Customers/NavToCustomers_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MultiUserApp/Actions/Customers/Customers_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{FirstName}","Subhead":"{City}","BodyText":"","Footnote":"{CustomerID}","Description":"{Country}","StatusText":"{DateOfBirth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{EmailAddress}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"City","Value":"{City}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"CustomerID","Value":"{CustomerID}"},{"KeyName":"DateOfBirth","Value":"{DateOfBirth}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"FirstName","Value":"{FirstName}"},{"KeyName":"HouseNumber","Value":"{HouseNumber}"},{"KeyName":"LastName","Value":"{LastName}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"PostalCode","Value":"{PostalCode}"},{"KeyName":"Street","Value":"{Street}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Address"},"KeyAndValues":[{"KeyName":"HouseNumber","Value":"{Address/HouseNumber}"},{"KeyName":"Street","Value":"{Address/Street}"},{"KeyName":"City","Value":"{Address/City}"},{"KeyName":"Country","Value":"{Address/Country}"},{"KeyName":"PostalCode","Value":"{Address/PostalCode}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValueAddress","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"SalesOrders"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerID}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}","OnPress":"/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrders","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Customers/Customers_Edit.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Customers/Customers_Edit.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Customer Detail","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MultiUserApp/Actions/Customers/Customers_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"City","_Name":"City","Value":"{City}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","Value":"{Country}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerID","_Name":"CustomerID","Value":"{CustomerID}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Mode":"Date","_Name":"DateOfBirth","Value":"{DateOfBirth}","Caption":"DateOfBirth","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"EmailAddress","_Name":"EmailAddress","Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Gender","_Name":"Gender","Value":"{Gender}","Segments":["Male","Female","Other","None","Unknown"],"_Type":"Control.Type.FormCell.SegmentedControl"},{"Caption":"FirstName","_Name":"FirstName","Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","Value":"{HouseNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LastName","_Name":"LastName","Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","Value":"{PostalCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","Value":"{Street}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Customers_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Customers/Customers_List.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Customers/Customers_List.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customers","ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/Customers/NavToCustomers_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{Country}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MultiUserApp/Actions/Customers/NavToCustomers_Detail.action","StatusImage":"","Title":"{FirstName}","Footnote":"{CustomerID}","PreserveIconStackSpacing":false,"StatusText":"{DateOfBirth}","Subhead":"{City}","SubstatusText":"{EmailAddress}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Customers","Service":"/MultiUserApp/Services/SampleServiceV4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"None","OnPress":"/MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Main.page":
/*!********************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Main.page ***!
  \********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/MultiUserApp/Actions/Customers/NavToCustomers_List.action","Alignment":"Center","Title":"Customers","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/MultiUserApp/Actions/Products/NavToProducts_List.action","Alignment":"Center","Title":"Products","ButtonType":"Text","Semantic":"Tint"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MultiUserApp/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Products/Products_Create.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Products/Products_Create.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MultiUserApp/Rules/Products/Products_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create $(L,PRODUCT_TYPE)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Category","_Name":"Category","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","KeyboardType":"Number","_Name":"DimensionDepth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","KeyboardType":"Number","_Name":"DimensionHeight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","KeyboardType":"Number","_Name":"DimensionWidth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","KeyboardType":"Number","_Name":"Price","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","KeyboardType":"Number","_Name":"ProductID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierID}","Target":{"EntitySet":"Suppliers","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"_Name":"SupplierID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Weight","KeyboardType":"Number","_Name":"Weight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"AttachmentTitle":"Picture","AttachmentAddTitle":"Browse","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":["jpg","png","gif"],"_Name":"Picture","_Type":"Control.Type.FormCell.Attachment"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Products/Products_CreatePurchaseOrderItem.page":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Products/Products_CreatePurchaseOrderItem.page ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MultiUserApp/Actions/Products/Products_CreatePurchaseOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create PurchaseOrderItem","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ProductID}"},{"Caption":"PurchaseOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderID}","ReturnValue":"{PurchaseOrderID}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"_Name":"PurchaseOrderID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_CreatePurchaseOrderItem","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Products/Products_CreateSalesOrderItem.page":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Products/Products_CreateSalesOrderItem.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MultiUserApp/Actions/Products/Products_CreateSalesOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SalesOrderItem","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"DeliveryDate","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ProductID}"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderID}","ReturnValue":"{SalesOrderID}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"_Name":"SalesOrderID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_CreateSalesOrderItem","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Products/Products_Detail.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Products/Products_Detail.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PRODUCT_TYPE)","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/Products/NavToProducts_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MultiUserApp/Actions/Products/Products_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/MultiUserApp/Services/SampleServiceV4.service/{@odata.readLink}/Picture","HeadlineText":"{Name}","Subhead":"{Category}","BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductID","Value":"{ProductID}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierID","Value":"{SupplierID}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"PurchaseOrderItems"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderID}","OnPress":"/MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/PurchaseOrderItems","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"SalesOrderItems"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrderItems","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["PurchaseOrderItems","SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Products/Products_Edit.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Products/Products_Edit.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update $(L,PRODUCT_TYPE)","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MultiUserApp/Actions/Products/Products_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Category","_Name":"Category","Value":"{Category}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","Value":"{CategoryName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","_Name":"DimensionDepth","Value":"{DimensionDepth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","_Name":"DimensionHeight","Value":"{DimensionHeight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","Value":"{DimensionUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","_Name":"DimensionWidth","Value":"{DimensionWidth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","Value":"{LongDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","Value":"{PictureUrl}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","_Name":"Price","Value":"{Price}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","_Name":"ProductID","Value":"{ProductID}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","Value":"{ShortDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierID}","Target":{"EntitySet":"Suppliers","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"Value":"{SupplierID}","_Name":"SupplierID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Weight","_Name":"Weight","Value":"{Weight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","Value":"{WeightUnit}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/Products/Products_List.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/Products/Products_List.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PRODUCT_TYPES)","ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/Products/NavToProducts_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{CategoryName}","AvatarStack":{"Avatars":[{"Image":"/MultiUserApp/Services/SampleServiceV4.service/{@odata.readLink}/Picture"}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MultiUserApp/Actions/Products/NavToProducts_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Products","Service":"/MultiUserApp/Services/SampleServiceV4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page":
/*!************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MultiUserApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductID}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{ItemNumber}","Description":"{GrossAmount}","StatusText":"{NetAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PurchaseOrderID}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductID","Value":"{ProductID}"},{"KeyName":"PurchaseOrderID","Value":"{PurchaseOrderID}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","_Name":"ItemNumber","Value":"{ItemNumber}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"Value":"{ProductID}","_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderID}","ReturnValue":"{PurchaseOrderID}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"Value":"{PurchaseOrderID}","_Name":"PurchaseOrderID","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"Quantity","_Name":"Quantity","Value":"{Quantity}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SalesOrderItem","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"DeliveryDate","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderID}","ReturnValue":"{SalesOrderID}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"_Name":"SalesOrderID","_Type":"Control.Type.FormCell.ListPicker","Value":"{SalesOrderID}"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_CreateSalesOrderItem","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{LifeCycleStatusName}","Subhead":"{CreatedAt}","BodyText":"","Footnote":"{CustomerID}","Description":"{CurrencyCode}","StatusText":"{GrossAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{LifeCycleStatus}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CreatedAt","Value":"{CreatedAt}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"CustomerID","Value":"{CustomerID}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"LifeCycleStatus","Value":"{LifeCycleStatus}"},{"KeyName":"LifeCycleStatusName","Value":"{LifeCycleStatusName}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"SalesOrderID","Value":"{SalesOrderID}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Value":"{CreatedAt}","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerID}","ReturnValue":"{CustomerID}","Target":{"EntitySet":"Customers","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"Value":"{CustomerID}","_Name":"CustomerID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","Value":"{LifeCycleStatus}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","Value":"{LifeCycleStatusName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","_Name":"SalesOrderID","Value":"{SalesOrderID}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderItem Detail","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MultiUserApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductID}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{GrossAmount}","Description":"{DeliveryDate}","StatusText":"{ItemNumber}","StatusImage":"","SubstatusImage":"","SubstatusText":"{NetAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DeliveryDate","Value":"{DeliveryDate}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductID","Value":"{ProductID}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"SalesOrderID","Value":"{SalesOrderID}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update SalesOrderItem Detail","DesignTimeTarget":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MultiUserApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"DeliveryDate","Value":"{DeliveryDate}","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","_Name":"ItemNumber","Value":"{ItemNumber}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"Value":"{ProductID}","_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","_Name":"Quantity","Value":"{Quantity}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderID}","ReturnValue":"{SalesOrderID}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MultiUserApp/Services/SampleServiceV4.service"}},"Value":"{SalesOrderID}","_Name":"SalesOrderID","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/MultiUserApp/Pages/Main.page","OnLaunch":["/MultiUserApp/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MultiUserApp/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/MultiUserApp/Actions/Service/InitializeOffline.action","OnUserSwitch":"/MultiUserApp/Actions/Service/SyncStartedMessage.action","Styles":"/MultiUserApp/Styles/Styles.less","Version":"/MultiUserApp/Globals/Application/AppDefinition_Version.global","Localization":"/MultiUserApp/i18n/i18n.properties","_SchemaVersion":"23.12","_Name":"MultiUserApp","StyleSheets":{"Styles":{"css":"/MultiUserApp/Styles/Styles.css","ios":"/MultiUserApp/Styles/Styles.nss","android":"/MultiUserApp/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/AppUpdate.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/AppUpdate.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MultiUserApp/Rules/Application/AppUpdateFailure.js","OnSuccess":"/MultiUserApp/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/AppUpdateFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/AppUpdateFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/AppUpdateProgressBanner.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/AppUpdateProgressBanner.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MultiUserApp/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/AppUpdateSuccessMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/AppUpdateSuccessMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/Logout.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/Logout.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/NavToAbout.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/NavToAbout.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/NavToActivityLog.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/NavToActivityLog.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/NavToSupport.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/NavToSupport.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/MultiUserApp/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/OnWillUpdate.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/OnWillUpdate.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/Reset.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/Reset.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/ResetMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/ResetMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/MultiUserApp/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Application/UserMenuPopover.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Application/UserMenuPopover.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/MultiUserApp/Actions/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/MultiUserApp/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/MultiUserApp/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/MultiUserApp/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/MultiUserApp/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/MultiUserApp/Actions/Application/Logout.action","Title":"Logout","Visible":"/MultiUserApp/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/CloseModalPage_Cancel.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/CloseModalPage_Cancel.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/CloseModalPage_Complete.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/CloseModalPage_Complete.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/ClosePage.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/ClosePage.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/CreateEntityFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/CreateEntityFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/CreateEntitySuccessMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/CreateEntitySuccessMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MultiUserApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/Customers_CreateEntity.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/Customers_CreateEntity.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MultiUserApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MultiUserApp/Actions/CreateEntitySuccessMessage.action","Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","CustomerID":"#Control:CustomerID/#Value","DateOfBirth":"#Control:DateOfBirth/#Value","EmailAddress":"#Control:EmailAddress/#Value","FirstName":"#Control:FirstName/#Value","HouseNumber":"#Control:HouseNumber/#Value","LastName":"#Control:LastName/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value"},"Target":{"EntitySet":"Customers","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/Customers_CreateSalesOrderHeader.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/Customers_CreateSalesOrderHeader.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"SalesOrders","Target":{"EntitySet":"Customers","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MultiUserApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MultiUserApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerID":"#Control:CustomerID/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderID":"#Control:SalesOrderID/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/Customers_DeleteEntity.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/Customers_DeleteEntity.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Customers","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MultiUserApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/Customers_DetailPopover.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/Customers_DetailPopover.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add SalesOrderHeader","OnPress":"/MultiUserApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action"},{"Title":"Delete","OnPress":"/MultiUserApp/Rules/Customers/Customers_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/Customers_UpdateEntity.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/Customers_UpdateEntity.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Customers","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","CustomerID":"#Control:CustomerID/#Value","DateOfBirth":"#Control:DateOfBirth/#Value","EmailAddress":"#Control:EmailAddress/#Value","FirstName":"#Control:FirstName/#Value","HouseNumber":"#Control:HouseNumber/#Value","LastName":"#Control:LastName/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MultiUserApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_Create.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_Create.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/Customers/Customers_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/Customers/Customers_CreateSalesOrderHeader.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_Detail.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_Detail.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MultiUserApp/Pages/Customers/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_Edit.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_Edit.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/Customers/Customers_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_List.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Customers/NavToCustomers_List.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MultiUserApp/Pages/Customers/Customers_List.page"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/DeleteConfirmation.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/DeleteConfirmation.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/DeleteEntityFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/DeleteEntityFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/DeleteEntitySuccessMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/DeleteEntitySuccessMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MultiUserApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MultiUserApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MultiUserApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/GenericBannerMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/GenericBannerMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/GenericMessageBox.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/GenericMessageBox.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/GenericNavigation.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/GenericNavigation.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/MultiUserApp/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/GenericToastMessage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/GenericToastMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Logging/LogUploadFailure.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Logging/LogUploadFailure.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Logging/LogUploadSuccessful.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Logging/LogUploadSuccessful.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Logging/UploadLog.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Logging/UploadLog.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/MultiUserApp/Actions/Logging/LogUploadFailure.action","OnSuccess":"/MultiUserApp/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Logging/UploadLogProgress.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Logging/UploadLogProgress.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/MultiUserApp/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_Create.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/NavToProducts_Create.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/Products/Products_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_CreatePurchaseOrderItem.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/NavToProducts_CreatePurchaseOrderItem.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/Products/Products_CreatePurchaseOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_CreateSalesOrderItem.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/NavToProducts_CreateSalesOrderItem.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/Products/Products_CreateSalesOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_Detail.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/NavToProducts_Detail.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MultiUserApp/Pages/Products/Products_Detail.page"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_Edit.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/NavToProducts_Edit.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/Products/Products_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/NavToProducts_List.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/NavToProducts_List.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MultiUserApp/Pages/Products/Products_List.page"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/Products_CreateEntity.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/Products_CreateEntity.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MultiUserApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MultiUserApp/Actions/CreateEntitySuccessMessage.action","Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductID":"#Control:ProductID/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierID":"#Control:SupplierID/#SelectedValue","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"Target":{"EntitySet":"Products","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/Products_CreatePurchaseOrderItem.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/Products_CreatePurchaseOrderItem.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"PurchaseOrderItems","Target":{"EntitySet":"Products","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MultiUserApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MultiUserApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","PurchaseOrderID":"#Control:PurchaseOrderID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/Products_CreateSalesOrderItem.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/Products_CreateSalesOrderItem.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"SalesOrderItems","Target":{"EntitySet":"Products","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MultiUserApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MultiUserApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderID":"#Control:SalesOrderID/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderItems","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/Products_DeleteEntity.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/Products_DeleteEntity.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Products","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MultiUserApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/Products_DetailPopover.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/Products_DetailPopover.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Open Document","OnPress":"/MultiUserApp/Actions/Products/Products_OpenDocument.action"},{"Title":"Add PurchaseOrderItem","OnPress":"/MultiUserApp/Actions/Products/NavToProducts_CreatePurchaseOrderItem.action"},{"Title":"Add SalesOrderItem","OnPress":"/MultiUserApp/Actions/Products/NavToProducts_CreateSalesOrderItem.action"},{"Title":"Delete","OnPress":"/MultiUserApp/Rules/Products/Products_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/Products_OpenDocument.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/Products_OpenDocument.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","Path":"/MultiUserApp/Services/SampleServiceV4.service/{@odata.readLink}/Picture","MimeType":"image/jpeg"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/Products_UpdateEntity.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/Products_UpdateEntity.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Products","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductID":"#Control:ProductID/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierID":"#Control:SupplierID/#SelectedValue","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MultiUserApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Products/Products_UploadStream.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Products/Products_UploadStream.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UploadStream","Target":{"Service":"/MultiUserApp/Services/SampleServiceV4.service","EntitySet":"Products","ReadLink":"{@odata.readLink}"},"Properties":{"Picture":"#Control:Picture/#Value"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"uploadstream"},"OnSuccess":"/MultiUserApp/Actions/UploadStreamSuccessMessage.action","OnFailure":"/MultiUserApp/Actions/UploadStreamFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MultiUserApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"PurchaseOrderItems","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","PurchaseOrderID":"#Control:PurchaseOrderID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MultiUserApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action":
/*!****************************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"Items","Target":{"EntitySet":"SalesOrderHeaders","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MultiUserApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MultiUserApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderID":"#Control:SalesOrderID/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderItems","Service":"/MultiUserApp/Services/SampleServiceV4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MultiUserApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add SalesOrderItem","OnPress":"/MultiUserApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action"},{"Title":"Delete","OnPress":"/MultiUserApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerID":"#Control:CustomerID/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderID":"#Control:SalesOrderID/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MultiUserApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MultiUserApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"SalesOrderItems","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MultiUserApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"SalesOrderItems","Service":"/MultiUserApp/Services/SampleServiceV4.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderID":"#Control:SalesOrderID/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MultiUserApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MultiUserApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/CloseOffline.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/CloseOffline.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MultiUserApp/Services/SampleServiceV4.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MultiUserApp/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MultiUserApp/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/CloseOfflineFailureMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/CloseOfflineFailureMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/CloseOfflineSuccessMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/DownloadOffline.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/DownloadOffline.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MultiUserApp/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Products","Query":"Products"},{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MultiUserApp/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MultiUserApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/DownloadStartedMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/DownloadStartedMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MultiUserApp/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/InitializeOffline.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/InitializeOffline.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MultiUserApp/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Products","Query":"Products"},{"Name":"Customers","Query":"Customers"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MultiUserApp/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MultiUserApp/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/InitializeOfflineFailureMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/SyncFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/SyncFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/SyncStartedMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/SyncStartedMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MultiUserApp/Actions/Service/UploadOffline.action","OnFailure":"/MultiUserApp/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/Service/UploadOffline.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/Service/UploadOffline.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MultiUserApp/Services/SampleServiceV4.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MultiUserApp/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MultiUserApp/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/UpdateEntityFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/UpdateEntityFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/UpdateEntitySuccessMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/UpdateEntitySuccessMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MultiUserApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/UploadStreamFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/UploadStreamFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload stream failure - {#ActionResults:uploadstream/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Actions/UploadStreamSuccessMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Actions/UploadStreamSuccessMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Stream uploaded","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MultiUserApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Globals/Application/AppDefinition_Version.global":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Globals/Application/AppDefinition_Version.global ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Globals/Application/ApplicationName.global":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Globals/Application/ApplicationName.global ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Globals/Application/SupportEmail.global":
/*!********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Globals/Application/SupportEmail.global ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Globals/Application/SupportPhone.global":
/*!********************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Globals/Application/SupportPhone.global ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MultiUserApp/Services/SampleServiceV4.service":
/*!*************************************************************************!*\
  !*** ./build.definitions/MultiUserApp/Services/SampleServiceV4.service ***!
  \*************************************************************************/
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

/***/ "./build.definitions/MultiUserApp/Styles/Styles.json":
/*!***********************************************************!*\
  !*** ./build.definitions/MultiUserApp/Styles/Styles.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MultiUserApp/jsconfig.json":
/*!******************************************************!*\
  !*** ./build.definitions/MultiUserApp/jsconfig.json ***!
  \******************************************************/
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