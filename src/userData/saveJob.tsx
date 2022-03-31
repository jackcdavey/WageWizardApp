import Realm from './realm';

export default function saveJob() {
    Job.getAll()
        .then(jobs => {
            console.log('jobs', jobs.length);
            jobs.forEach(job => {
                realm.write(() => {
                    realm.create("Job", {
                        id: 1,
                        employer: 'job.employer',
                        client: 'job.client',
                        location: 'job.location',
                    }, UpdateMode.Modified);
                });
            })
        }).then(() => console.log("jobs updated"));
    Job.checkPermission();
}