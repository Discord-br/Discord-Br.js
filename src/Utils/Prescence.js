
/**
 * Represents a user's presence.
 */
module.exports = class Presence {
  constructor(client, data = {}) {
   
    this.client = client
    this.userID = data.user.id;

    this.servidor = data.guild || null;

    this.patch(data);
  }

 
  get user() {
    return this.client.users.cache.get(this.userID) || null;
  }

  get membro() {
    return this.servidor.members.cache.get(this.userID) || null;
  }

  patch(data) {

    this.status = data.status || this.status || 'offline';

    data.activities ?
    this.atividades = data.activities.map(activity => new Activity(this, activity)) :
    data.activity || data.game ?
    this.activities = [new Activity(this, data.game || data.activity)] :
    this.activities = [];

    this.clientStatus = data.client_status || null;

    return this;
  }

  _clone() {
    const clone = Object.assign(Object.create(this), this);
    if (this.atividades) clone.activities = this.atividades.map(activity => activity._clone());
    return clone;
  }

  equals(presence) {
    return (
      this === presence ||
      (presence &&
        this.status === presence.status &&
        this.atividades.length === presence.activities.length &&
        this.atividades.every((activity, index) => activity.equals(presence.activities[index])) &&
        this.clientStatus.navegador === presence.clientStatus.web &&
        this.clientStatus.celular === presence.clientStatus.mobile &&
        this.clientStatus.computador === presence.clientStatus.desktop)
    );
  }
}