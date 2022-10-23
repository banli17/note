"use strict";(self.webpackChunkmy_note=self.webpackChunkmy_note||[]).push([[8324],{9613:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var i=n(9496);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},s=Object.keys(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=i.createContext({}),l=function(e){var t=i.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=l(e.components);return i.createElement(c.Provider,{value:t},e.children)},g={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},p=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,d=a(e,["components","mdxType","originalType","parentName"]),p=l(n),h=o,u=p["".concat(c,".").concat(h)]||p[h]||g[h]||s;return n?i.createElement(u,r(r({ref:t},d),{},{components:n})):i.createElement(u,r({ref:t},d))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,r=new Array(s);r[0]=p;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:o,r[1]=a;for(var l=2;l<s;l++)r[l]=n[l];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6798:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>g,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var i=n(7579),o=(n(9496),n(9613));const s={},r="Git",a={unversionedId:"c-eng/git",id:"c-eng/git",title:"Git",description:"\u5982\u4f55\u505a git \u64cd\u4f5c",source:"@site/docs/c-eng/git.md",sourceDirName:"c-eng",slug:"/c-eng/git",permalink:"/note/docs/c-eng/git",draft:!1,editUrl:"https://github.com/banli17/note/tree/main/docs/docs/c-eng/git.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"babel \u4f7f\u7528\u603b\u7ed3",permalink:"/note/docs/c-eng/babel-base"},next:{title:"rollup",permalink:"/note/docs/c-eng/rollup"}},c={},l=[{value:"\u5982\u4f55\u505a git \u64cd\u4f5c",id:"\u5982\u4f55\u505a-git-\u64cd\u4f5c",level:2},{value:"\u5e38\u89c1\u95ee\u9898",id:"\u5e38\u89c1\u95ee\u9898",level:2},{value:"git clone \u6216 push \u6162\u3001\u5361\u4f4f ?",id:"git-clone-\u6216-push-\u6162\u5361\u4f4f-",level:3},{value:"windows \u914d\u7f6e github ssh key \u95ee\u9898",id:"windows-\u914d\u7f6e-github-ssh-key-\u95ee\u9898",level:3},{value:"\u6587\u4ef6\u540d\u5927\u5c0f\u5199\u95ee\u9898",id:"\u6587\u4ef6\u540d\u5927\u5c0f\u5199\u95ee\u9898",level:3}],d={toc:l};function g(e){let{components:t,...s}=e;return(0,o.kt)("wrapper",(0,i.Z)({},d,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"git"},"Git"),(0,o.kt)("h2",{id:"\u5982\u4f55\u505a-git-\u64cd\u4f5c"},"\u5982\u4f55\u505a git \u64cd\u4f5c"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"master |    dev     | release\n\u4e0d\u64cd\u4f5c    dev/0.0.1\n                                       release\u6253tag0.0.1\n                 dev/0.0.2\n")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"fork \u5230\u4f60\u7684\u5206\u652f"),(0,o.kt)("li",{parentName:"ol"},"git clone \u5230\u672c\u5730"),(0,o.kt)("li",{parentName:"ol"},"\u5207\u6362\u5230\u65b0\u5206\u652f\uff0cgit checkout -b \u65b0\u5206\u652f"),(0,o.kt)("li",{parentName:"ol"},"\u4fee\u6539\u4ee3\u7801, git add \u548c git commit"),(0,o.kt)("li",{parentName:"ol"},"git pull"),(0,o.kt)("li",{parentName:"ol"},"git push"),(0,o.kt)("li",{parentName:"ol"},"\u53d1\u8d77 pr\uff0c\u5408\u5e76 commit \u5230\u4e3b\u4ed3\u5e93"),(0,o.kt)("li",{parentName:"ol"},"codereview, \u521b\u5efa tags \u5e76\u5220\u9664\u5f00\u53d1\u5206\u652f")),(0,o.kt)("h2",{id:"\u5e38\u89c1\u95ee\u9898"},"\u5e38\u89c1\u95ee\u9898"),(0,o.kt)("h3",{id:"git-clone-\u6216-push-\u6162\u5361\u4f4f-"},"git clone \u6216 push \u6162\u3001\u5361\u4f4f ?"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u9996\u5148\u67e5\u770b\u81ea\u5df1 socks5 \u7684\u7aef\u53e3\u53f7")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{src:n(2543).Z,width:"213",height:"376"}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u6211\u8fd9\u91cc\u8bb0\u4e0b\u6765\u662f 127.0.0.1:1086"))),(0,o.kt)("p",null,(0,o.kt)("img",{src:n(7475).Z,width:"467",height:"670"})),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"\u7136\u540e\u8f93\u5165\u547d\u4ee4")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git config --global http.https://github.com.proxy socks5://127.0.0.1:1086\ngit config --global https.https://github.com.proxy socks5://127.0.0.1:1086\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u53c2\u8003 ",(0,o.kt)("a",{parentName:"p",href:"https://www.zhihu.com/question/27159393/answer/141047266"},"https://www.zhihu.com/question/27159393/answer/141047266"))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u53e6\u5916\u5bf9\u4e8e http \u4ee3\u7406")),(0,o.kt)("p",null,"\u53ea\u5bf9 github \u8fdb\u884c\u4ee3\u7406\uff0c\u5bf9\u56fd\u5185\u7684\u4ed3\u5e93\u4e0d\u5f71\u54cd\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git config --global http.https://github.com.proxy https://127.0.0.1:1080\ngit config --global https.https://github.com.proxy https://127.0.0.1:1080\n")),(0,o.kt)("p",null,"\u540c\u65f6\uff0c\u5982\u679c\u5728\u8f93\u5165\u8fd9\u6761\u547d\u4ee4\u4e4b\u524d\uff0c\u5df2\u7ecf\u8f93\u5165\u5168\u5c40\u4ee3\u7406\u7684\u8bdd\uff0c\u53ef\u4ee5\u8f93\u5165\u8fdb\u884c\u53d6\u6d88"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git config --global --unset http.proxy\ngit config --global --unset https.proxy\n")),(0,o.kt)("h3",{id:"windows-\u914d\u7f6e-github-ssh-key-\u95ee\u9898"},"windows \u914d\u7f6e github ssh key \u95ee\u9898"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"Admin@PS2021WJVPMNZO MINGW64 /d\n$ git clone git@github.com:banli17/course-ts.git\nCloning into 'course-ts'...\nkex_exchange_identification: Connection closed by remote host\nConnection closed by UNKNOWN port 65535\nfatal: Could not read from remote repository.\n\nPlease make sure you have the correct access rights\nand the repository exists.\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ssh -T git@github.com\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\nIT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!\nSomeone could be eavesdropping on you right now (man-in-the-middle attack)!\nIt is also possible that a host key has just been changed.\nThe fingerprint for the RSA key sent by the remote host is\nSHA256:rEmlJenVMSL5GVemSY0Gk8WGw6B4ege4J85M+vup8R0.\nPlease contact your system administrator.\nAdd correct host key in /c/Users/Admin/.ssh/known_hosts to get rid of this message.\nOffending ED25519 key in /c/Users/Admin/.ssh/known_hosts:5\nHost key for github.com has changed and you have requested strict checking.\nHost key verification failed.\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ssh -T git@github.com\nThe authenticity of host 'github.com (223.75.236.241)' can't be established.\nRSA key fingerprint is SHA256:rEmlJenVMSL5GVemSY0Gk8W.\nThis key is not known by any other names\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes\nWarning: Permanently added 'github.com' (RSA) to the list of known hosts.\ngit@github.com: Permission denied (publickey,password,keyboard-interactive).\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ git clone git@github.com:banli17/course-ts.git\nCloning into 'course-ts'...\ngit@github.com: Permission denied (publickey,password,keyboard-interactive).\nfatal: Could not read from remote repository.\n\nPlease make sure you have the correct access rights\nand the repository exists.\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ git clone git@github.com:banli17/course-ts.git\nCloning into 'course-ts'...\ngit@github.com: Permission denied (publickey,password,keyboard-interactive).\nfatal: Could not read from remote repository.\n\nPlease make sure you have the correct access rights\nand the repository exists.\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ssh-keygen -t rsa -C \"8xx@qq.com\" -f ~/.ssh/id_rsa_github\nGenerating public/private rsa key pair.\n/c/Users/Admin/.ssh/id_rsa_github already exists.\nOverwrite (y/n)? y\nEnter passphrase (empty for no passphrase):\nEnter same passphrase again:\nYour identification has been saved in /c/Users/Admin/.ssh/id_rsa_github\nYour public key has been saved in /c/Users/Admin/.ssh/id_rsa_github.pub\nThe key fingerprint is:\nSHA256:xFo9Hgs7BEjCfEq 8xx@qq.com\nThe key's randomart image is:\n+---[RSA 3072]----+\n| +o=... |\n|.o%.o o . |\n+----[SHA256]-----+\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ git clone git@github.com:banli17/course-ts.git\nCloning into 'course-ts'...\ngit@github.com: Permission denied (publickey,password,keyboard-interactive).\nfatal: Could not read from remote repository.\n\nPlease make sure you have the correct access rights\nand the repository exists.\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ssh -T git@github.com\ngit@github.com: Permission denied (publickey,password,keyboard-interactive).\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ^C\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ git@github.com: Permission denied (publickey,password,keyboard-interactive).ssh-agent -s^C\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ssh-agent -s\nSSH_AUTH_SOCK=/tmp/ssh-fuCVUi3vFTcM/agent.1990; export SSH_AUTH_SOCK;\nSSH_AGENT_PID=1991; export SSH_AGENT_PID;\necho Agent pid 1991;\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ssh-add ~/.ssh/id_rsa\nCould not open a connection to your authentication agent.\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ eval `ssh-agent -s`\nAgent pid 2000\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ eval `ssh-agent -s`^C\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ssh-add ~/.ssh/id_rsa_github\nEnter passphrase for /c/Users/Admin/.ssh/id_rsa_github:\nIdentity added: /c/Users/Admin/.ssh/id_rsa_github (867889876@qq.com)\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ git clone git@github.com:banli17/course-ts.git\nCloning into 'course-ts'...\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\nIT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!\nSomeone could be eavesdropping on you right now (man-in-the-middle attack)!\nIt is also possible that a host key has just been changed.\nThe fingerprint for the RSA key sent by the remote host is\nSHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.\nPlease contact your system administrator.\nAdd correct host key in /c/Users/Admin/.ssh/known_hosts to get rid of this message.\nOffending RSA key in /c/Users/Admin/.ssh/known_hosts:1\nHost key for github.com has changed and you have requested strict checking.\nHost key verification failed.\nfatal: Could not read from remote repository.\n\nPlease make sure you have the correct access rights\nand the repository exists.\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ssh -T git@github.com\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\nIT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!\nSomeone could be eavesdropping on you right now (man-in-the-middle attack)!\nIt is also possible that a host key has just been changed.\nThe fingerprint for the RSA key sent by the remote host is\nSHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.\nPlease contact your system administrator.\nAdd correct host key in /c/Users/Admin/.ssh/known_hosts to get rid of this message.\nOffending RSA key in /c/Users/Admin/.ssh/known_hosts:1\nHost key for github.com has changed and you have requested strict checking.\nHost key verification failed.\n\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ ssh -T git@github.com\nThe authenticity of host 'github.com (<no hostip for proxy command>)' can't be established.\nED25519 key fingerprint is SHA256:+DiY3wvvV\nThis key is not known by any other names\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes\nWarning: Permanently added 'github.com' (ED25519) to the list of known hosts.\nHi banli17! You've successfully authenticated, but GitHub does not provide shell access.\n\nAdmin@PS2021WJVPMNZO MINGW64 /d\n$ git clone git@github.com:banli17/course-ts.git\nCloning into 'course-ts'...\nremote: Enumerating objects: 69, done.\nremote: Counting objects: 100% (69/69), done.\nremote: Compressing objects: 100% (52/52), done.\nremote: Total 69 (delta 9), reused 65 (delta 9), pack-reused 0\nReceiving objects: 100% (69/69), 91.69 KiB | 260.00 KiB/s, done.\nResolving deltas: 100% (9/9), done.\n\n")),(0,o.kt)("h3",{id:"\u6587\u4ef6\u540d\u5927\u5c0f\u5199\u95ee\u9898"},"\u6587\u4ef6\u540d\u5927\u5c0f\u5199\u95ee\u9898"),(0,o.kt)("p",null,"\u9996\u5148\uff0cWindows \u4e0b git \u9ed8\u8ba4\u914d\u7f6e\u662f\u5bf9\u6587\u4ef6/\u6587\u4ef6\u5939\u540d\u79f0\u7684\u5927\u5c0f\u5199\u4e0d\u654f\u611f\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git config --get core.ignorecase # true\n")),(0,o.kt)("p",null,"\u8fd9\u5c31\u5bfc\u81f4\u4e86\u4e00\u4e9b\u65f6\u5019\u7684\u96be\u4ee5\u9884\u6599\u95ee\u9898\u7684\u4ea7\u751f\uff0c\u9488\u5bf9\u8fd9\u4e2a\u914d\u7f6e\uff0c\u5148\u5f15\u7528\u4e00\u4e0b\u5b98\u65b9\u5e2e\u52a9\u6587\u6863\u7684\u539f\u8bdd\uff1a"),(0,o.kt)("p",null,"The default is false, except git-clone or git-init will probe and set core.ignoreCase true if appropriate when the repository is created."),(0,o.kt)("p",null,"\u5373 git \u9ed8\u8ba4\u5bf9\u5927\u5c0f\u5199\u654f\u611f\uff0c\u4f46\u662f\u4f1a\u5728\u4ed3\u5e93\u514b\u9686\u6216\u521d\u59cb\u5316\u65f6\uff0c\u6839\u636e\u5f53\u524d\u7cfb\u7edf\u6765\u8bbe\u7f6e\u662f\u5426\u5ffd\u7565\u5927\u5c0f\u5199\uff0c\u6bd4\u5982 Windows \u4e0b\u4f1a\u8bbe\u7f6e\u4e3a true\uff0c\u5373\u4e0d\u654f\u611f\uff0c\u800c Linux \u4e2d\u4e0d\u4f1a\u5ffd\u7565\uff1b\u76f8\u4fe1\u6709\u4e0d\u5c11\u5f00\u53d1\u8005\u7684\u9879\u76ee\u5f00\u53d1\u4e0e\u534f\u540c\u5de5\u4f5c\u90fd\u662f\u5728 Windows \u7cfb\u7edf\u4e0b\u8fdb\u884c\u7684\u3002"),(0,o.kt)("p",null,"\u89e3\u51b3\u65b9\u6cd5\uff1b"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u89c4\u8303\u91cd\u547d\u540d")),(0,o.kt)("p",null,"\u5982\u679c\u5206\u652f\u4e0a\u76f4\u63a5\u5728\u7f16\u8f91\u5668\u6216\u8d44\u6e90\u7ba1\u7406\u5668\u4e0a\u4fee\u6539\u9879\u76ee\u4e2d\u7684\u6587\u4ef6\u540d\uff08\u53ea\u53d8\u66f4\u5927\u5c0f\u5199\uff09\uff0c\u672c\u5730\u867d\u7136\u53ef\u4ee5\u8c03\u8bd5\u901a\u8fc7\uff0c\u4f46\u662f git \u5e76\u4e0d\u4f1a\u8bc6\u522b\u548c\u8bb0\u5f55\u8fd9\u4e2a\u4fee\u6539\uff0c\u6240\u4ee5\u4e0b\u4e00\u6b21\u63d0\u4ea4\u63a8\u9001\u65f6\u5e76\u4e0d\u4f1a\u5e26\u4e0a\u8fd9\u4e2a\u91cd\u547d\u540d\u4fee\u6539\uff0c\u8fdc\u7a0b\u4ed3\u5e93\u4e2d\u8fd9\u4e2a\u6587\u4ef6\u540d\u8fd8\u662f\u4fdd\u6301\u4e0d\u53d8\uff1b"),(0,o.kt)("p",null,"\u56e0\u6b64\uff0c\u5982\u679c\u68c0\u51fa\u5176\u4ed6\u5206\u652f\u6216\u8005\u5176\u4ed6\u534f\u4f5c\u8005\u62c9\u53d6\u4ee3\u7801\uff0c\u9879\u76ee\u5c31\u4f1a\u62a5\u9519\uff0c\u56e0\u4e3a\u4e00\u4e2a\u672c\u5730\u6587\u4ef6\u7684\u540d\u79f0\u5982\u679c\u7531\u5c0f\u5199\u53d8\u6210\u4e86\u5927\u5199\uff0c\u4f7f\u7528\u8fd9\u4e2a\u6587\u4ef6\u7684\u4ee3\u7801\u90e8\u5206\u4e5f\u6539\u6210\u4e86\u5927\u5199\uff0c\u63a8\u9001\u5230\u8fdc\u7a0b\u540e\uff0c\u8fdc\u7a0b\u7684\u8fd9\u4e2a\u6587\u4ef6\u4f9d\u7136\u662f\u5c0f\u5199\uff0c\u4f46\u8fdc\u7a0b\u4e0a\u4f7f\u7528\u8be5\u6587\u4ef6\u7684\u4ee3\u7801\u5374\u6210\u529f\u53d8\u6210\u4e86\u5927\u5199\uff0c\u90a3\u8fb9\u542f\u52a8\u9879\u76ee\u5c31\u591a\u534a\u4f1a\u63d0\u793a\u6587\u4ef6\u4e0d\u5b58\u5728\u4e86\uff1b"),(0,o.kt)("p",null,"\u5bf9\u4e8e\u8fd9\u79cd\u60c5\u51b5 git \u63d0\u4f9b\u4e86\u4e00\u79cd\u89c4\u8303\u7684\u505a\u6cd5\uff0c\u4f7f\u7528 git mv \u547d\u4ee4\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git mv test.txt TEST.txt\n")),(0,o.kt)("p",null,"\u4ee5\u6b64\u6765\u5b9e\u73b0\u5bf9\u6587\u4ef6\u7684\u91cd\u547d\u540d\uff0c\u540c\u65f6 git \u4e5f\u4f1a\u5c06\u5176\u8bc6\u522b\u4e3a Rename \u7684\u53d8\u66f4\u7c7b\u578b\uff0c\u7136\u540e\u6b63\u5e38\u63d0\u4ea4\u63a8\u9001\u5c31\u80fd\u540c\u6b65\u5230\u8fdc\u7a0b\u4ed3\u5e93\u4e86\uff1b\u5982\u679c\u662f\u91cd\u547d\u540d\u6587\u4ef6\u5939\uff0c\u7531\u4e8e Windows \u4e0b\u5bf9\u6587\u4ef6\u5939\u7684\u5927\u5c0f\u5199\u4e5f\u4e0d\u654f\u611f\uff08-","_","-\uff09\uff0c\u6240\u4ee5\u76f4\u63a5\u4f7f\u7528\u4e0a\u9762\u7684\u65b9\u6cd5\u4f1a\u5931\u8d25\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git mv test-dir TEST-DIR # Rename from 'test-dir' to 'Test-dir/test-dir' failed.\n")),(0,o.kt)("p",null,"\u8fd9\u91cc\u5c31\u53ea\u6709\u8fc2\u56de\u4e00\u4e0b\uff0c\u5148\u628a\u6587\u4ef6\u5939\u547d\u540d\u6210\u5176\u4ed6\u540d\u79f0\uff0c\u7136\u540e\u518d\u547d\u540d\u4e3a\u5927\u5199\u5c31\u884c\u4e86\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git mv test-dir tmp\ngit mv tmp TEST-DIR\n")),(0,o.kt)("p",null,"\u53c2\u8003\u8d44\u6599\uff1a",(0,o.kt)("a",{parentName:"p",href:"https://knightyun.github.io/2021/01/18/git-ignorecase"},"https://knightyun.github.io/2021/01/18/git-ignorecase")))}g.isMDXComponent=!0},2543:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/2022-10-23-16-58-13-82117d163494757cf39c92d4dd88c7b2.png"},7475:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/2022-10-23-16-58-24-68cf204ffdeb4a4285c8a76f02f14437.png"}}]);