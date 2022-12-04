const fs = require('fs')
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const express = require('express')
const router = express.Router()
const multer = require('multer')
const sqlite3 = require('sqlite3').verbose()
const apiconfig = require('../apiconfig')
const Authenticate = require('../ValidateToken')



const storage = multer.diskStorage({
  destination (req, file, cb) {
    const uploadpath = apiconfig.apppath + '/public/'
    cb(null, uploadpath)
  },
  filename (req, file, cb) {
    const mfilenm = new Date().toISOString().replace(/:/g, '')
    cb(null, mfilenm + '_' + file.originalname)
  }
})

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/bmp') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({ storage, fileFilter: filefilter })

router.post('/proof', upload.single('photo'), function (req, res, next) {
  res.send({
    success: true,
    message: 'File uploaded successfully',
    filenm: req.file.path
  })
})

/*
router.post('/proof', function(req, res, next)  {
    const file = req.files.photo;
//    const proofType = req.data.proofType;
    var uploadpath = apiconfig.apppath + "/files/"

    const date = new Date()
//    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date )

    var fileNm = `${year}-${month}-${day }_` + file.name

    file.mv( uploadpath + fileNm, function(err, result){
        if(err){
            res.send({
                success : false,
                message : err
            })

        } else {
            res.send({
                success : true,
                message : "File uploaded successfully",
                filenm : uploadpath + fileNm
            })
        }
    })

});
*/


router.post('/signimg', Authenticate, function (req, res, next) {
    const dataURL = req.body.img
    var validUserId = true
    console.log(dataURL)

    if(!req.body.userId) {
        validUserId = false
    } else {
        if(req.body.userId === '') {
            validUserId = false
        }    
    }

    if(!validUserId) {
        res.send({
            success: false,
            message: 'Invalid User id',
        })      
    } else {
        const matches = dataURL.match(/^data:.+\/(.+);base64,(.*)$/)
        const buffer = new Buffer.from(matches[2], 'base64')
    
        const uploadpath = apiconfig.photospath + '/signs/' 
        const mfilenm = req.body.userId + '.png'
        const mfullpath = uploadpath + mfilenm
        const rtnFileNm = '/signs/'  + mfilenm
    
        mkdirp(getDirName(mfullpath), function (err) {
        if (err){
            res.send({
            success: false,
            message: 'Inavalid folder',
            filenm: mfullpath
            })
        } else {
            fs.writeFileSync(mfullpath, buffer)
    //    fs.writeFile(path, contents, cb);
            res.send({
            success: true,
            message: 'Sign uploaded successfully',
            filenm: rtnFileNm
            })      
        }
        });
    }
    
})
  

router.post('/photoimg', Authenticate, function (req, res, next) {
    const dataURL = req.body.img
    var validUserId = true

    if(!req.body.userId) {
        validUserId = false
    } else {
        if(req.body.userId === '') {
            validUserId = false
        }    
    }

    if(!validUserId) {
        res.send({
            success: false,
            message: 'Invalid User id',
        })      
    } else {
        const matches = dataURL.match(/^data:.+\/(.+);base64,(.*)$/)
        const buffer = new Buffer.from(matches[2], 'base64')
    
        const uploadpath = apiconfig.photospath + '/avatars/' 
        const mfilenm = req.body.userId + '.png'
        const mfullpath = uploadpath + mfilenm
        const rtnFileNm = '/avatars/'  + mfilenm
    
        mkdirp(getDirName(mfullpath), function (err) {
        if (err){
            res.send({
            success: false,
            message: 'Inavalid folder',
            filenm: mfullpath
            })
        } else {
            fs.writeFileSync(mfullpath, buffer)
    //    fs.writeFile(path, contents, cb);
            res.send({
            success: true,
            message: 'Avatar uploaded successfully',
            filenm: rtnFileNm
            })      
        }
        });
    }

})



/*
router.post('/menuimg', function (req, res, next) {
  const dataURL = req.body.img
//  console.log(req.body.menuId)
//  console.log(req.body.category)
  
  const matches = dataURL.match(/^data:.+\/(.+);base64,(.*)$/)
  const buffer = new Buffer.from(matches[2], 'base64')
  //    var savePath = path.resolve(__dirname + '../../../tmp/'  + Math.floor(Math.random() * 1000000) + '.png');

  const uploadpath = apiconfig.apppath + '/public/menuimages/' + req.body.category + '/'  
  const mfilenm = req.body.menuId + '.png'
  const mfullpath = uploadpath + mfilenm
  const rtnFileNm = '/menuimages/' + req.body.category + '/'  + mfilenm

//  mkdirp
//  getDirName

  mkdirp(getDirName(mfullpath), function (err) {
    if (err){
      res.send({
        success: false,
        message: 'Inavalid folder',
        filenm: mfullpath
      })
    } else {
      fs.writeFileSync(mfullpath, buffer)
//    fs.writeFile(path, contents, cb);
      res.send({
        success: true,
        message: 'File uploaded successfully',
        filenm: rtnFileNm
      })
    
    }
  });

})
*/


router.post('/delsign', function (req, res, next) {
  let fileNm = ''
  let folderNm = ''

  var db = new sqlite3.Database(apiconfig.sysdb, sqlite3.OPEN_READWRITE, function (err) {
    if (err) {
      res.json(err.message)
    }
    db.all('SELECT CO_ID , CO_NAME, COUNTRY, UPLOADFOLDER FROM COMPANY', [], function (err, rows) {
      if (err) {
        folderNm = 'C:/guestcheckin/api'
        fileNm = folderNm + '/' + req.body.filenm
        db.close()
      } else {
        folderNm = rows[0].uploadfolder

        fileNm = folderNm + '/' + req.body.filenm
        db.close()

        if (fs.existsSync(fileNm)) {
          fs.unlink(fileNm, (err) => {
            if (err) {
              res.send({ success: false, message: err, filenm: fileNm })
            } else {
              res.send({ success: true, message: 'File removed successfully', filenm: fileNm })
            }
          })
        } else {
          res.send({ success: false, message: 'File not found', filenm: fileNm })
        }
      }
    })
  })
})

function done (req, res) {
  const uploadpath = apiconfig.apppath + '/public/'
  const mfilenm = new Date().toISOString().replace(/:/g, '') + 'sign.png'
  const mfullpath = uploadpath + mfilenm
//  console.log(mfullpath)

  fs.writeFile(mfullpath, req.rawBody, 'binary', function (err) {
    if (err) { throw err }

    // Save file to S3
  })
}

function writeFileToSystem (buf) {
  const uploadpath = apiconfig.apppath + '/public/'
  const mfilenm = new Date().toISOString().replace(/:/g, '') + 'sign.png'
  const mfullpath = uploadpath + mfilenm
  fs.writeFile(mfullpath, buf, function (err) {
//    console.log('The file was saved!')
  })
}

module.exports = router