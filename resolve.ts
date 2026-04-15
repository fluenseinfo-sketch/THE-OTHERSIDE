const url = "https://maps.app.goo.gl/doMZ4xmVn2fDxVvv8";
fetch(url, { redirect: 'follow' })
  .then(res => console.log(res.url))
  .catch(err => console.error(err));
