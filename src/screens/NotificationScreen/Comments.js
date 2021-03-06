import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import Comment from './components/Comment';

const comments = [
  {
    id: 5,
    url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    name: 'Universal Music group',
    isFollowing: false,
  },

  {
    id: 1,
    url: 'https://homepages.cae.wisc.edu/~ece533/images/cat.png',
    name: 'Selena Gomez',
    isFollowing: true,
  },
  {
    id: 2,
    url: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    name: 'Universal Music',
    isFollowing: true,
  },

  {
    id: 3,
    url: 'https://homepages.cae.wisc.edu/~ece533/images/boat.png',
    name: 'Warner Music Group',
    isFollowing: true,
  },
  {
    id: 4,
    url: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
    name: 'Universal Music group',
    isFollowing: true,
  },

  {
    id: 6,
    url: 'https://homepages.cae.wisc.edu/~ece533/images/boat.png',
    name: 'Universal Music group',
    isFollowing: false,
  },
  {
    id: 7,
    url: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
    name: 'Universal Music group',
    isFollowing: true,
  },

  {
    id: 8,
    url: 'https://homepages.cae.wisc.edu/~ece533/images/boat.png',
    name: 'Universal Music group',
    isFollowing: true,
  },
];

const Comments = () => (
  <FlatList
      // bounces={false}
      // pagingEnabled={true}
      // showsHorizontalScrollIndicator={false}
      // showsVerticalScrollIndicator={false}
      // legacyImplementation={false}
    data={comments}
    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
    ListHeaderComponent={() => <View style={{ height: 20 }} />}
    ListFooterComponent={() => <View style={{ height: 15 }} />}
    renderItem={Comment}
    keyExtractor={(photo) => String(photo.id)}
  />
);
export default Comments;
