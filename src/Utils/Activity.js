/**
 * Represents an activity that is part of a user's presence.
 */
const { ActivityTypes } = require('./Constants');
const Emoji = require('./Emoji')

module.exports = class Activity {
    constructor(presence, data) {

      this.presenca = presence;
  
      this.nome = data.name;
  
      this.tipo = ActivityTypes[data.type] || ActivityTypes[ActivityTypes.indexOf(data.type)];
  
      this.url = data.url || null;
  
      this.detalhes = data.details || null;
  
      this.estado = data.state || null;
  
      this.appID = data.application_id || null;
  
      this.horario = data.timestamps
        ? {
            comeco: data.timestamps.start ? new Date(Number(data.timestamps.start)) : null,
            final: data.timestamps.end ? new Date(Number(data.timestamps.end)) : null,
          }
        : null;
  
      this.party = data.party || null;
  
      this.assets = data.assets ? new RichPresenceAssets(this, data.assets) : null;
  
      this.syncID = data.sync_id;
  
      this.emoji = data.emoji ? new Emoji(presence.client, data.emoji) : null;
  
      this.criadoEm = new Date(data.created_at).getTime();
    }
  
    equals(activity) {
      return (
        this === activity ||
        (activity && this.name === activity.name && this.type === activity.type && this.url === activity.url)
      );
    }
  
    get criadoEm() {
      return new Date(this.createdTimestamp);
    }
  
    toString() {
      return this.name;
    }
  
    _clone() {
      return Object.assign(Object.create(this), this);
    }
  }