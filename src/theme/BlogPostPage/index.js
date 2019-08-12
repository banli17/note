/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React,{Component} from 'react';

import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';

import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

class GitTalk extends Component{
  componentDidMount(){
    var gitalk = new Gitalk({
      clientID: '92f9ff601fd031145a24',
      clientSecret: '92e5c59ae06a2ce34caeedf85a9d1666a20f36c0',
      repo: 'https://github.com/banli17/blog_comment',
      owner: 'banli17',
      admin: ['banli17'],
      id: location.pathname,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    
    gitalk.render('gitalk-container')
  }
  render(){
    return <div id="gitalk-container"></div>
  }
}

function BlogPostPage(props) {
  const {content: BlogPostContents, metadata, nextItem, prevItem} = props;
  const {frontMatter} = BlogPostContents;
  return (
    <Layout title={metadata.title} description={metadata.description}>
      {BlogPostContents && (
        <div className="container margin-vert--xl">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <BlogPostItem frontMatter={frontMatter} metadata={metadata}>
                <BlogPostContents />
              </BlogPostItem>
              <div className="margin-vert--xl">
                <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
                <GitTalk />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default BlogPostPage;
