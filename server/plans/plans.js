plansArray = [
    {
        plan_id: "trial",
        name: "Trial Period",
        description: "15 day trial period",
        period: 15, //15 days
        metadata: {
            storage: {
                maxQuota: 200, //megabytes of data allow to be stored
                images: true,
                video: true,
                scripts: true,
            },
            users: {
                visible: true,
                maxQuota: 1,
            },
            devices: {
                visible: false,
                maxQuota: 1,
                canSchedule: false,
            },
            company: {
                visible: false,
            },
            items: {
                visible: true,
                maxQuota: 5,
            },
            collections: {
                visible: true,
                maxQuota: 5,
            }

        }

    },
    {
        plan_id: "basic",
        name: "Basic Account",
        description: "Devxop basic account",
        period: 30, //30 days renewal on payment
        amount: 9.99, //9.99€ monthly
        metadata: {
            storage: {
                maxQuota: 1000, //megabytes of data allow to be stored
                images: true,
                video: true,
                scripts: true,
            },
            users: {
                visible: true,
                maxQuota: 1,
            },
            devices: {
                visible: true,
                maxQuota: 3,
                canSchedule: true,
            },
            company: {
                visible: true,
            },
            items: {
                visible: true,
                maxQuota: 50,
            },
            collections: {
                visible: true,
                maxQuota: 15,
            }

        }

    }
]