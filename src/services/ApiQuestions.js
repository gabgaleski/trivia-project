const Question = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  // console.log(data);
  console.log(data);
  // if (data.response_code === 0) {
  //   return data.results;
  // }
  // localStorage.removeItem('token');
  return data;
};

export default Question;
