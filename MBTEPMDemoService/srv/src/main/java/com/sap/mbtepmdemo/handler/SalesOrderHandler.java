// Note: This handler will be overwritten if the service is regenerated.
// To allow customization and avoid overwriting upon service regeneration,
// please delete this comment.

package com.sap.mbtepmdemo.handler;

import com.sap.cloud.server.odata.*;
import com.sap.cloud.server.odata.json.*;

public class SalesOrderHandler extends com.sap.cloud.server.odata.http.HttpEntityHandler {
    private com.sap.mbtepmdemo.MainServlet servlet;
    private com.sap.mbtepmdemo.proxy.ComSapMbtepmdemoService service;

    private static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(SalesOrderHandler.class);

    private final EntityType ENTITY_TYPE = com.sap.mbtepmdemo.proxy.ComSapMbtepmdemoServiceMetadata.document.getEntityType("com.sap.mbtepmdemo.SalesOrder");
    private final Property entity_BillingStatus = ENTITY_TYPE.getProperty("BillingStatus");
    private final Property entity_BillingStatusDescription = ENTITY_TYPE.getProperty("BillingStatusDescription");
    private final Property entity_BusinessPartnerID = ENTITY_TYPE.getProperty("BusinessPartnerID");
    private final Property entity_ChangedAt = ENTITY_TYPE.getProperty("ChangedAt");
    private final Property entity_CreatedAt = ENTITY_TYPE.getProperty("CreatedAt");
    private final Property entity_CurrencyCode = ENTITY_TYPE.getProperty("CurrencyCode");
    private final Property entity_CustomerID = ENTITY_TYPE.getProperty("CustomerID");
    private final Property entity_CustomerName = ENTITY_TYPE.getProperty("CustomerName");
    private final Property entity_DeliveryStatus = ENTITY_TYPE.getProperty("DeliveryStatus");
    private final Property entity_DeliveryStatusDescription = ENTITY_TYPE.getProperty("DeliveryStatusDescription");
    private final Property entity_GrossAmount = ENTITY_TYPE.getProperty("GrossAmount");
    private final Property entity_LifecycleStatus = ENTITY_TYPE.getProperty("LifecycleStatus");
    private final Property entity_LifecycleStatusDescription = ENTITY_TYPE.getProperty("LifecycleStatusDescription");
    private final Property entity_NetAmount = ENTITY_TYPE.getProperty("NetAmount");
    private final Property entity_Note = ENTITY_TYPE.getProperty("Note");
    private final Property entity_NoteLanguage = ENTITY_TYPE.getProperty("NoteLanguage");
    private final Property entity_SalesOrderID = ENTITY_TYPE.getProperty("SalesOrderID");
    private final Property entity_TaxAmount = ENTITY_TYPE.getProperty("TaxAmount");
    
    public SalesOrderHandler(com.sap.mbtepmdemo.MainServlet servlet, com.sap.mbtepmdemo.proxy.ComSapMbtepmdemoService service) {
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
        com.sap.mbtepmdemo.proxy.SalesOrder entity = new com.sap.mbtepmdemo.proxy.SalesOrder();
        org.apache.http.client.methods.HttpUriRequest request;
        org.apache.http.client.methods.CloseableHttpResponse response = null;
        CharStream stream = null;
        boolean ok = false;
        try {
            request = get("/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/SalesOrderSet");
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
                entity.setDataValue(entity_BillingStatus, fieldValue(output4, "BillingStatus", entity_BillingStatus, context));
                entity.setDataValue(entity_BillingStatusDescription, fieldValue(output4, "BillingStatusDescription", entity_BillingStatusDescription, context));
                entity.setDataValue(entity_CurrencyCode, fieldValue(output4, "CurrencyCode", entity_CurrencyCode, context));
                entity.setDataValue(entity_BusinessPartnerID, fieldValue(output4, "CustomerID", entity_BusinessPartnerID, context));
                entity.setDataValue(entity_CustomerName, fieldValue(output4, "CustomerName", entity_CustomerName, context));
                entity.setDataValue(entity_DeliveryStatus, fieldValue(output4, "DeliveryStatus", entity_DeliveryStatus, context));
                entity.setDataValue(entity_DeliveryStatusDescription, fieldValue(output4, "DeliveryStatusDescription", entity_DeliveryStatusDescription, context));
                entity.setDataValue(entity_GrossAmount, fieldValue(output4, "GrossAmount", entity_GrossAmount, context));
                entity.setDataValue(entity_LifecycleStatus, fieldValue(output4, "LifecycleStatus", entity_LifecycleStatus, context));
                entity.setDataValue(entity_LifecycleStatusDescription, fieldValue(output4, "LifecycleStatusDescription", entity_LifecycleStatusDescription, context));
                entity.setDataValue(entity_NetAmount, fieldValue(output4, "NetAmount", entity_NetAmount, context));
                entity.setDataValue(entity_Note, fieldValue(output4, "Note", entity_Note, context));
                entity.setDataValue(entity_NoteLanguage, fieldValue(output4, "NoteLanguage", entity_NoteLanguage, context));
                entity.setDataValue(entity_SalesOrderID, fieldValue(output4, "SalesOrderID", entity_SalesOrderID, context));
                entity.setDataValue(entity_TaxAmount, fieldValue(output4, "TaxAmount", entity_TaxAmount, context));
                result.add(entity);
                entity = new com.sap.mbtepmdemo.proxy.SalesOrder();
            }
            ok = true;
        }
        finally {
            close(ok, stream, response);
        }
        return result;
    }

    @Override public void createEntity(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        throw DataServiceException.createEntityNotImplemented(entity);
    }

    @Override public void updateEntity(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        throw DataServiceException.updateEntityNotImplemented(entity);
    }

    @Override public void deleteEntity(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        throw DataServiceException.deleteEntityNotImplemented(entity);
    }

    @Override public void refreshCache(EntitySet entitySet, boolean inDownload, boolean force) {
        super.refreshCache(entitySet, inDownload, force);
    }
}
