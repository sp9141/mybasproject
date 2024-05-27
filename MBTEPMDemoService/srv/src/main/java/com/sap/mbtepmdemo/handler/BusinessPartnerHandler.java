// Note: This handler will be overwritten if the service is regenerated.
// To allow customization and avoid overwriting upon service regeneration,
// please delete this comment.

package com.sap.mbtepmdemo.handler;

import com.sap.cloud.server.odata.*;
import com.sap.cloud.server.odata.json.*;

public class BusinessPartnerHandler extends com.sap.cloud.server.odata.http.HttpEntityHandler {
    private com.sap.mbtepmdemo.MainServlet servlet;
    private com.sap.mbtepmdemo.proxy.ComSapMbtepmdemoService service;

    private static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(BusinessPartnerHandler.class);

    private final EntityType ENTITY_TYPE = com.sap.mbtepmdemo.proxy.ComSapMbtepmdemoServiceMetadata.document.getEntityType("com.sap.mbtepmdemo.BusinessPartner");
    private final Property entity_AddressType = ENTITY_TYPE.getProperty("AddressType");
    private final Property entity_Building = ENTITY_TYPE.getProperty("Building");
    private final Property entity_City = ENTITY_TYPE.getProperty("City");
    private final Property entity_Country = ENTITY_TYPE.getProperty("Country");
    private final Property entity_PostalCode = ENTITY_TYPE.getProperty("PostalCode");
    private final Property entity_Street = ENTITY_TYPE.getProperty("Street");
    private final Property entity_BusinessPartnerID = ENTITY_TYPE.getProperty("BusinessPartnerID");
    private final Property entity_BusinessPartnerRole = ENTITY_TYPE.getProperty("BusinessPartnerRole");
    private final Property entity_CompanyName = ENTITY_TYPE.getProperty("CompanyName");
    private final Property entity_FaxNumber = ENTITY_TYPE.getProperty("FaxNumber");
    private final Property entity_LegalForm = ENTITY_TYPE.getProperty("LegalForm");
    private final Property entity_PhoneNumber = ENTITY_TYPE.getProperty("PhoneNumber");
    
    public BusinessPartnerHandler(com.sap.mbtepmdemo.MainServlet servlet, com.sap.mbtepmdemo.proxy.ComSapMbtepmdemoService service) {
        super(servlet, service, logger);
        this.servlet = servlet;
        this.service = service;
        allowUnused(this.servlet);
        allowUnused(this.service);
        setDestination(com.sap.cloud.server.odata.http.HttpDestination.lookup("ES5"));
    }

    @Override public DataValue executeQuery(DataQuery query) {
        return service.executeQuery(query).getResult();
    }

    @Override public DataValue loadAll(DataQuery query) {
        EntityValueList result = new EntityValueList().withItemType(ENTITY_TYPE);
        com.sap.mbtepmdemo.proxy.BusinessPartner entity = new com.sap.mbtepmdemo.proxy.BusinessPartner();
        org.apache.http.client.methods.HttpUriRequest request;
        org.apache.http.client.methods.CloseableHttpResponse response = null;
        CharStream stream = null;
        boolean ok = false;
        try {
            request = get("/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/BusinessPartnerSet");
            com.sap.mbtepmdemo.HeaderProvider.getInstance().addHttpHeaders(getDestination(), request);
            DataContext context = dataContext();
            JsonObject headers = new JsonObject();
            headers.setString("Accept", "application/json");
            setHeaders(request, headers);
            response = execute(request, JSON);
            checkStatus(response);
            stream = charStream(response);
            JsonObject output = jsonObject(stream);
            JsonObject output2 = getObject(output, "d");
            JsonArray output3 = getArray(output2, "results");
            int count3 = output3.length();
            for (int index3 = 0; index3 < count3; index3++) {
                JsonObject output4 = output3.getObject(index3);
                JsonObject output5 = getObject(output4, "Address");
                entity.setDataValue(entity_AddressType, fieldValue(output5, "AddressType", entity_AddressType, context));
                entity.setDataValue(entity_Building, fieldValue(output5, "Building", entity_Building, context));
                entity.setDataValue(entity_City, fieldValue(output5, "City", entity_City, context));
                entity.setDataValue(entity_Country, fieldValue(output5, "Country", entity_Country, context));
                entity.setDataValue(entity_PostalCode, fieldValue(output5, "PostalCode", entity_PostalCode, context));
                entity.setDataValue(entity_Street, fieldValue(output5, "Street", entity_Street, context));
                entity.setDataValue(entity_BusinessPartnerID, fieldValue(output4, "BusinessPartnerID", entity_BusinessPartnerID, context));
                entity.setDataValue(entity_BusinessPartnerRole, fieldValue(output4, "BusinessPartnerRole", entity_BusinessPartnerRole, context));
                entity.setDataValue(entity_CompanyName, fieldValue(output4, "CompanyName", entity_CompanyName, context));
                entity.setDataValue(entity_FaxNumber, fieldValue(output4, "FaxNumber", entity_FaxNumber, context));
                entity.setDataValue(entity_LegalForm, fieldValue(output4, "LegalForm", entity_LegalForm, context));
                entity.setDataValue(entity_PhoneNumber, fieldValue(output4, "PhoneNumber", entity_PhoneNumber, context));
                result.add(entity);
                entity = new com.sap.mbtepmdemo.proxy.BusinessPartner();
            }
            ok = true;
        }
        finally {
            close(ok, stream, response);
        }
        return result;
    }

    @Override public void createEntity(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.BusinessPartner entity = (com.sap.mbtepmdemo.proxy.BusinessPartner)entityValue;
        throw DataServiceException.createEntityNotImplemented(entity);
    }

    @Override public void updateEntity(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.BusinessPartner entity = (com.sap.mbtepmdemo.proxy.BusinessPartner)entityValue;
        throw DataServiceException.updateEntityNotImplemented(entity);
    }

    @Override public void deleteEntity(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.BusinessPartner entity = (com.sap.mbtepmdemo.proxy.BusinessPartner)entityValue;
        throw DataServiceException.deleteEntityNotImplemented(entity);
    }

    @Override public void refreshCache(EntitySet entitySet, boolean inDownload, boolean force) {
        super.refreshCache(entitySet, inDownload, force);
    }
}
