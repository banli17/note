---
title: "vue开发总结"
date: 2017-07-25 08:31:43
tags:
---

## vue-cli 修改

1. 给css自动增加前缀 autoprefixer

```
// webpack.base.conf.js
module.export = {
    ...,
    vue: {
	    loaders: utils.cssLoaders({sourceMap: useCssSourceMap}),
	    postcss: [
	        require('autoprefixer')({
	            browsers: ['last 10 versions']
	        })
	    ]
    },
    postcss: [
	    require('autoprefixer')({
	       browsers: ['last 10 versions']
	    })
    ]
}
```

2. 给js增加polyfill

```
// webpack.base.conf.js
module.exports = {
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    ...
}
```

3. 让引用更加方便

```
// webpack.base.conf.js
module.exports = {
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.resolve(__dirname, '../src'),
            'basic': path.resolve(__dirname, '../src/basic'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'views': path.resolve(__dirname, '../src/views'),
        }
    },
    ...
}
```

4. 修改服务器url和端口

`dev-server.js` 最下面的uri和port

5. mock代理设置

```javascript
// config/index.js
dev: {
    env: require('./dev.env'),
    port: 80,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/app/': {
            target: 'http://ddck.ckapp.com/',
            changeOrigin: true,
            pathRewrite: {}
        },
    }
}
```

6. 自动发送到远程ftp

在项目目录新增 `gulpfile.js`，内容如下：

```
'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

// 发布到远程的文件
var localFilesGlob = ['./dist/source/**/*','./dist/index.html'];

var config = {
	remoteOk: {
		ftp: {
			// 远程服务器
			host: 'host ip',
			port: 'port',
			user: 'user',
			password: 'password',
			parallel: 5,
			log: gutil.log
		},
		remoteFolder: '/ck'
	}
};

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */

for (let c in config) {
	gulp.task('deploy-' + c, function () {
		let item = config[c]
		console.log('开始发布到 - ' + c + ' - 的服务器')
		let conn = ftp.create(item.ftp);
		gulp.src(localFilesGlob)
			.pipe(conn.newer(item.remoteFolder))
			.pipe(conn.dest(item.remoteFolder));
	});
}

gulp.task('deploy-all', function () {
	for (let c in config) {
		if (c != 'remoteOk') {
			let item = config[c]
			console.log('开始发布到 - ' + c + ' - 的服务器')
			let conn = ftp.create(item.ftp);
			gulp.src(localFilesGlob)
				.pipe(conn.newer(item.remoteFolder))
				.pipe(conn.dest(item.remoteFolder));
		}
	}
});

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
// gulp.task('deploy-watch', function () {
// 	config.forEach((item, index)=> {
// 		item.conn = ftp.create(item.ftp);
// 	})
// 	gulp.watch(localFilesGlob)
// 		.on('change', function (event) {
// 			console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);
// 			config.forEach((item, index)=> {
// 				gulp.src([event.path], {base: item.remoteFolder})
// 					.pipe(item.conn.newer(item.remoteFolder)) // only upload newer files
// 					.pipe(item.conn.dest(item.remoteFolder));
// 			})
// 		});
// })

```
