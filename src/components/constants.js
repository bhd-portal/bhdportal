module.exports = {
  ABGuidanceRef: "ABGuidance",
  PowerpointRef: "Powerpoints",
  DocumentsRef: "Documents",
  GalleryRef: "Gallery",
  BranchRef: "Branch",
  ProductRef: "Product",
  GalleryBackground: '../../assets/gallery_background.jpg',
  RootUrl: "http://localhost:5003/api",
  // I think this may be buggy, need to remove this hard-coded hebrew object.
  // This data should be retrieved from the backend.
  CommanderWordsImages: {
    'חזון המערך': {
      src: 'looking',
      description: 'looking'
    },
    'ייעוד המערך': {
      src: 'running',
      description: 'running'},
    'דבר המפקד': {
      src: 'spaceship',
      description: 'spaceship'
    }
  }
};
