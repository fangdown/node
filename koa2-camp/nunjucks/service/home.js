module.exports = {
  register: async (name, password) => {
    let data;
    if (name === 'fangdown' && password === '123456') {
      data = `hello ${name}`
    } else {
      data = '账号密码错误'
    }
    return data
  }
}