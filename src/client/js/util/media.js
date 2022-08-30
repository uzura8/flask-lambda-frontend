export default {
  getExtensionByMimetype: (mimetype) => {
    switch (mimetype) {
      case 'image/png':
        return 'png'
      case 'image/gif':
        return 'gif'
      case 'image/jpeg':
        return 'jpg';
      default:
        return '';
    }
  },
}
