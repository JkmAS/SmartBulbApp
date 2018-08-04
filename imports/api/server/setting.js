import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Bulb from 'tplink-lightbulb';

Meteor.methods({
    async send(ip, settings) {
        try {
            check(ip, String);
            check(settings, Object);
        } catch(error) {
            throw new Meteor.Error(400, 'CHECK_ERROR', error);
        }

        const light = new Bulb(ip);
        return await light.send(settings).then((response) => response).catch((error) => {
            throw new Meteor.Error(500, 'API_ERROR', error);
        });
    },
    async power(ip, state) {
        try {
            check(ip, String);
            check(state, Boolean);
        } catch(error) {
            throw new Meteor.Error(400, 'CHECK_ERROR', error);
        }

        const light = new Bulb(ip);
        return await light.power(state).then(status => status).catch((error) => {
            throw new Meteor.Error(500, 'API_ERROR', error);
        });
    },
    async set(ip, transition = 0, options = {}) {
        try {
            check(ip, String);
            check(transition, Number);
            check(options, Object);
        } catch(error) {
            throw new Meteor.Error(400, 'CHECK_ERROR', error);
        }

        const light = new Bulb(ip);
        return await light.power(true, transition, options).then((status) => status).catch((error) => {
            throw new Meteor.Error(500, 'set-error', error);
        });
    },
});