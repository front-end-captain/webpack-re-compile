// console.log(process.env.APP_NAME, process.env.APP_VERSION);

document.body.innerHTML = `<span>${process.env.APP_NAME} ${ process.env.APP_VERSION}</span>`;