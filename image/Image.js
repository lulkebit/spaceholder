module.exports = {
  providers: {
    DummyImage: require('./providers/DummyImage'),
    LoremPicsum: require('./providers/LoremPicsum'),
    FakeImg: require('./providers/FakeImg')
  },

  provider: 'random',

  getProvider() {
    'use strict';

    if (this.provider === 'random') {
      const providers = Object.keys(this.providers);
      const index = Math.floor(Math.random() * providers.length);

      return providers[index];
    }

    return this.provider;
  },

  setProvider(provider) {
    'use strict';

    this.provider = provider;
  },

  getImageUrl(size) {
    'use strict';

    return this.providers[this.getProvider()].getImageUrl(size);
  }
};