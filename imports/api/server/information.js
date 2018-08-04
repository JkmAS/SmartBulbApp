import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Bulb from 'tplink-lightbulb';

Meteor.methods({
    async info(ip) {
        try {
            check(ip, String);
        } catch(error) {
            throw new Meteor.Error(400, 'CHECK_ERROR', error);
        }

        const light = new Bulb(ip);
        return await light.info().then((info) => info).catch((error) => {
            throw new Meteor.Error(500, 'API_ERROR', error);
        });
    },
    async dayStat(ip, month, year) {
        try {
            check(ip, String);
            check(month, Number);
            check(year, Number);
        } catch(error) {
            throw new Meteor.Error(400, 'CHECK_ERROR', error);
        }

        const light = new Bulb(ip);
        return await light.schedule(month, year).then((schedule) => schedule).catch((error) => {
            throw new Meteor.Error(500, 'API_ERROR', error);
        });
    },
    async cloud(ip) {
        try {
            check(ip, String);
        } catch(error) {
            throw new Meteor.Error(400, 'CHECK_ERROR', error);
        }

        const light = new Bulb(ip);
        return await light.cloud().then((info) => info).catch((error) => {
            throw new Meteor.Error(500, 'API_ERROR', error);
        });
    },
    async schedule(ip) {
        try {
            check(ip, String);
        } catch(error) {
            throw new Meteor.Error(400, 'CHECK_ERROR', error);
        }

        const light = new Bulb(ip);
        return await light.schedule().then((schedule) => schedule).catch((error) => {
            throw new Meteor.Error(500, 'API_ERROR', error);
        });
    },
    async details(ip) {
        try {
            check(ip, String);
        } catch(error) {
            throw new Meteor.Error(400, 'CHECK_ERROR', error);
        }

        const light = new Bulb(ip);
        return await light.details().then((details) => details).catch((error) => {
            throw new Meteor.Error(500, 'API_ERROR', error);
        });
    },
});