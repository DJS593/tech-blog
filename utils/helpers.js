// utilizing the code provided in module 14 

module.exports = {
  format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }

}

