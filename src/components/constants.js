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
      index: 0,
      src: 'looking',
      description: 'looking'
    },
    'ייעוד המערך': {
      index: 1,
      src: 'running',
      description: 'running'},
    'דבר המפקד': {
      index: 2,
      src: 'spaceship',
      description: 'spaceship'
    }
  }
};
