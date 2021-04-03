const fs = require('fs')
    , gm = require('gm').subClass({ imageMagick: true });

const sharp = require('sharp')

// example 1
gm()
    .background('none')
    .pointSize(50)
    .gravity('centre')
    .fill('#000000')
    .stroke('#333333')
    .strokeWidth('2')
    .out('label:hello')
    .out('-annotate', '+0+0', 'hello')
    .stroke('none')
    .out('-annotate', '+0+0', 'hello')
    .toBuffer('PNG', async (err, buf) => {
        const input = await sharp(buf);
        await input.resize({
            width: 120,
            height: 30,
            // kernel: sharp.kernel.nearest,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
            .png()
            .toBuffer()
    });

// example 2
sharp('./a.png')
    .resize({
        width: 320,
        height: 330,
        // kernel: sharp.kernel.nearest,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile('./a-out.png')
