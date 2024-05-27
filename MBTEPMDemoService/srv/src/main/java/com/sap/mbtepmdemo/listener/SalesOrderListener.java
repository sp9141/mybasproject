// Note: This listener will be overwritten if the service is regenerated.
// To allow customization and avoid overwriting upon service regeneration,
// please delete this comment.

package com.sap.mbtepmdemo.listener;

import com.sap.cloud.server.odata.*;

public class SalesOrderListener extends com.sap.cloud.server.odata.DefaultEntityListener {
    private com.sap.mbtepmdemo.MainServlet servlet;
    private com.sap.mbtepmdemo.proxy.ComSapMbtepmdemoService service;

    public SalesOrderListener(com.sap.mbtepmdemo.MainServlet servlet, com.sap.mbtepmdemo.proxy.ComSapMbtepmdemoService service) {
        super();
        this.servlet = servlet;
        this.service = service;
        allowUnused(this.servlet);
        allowUnused(this.service);
    }

    @Override public void beforeQuery(DataQuery query) {
        allowUnused(query);
    }

    public void beforeSave(EntityValue entityValue) {
        // Shared code for beforeCreate / beforeUpdate.
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        allowUnused(entity);
    }

    @Override public void beforeCreate(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        allowUnused(entity);
        beforeSave(entity);
    }

    @Override public void beforeUpdate(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        allowUnused(entity);
        beforeSave(entity);
    }

    @Override public void beforeDelete(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        allowUnused(entity);
    }

    public void afterSave(EntityValue entityValue) {
        // Shared code for afterCreate / afterUpdate.
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        allowUnused(entity);
    }

    @Override public void afterCreate(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        allowUnused(entity);
        afterSave(entity);
    }

    @Override public void afterUpdate(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        allowUnused(entity);
        afterSave(entity);
    }

    @Override public void afterDelete(EntityValue entityValue) {
        com.sap.mbtepmdemo.proxy.SalesOrder entity = (com.sap.mbtepmdemo.proxy.SalesOrder)entityValue;
        allowUnused(entity);
    }
}
