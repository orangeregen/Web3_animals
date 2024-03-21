 export default (req, res) => {
 
 const fs = require('fs');
 let oldFile = fs.readFileSync('./public/animals.json');
 let newFile = oldFile.slice(0,-1) + ",\n" + req.body + "]";
 fs.writeFileSync(`./public/animals.json`, newFile);

 res.status(200).json({ status: 'OK' });
  
 return;
}; 