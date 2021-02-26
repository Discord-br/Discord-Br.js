module.exports = class RichPresenceAssets {
    constructor(activity, assets) {

      this.atividade = activity 
  
      this.textoGrande = assets.large_text || null;
  
      this.textoPequeno = assets.small_text || null;
  
      this.imagemGrande = assets.large_image || null;
  
      this.imagemPequena = assets.small_image || null;
    }
  
  
    imagemPequenaURL({ format, size } = {}) {
      if (!this.imagemPequena) return null;
      return this.atividade.presenca.client.rest.cdn.AppAsset(this.atividade.appID, this.imagemPequena, {
        format,
        size,
      });
    }
  
    imagemGrandeURL({ format, size } = {}) {
      if (!this.imagemGrande) return null;
      if (/^spotify:/.test(this.imagemGrande)) {
        return `https://i.scdn.co/image/${this.imagemGrande.slice(8)}`;
      } else if (/^twitch:/.test(this.imagemGrande)) {
        return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${this.imagemGrande.slice(7)}.png`;
      }
      return this.activity.presence.client.rest.cdn.AppAsset(this.atividade.appID, this.imagemGrande, {
        format,
        size,
      });
    }
  }