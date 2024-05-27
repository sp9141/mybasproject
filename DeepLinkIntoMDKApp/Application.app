{
	"_Name": "DeepLinkIntoMDKApp",
	"Version": "/DeepLinkIntoMDKApp/Globals/Application/AppDefinition_Version.global",
	"MainPage": "/DeepLinkIntoMDKApp/Pages/Main.page",
	"OnLaunch": [
		"/DeepLinkIntoMDKApp/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/DeepLinkIntoMDKApp/Rules/Application/OnWillUpdate.js",
	"OnDidUpdate": "/DeepLinkIntoMDKApp/Actions/Service/InitializeOffline.action",
	"Styles": "/DeepLinkIntoMDKApp/Styles/Styles.less",
	"Localization": "/DeepLinkIntoMDKApp/i18n/i18n.properties",
	"_SchemaVersion": "23.12"
}