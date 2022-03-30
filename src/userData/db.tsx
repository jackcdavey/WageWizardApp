import { isAnyOf } from "@reduxjs/toolkit";
import React from "react";
import Realm from "realm";

//Helpful resources:
//https://stackoverflow.com/questions/66449256/realm-with-fully-offline-work-never-online?rq=1
//https://www.mongodb.com/docs/realm/sdk/react-native/examples/open-and-close-a-realm/#open-a-local--non-synced--realm
//https://www.mongodb.com/docs/realm/sdk/react-native/quick-start-local/
//https://zhuinden.medium.com/designing-the-schema-of-realm-effectively-and-other-realm-tips-feb76c5b6072

const UserModel = {
    name: 'UserModel',
    primaryKey: 'id',
    properties: {
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        pin: 'int?',
        useBiometric: 'bool',
    },
};

const WorkLogModel = {
    name: 'WorkLogModel',
    primaryKey: 'id',
    properties: {
        jobId: 'int',
        notes: 'string',
        startTime: 'date',
        endTime: 'date',
        breakCount: 'int',
        totalBreakTime: 'int',
        //Perhaps store breaks in an array to allow for multiple breaks with fewer lines of code
        //Orrr create a new model for breaks
    },
};



// const BreakModel = {
//     name: 'BreakModel',
//     primaryKey: 'id',
//     properties: {
//         breakId: 'int',
//         startTime: 'date',
//         endTime: 'date',
//         breakTime: 'int',
//     },
// };

try {
    const realm = await Realm.open({
        schema: [UserModel, WorkLogModel],
    });
    realm.close();
} catch (error) {
    console.log(error);
}


const logs = realm.objects('WorkLogModel');
// async function startRealm() {
//     const realm = await Realm.open({
//         path: "datarealm",
//         schema: [UserModel, WorkLogModel],
//     });

//     let user1, log1;
//     realm.write(() => {
//         user1 = realm.create('UserModel', {
//             id: 1,
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'testatgmaildotcom',
//             pin: 1234,
//             useBiometric: true,
//         });
//         log1 = realm.create('WorkLogModel', {
//             id: 1,
//             jobId: 1,
//             notes: 'Log one notes',
//             startTime: new Date(),
//             endTime: new Date(),
//             breakCount: 0,
//             totalBreakTime: 0,
//         });
//         console.log('created user: ${user1.firstname} and log with ${log1.notes}');
//     });
// }

// function logListener(logs, changes) {

//     changes.newModifications.forEach((index) => {
//         let modifiedLog = logs[index];
//         console.log(`${modifiedLog.notes} was modified`);
//     });
// }
