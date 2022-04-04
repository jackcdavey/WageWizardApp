import Realm from "realm";
import realm from "realm";

//Helpful resources:
//https://stackoverflow.com/questions/66449256/realm-with-fully-offline-work-never-online?rq=1
//https://www.mongodb.com/docs/realm/sdk/react-native/examples/open-and-close-a-realm/#open-a-local--non-synced--realm
//https://www.mongodb.com/docs/realm/sdk/react-native/quick-start-local/
//https://zhuinden.medium.com/designing-the-schema-of-realm-effectively-and-other-realm-tips-feb76c5b6072

class User extends Realm.Object { }
User.schema = {
    name: "User",
    properties: {
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        birthday: 'string',//will be a date
        pin: 'int?', //Remove this later, will be handled by verifyPin component
        usePin: 'bool',
        useBiometric: 'bool',
    },
    primaryKey: 'firstName',
};

class Job extends Realm.Object { }
Job.schema = {
    name: "Job",
    properties: {
        id: 'int',
        employer: 'string',
        client: 'string',
        location: 'string',
        //Eventually location should be an array of lat/long + diameter(or maybe z-index of map?)
    },
    primaryKey: 'id',
};


// const JobSchema = {
//     name: "Job",
//     properties: {
//         id: 'int',
//         employer: 'string',
//         client: 'string',
//         location: 'string',
//         //Eventually location should be an array of lat/long + diameter(or maybe z-index of map?)
//     },
//     primaryKey: 'id',
// };


class WorkLog extends Realm.Object { }
WorkLog.schema = {
    name: 'WorkLog',
    properties: {
        logId: 'int',
        jobId: 'int',
        notes: 'string',
        startTime: 'int', //will be a date
        endTime: 'int', //will be a date
        breakCount: 'int',
        totalBreakTime: 'int',
        //Perhaps store breaks in an array to allow for multiple breaks with fewer lines of code
        //Orrr create a new model for breaks
    },
    primaryKey: 'jobId',
};


export default new Realm({ schema: [User, Job, WorkLog], schemaVersion: 6 });

// async function startRealm() {
//     let realm = await Realm.open({
//         schema: [User, Job, WorkLog],
//     });
//     return realm;
// }


// export default startRealm();
