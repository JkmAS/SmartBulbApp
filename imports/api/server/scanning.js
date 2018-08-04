import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Bulb from 'tplink-lightbulb';

Meteor.methods({
    async scan() {
        const scan = Bulb.scan();

        const bulbEvent = new Promise((resolve) => {
            scan.on('light', light => {
                light.power(true).then(() => {
                    scan.stop();
                    resolve(light);
                });
            });
        });

        return await bulbEvent.then((light) => light);
    },
});