import React, {Component} from 'react'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

class GitalkComment extends Component{
  componentDidMount(){
    var gitalk = new Gitalk({
      clientID: '92f9ff601fd031145a24',
      clientSecret: '92e5c59ae06a2ce34caeedf85a9d1666a20f36c0',
      repo: 'blog_comment',
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
export default GitalkComment;