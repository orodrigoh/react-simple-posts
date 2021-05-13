import React from 'react';
import Button from '../Button/Button';
import InputSearch from '../InputSearch/InputSearch';
import './Home.css';
// import { Component } from "react";

import { Posts } from '../Posts/Posts';

class Home extends React.Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: null,
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url };
    });

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
    // console.log(postsAndPhotos.slice(0, page * postPage));
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const postFiltered = allPosts.filter((post) => {
      return post.title.toLowerCase().includes(searchValue);
    });

    return (
      <section className='container'>
        <InputSearch onChange={this.handleChange} value={searchValue} />
        {searchValue && (
          <p>
            There are {postFiltered.length} results for {searchValue}
          </p>
        )}
        <Posts posts={searchValue ? postFiltered : posts} />

        {!searchValue && (
          <div className='button-container'>
            <Button
              text='Load more posts'
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          </div>
        )}
      </section>
    );
  }
}
export default Home;
