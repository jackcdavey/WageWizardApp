import React from "react";
import Realm from "realm";

const ActiveTrackingModel = {
    name: 'ActiveTrackingModel',
    primaryKey: 'id',
    properties: {
        currentlyTracking: 'bool',
        two: 'string',
        three: 'string',
    },
};

const WorkLogModel = {
    name: 'WorkLogModel',
    primaryKey: 'id',
    properties: {
        jobId: 'int',
        notes: 'string',
    },
};

const realm = async () => {
    await Realm.open({
        schema: [ActiveTrackingModel]
    });
};

