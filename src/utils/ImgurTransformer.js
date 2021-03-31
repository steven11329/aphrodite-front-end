export default class ImgurTransformer {
  static transform(url, options = { thumbnail: false }) {
    const { thumbnail } = options;
    let transformedUrl = 'https://i.imgur.com/';
    const imgurRegex = /.*imgur\.com.*/;
    const suffixRegex = /.*((?<suffix>\.(jpe?g|png|webp|gif)))$/;

    if (!thumbnail) return url;

    if (imgurRegex.test(url)) {
      const result = /.*imgur\.com\/(?<imageUrl>.*)/.exec(url);
      if (result) {
        const suffixResult = suffixRegex.exec(result.groups.imageUrl);
        if (suffixResult) {
          if (suffixResult.groups.suffix === '.gif') {
            transformedUrl += result.groups.imageUrl;
          } else {
            transformedUrl += `${result.groups.imageUrl.replace(
              suffixResult.groups.suffix,
              `${thumbnail ? 't' : ''}${suffixResult.groups.suffix}`
            )}`;
          }
        } else {
          transformedUrl += `${result.groups.imageUrl.replace('.mp4', '')}${
            thumbnail ? 't' : ''
          }.jpg`;
        }
      }
      return transformedUrl;
    }
    return null;
  }
}
